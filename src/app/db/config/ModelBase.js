import {sequelize} from "./main";
import {dateNowDataBase, objIsEmpty, validNumber} from "@util";
import {Op} from "sequelize";
import {cacheRedis, rdDel} from "@lib";
import {client} from "@config/redisConnect";
import {lowerFirst} from "lodash/string";

class ModelBase {
    constructor() {
    }

    static table_name;
    static caches;

    static init(table_name, attr, opts = {}, caches = false) {
        this.caches = caches;
        this.table_name = table_name;
        if (sequelize)
            this.model = sequelize.define(table_name, attr, {
                ...opts,
                timestamps: false,
                tableName: table_name,
            });
    }

    static findOne(opts) {
        return this.model.findOne({...opts, raw: true});
    }

    /**
     * @param opts
     * @returns {Promise<{}[]>}
     */
    static findAll(opts) {
        return this.model.findAll({...opts, raw: true});
    }

    /**
     * @param opts
     * @param attr
     * @returns {Promise<[Number]>}
     */

    static update(attr, opts) {
        if (!opts?.where || Object.keys(opts?.where).length === 0) return;
        opts?.where?.id && this.clearCache(this.table_name, opts?.where?.id);
        if (!attr.updated_at) attr.updated_at = new Date();
        return this.model.update(attr, opts);
    }

    static async create(attr, opts = {}) {
        if (!attr.updated_at) attr.updated_at = dateNowDataBase(true);
        if (!attr.created_at) attr.created_at = dateNowDataBase(true);
        const data = await this.model.create(attr, opts);
        return data.get({plain: true});
    }

    /**
     *
     * @param opts
     * @returns {Promise<number>|void}
     */
    static destroy(opts) {
        if (!opts?.where?.id) return;
        opts?.where?.id && this.clearCache(this.table_name, opts?.where?.id);
        return this.model.destroy(opts);
    }

    /**
     *
     * @param attr
     */
    static removeAttribute(attr) {
        return this.model.removeAttribute(attr);
    }

    /**
     * @param opts
     * @returns {Promise<Number>}
     */
    static count(opts) {
        if (opts.where) opts.where.deleted_at = null;
        else opts.where = {deleted_at: null}
        return this.model.count(opts);
    }

    /**
     *
     * @param where
     * @param transaction
     * @param limit
     * @param page
     * @param order
     * @param group
     * @param attributes
     * @return {Promise<Model<any, TModelAttributes>[]>}
     */
    static findArr(
        where = {},
        transaction,
        limit,
        page,
        order,
        group,
        attributes
    ) {
        const opts = {where, raw: true};
        if (!opts.where.deleted_at) opts.where.deleted_at = null;
        if (validNumber(limit)) opts.limit = Number(limit);
        if (validNumber(page)) opts.offset = Number(limit * page - limit);
        if (order) opts.order = order;
        if (group) opts.group = group;
        if (attributes) opts.attributes = attributes;
        if (transaction) opts.transaction = transaction;
        return this.model.findAll(opts);
    }

    static async _findArr(
        where,
        transaction,
        limit,
        page,
        order,
        group,
        attributes
    ) {
        const opts = {where, raw: true};
        if (!opts.where.deleted_at) opts.where.deleted_at = null;
        if (validNumber(limit)) opts.limit = Number(limit);
        if (validNumber(page)) opts.offset = Number(limit * page - limit);
        if (order) opts.order = order;
        if (group) opts.group = group;
        if (attributes) opts.attributes = attributes;
        if (transaction) opts.transaction = transaction;
        const [list, count] = await Promise.all([
            this.model.findAll(opts),
            this.model.count({where}),
        ]);
        return {list, count};
    }

    // /**
    //  *
    //  * @param id
    //  * @param transaction
    //  * @param where
    //  * @return {Promise<{}>}
    //  */
    // static findId(id, transaction =false ,where = {}) {
    //   const opts = { where: { id, deleted_at: null,...where }, raw: true };
    //   if (transaction) opts.transaction = transaction;
    //   return this.model.findOne({where});
    // }

    /**
     *
     * @param where
     * @param transaction {any}
     * @param attr {[]|any}
     * @param order {[]|any}
     * @return {Promise<any>}
     */
    static async findItem(where, transaction , attr = false, order = false) {
        const opts = {where: {deleted_at: null, ...where}, raw: true, attributes: attr, order};
        if (transaction) opts.transaction = transaction;
        if (where.deleted_at === false) delete where.deleted_at
        if (this.caches && where?.id && Object.keys(where).length === 1) {
            return cacheRedis(this.table_name + "_" + where?.id, () =>
                this.model.findOne(opts)
            );
        }
        let result = await client.get(`${this.table_name}_id`)
        if(!result){
            const expireSecond = 5
            let data = await this.model.findOne({where})
            if(data.id !== where.id){
                data = null
            }
            console.log(data,333)
            const jsonValue = JSON.stringify(data)
            await client.set(`${this.table_name}_id`, jsonValue)
            await client.expire(`${this.table_name}_id`, expireSecond)
            return data
        }
        const dataInCache = await client.get(`${this.table_name}_id`)
        return JSON.parse(dataInCache)
        return this.model.findOne(opts);
    }

    static async findIDtoCache(where){
        let result = await client.get(`${this.table_name}_id`)
        if(!result){
            const expireSecond = 5
            let data = await this.model.findOne({where})
            if(data.id !== where.id){
                data = null
            }
            console.log(data,333)
            const jsonValue = JSON.stringify(data)
            await client.set(`${this.table_name}_id`, jsonValue)
            await client.expire(`${this.table_name}_id`, expireSecond)
            return data
        }
        const dataInCache = await client.get(`${this.table_name}_id`)
        return JSON.parse(dataInCache)
    }

    static async updateDataCache(dataUpdate) {
        console.log(dataUpdate)
        // let result = await client.get(`${this.table_name}_id`)
        // if (result){
        //     console.log(result)
            dataUpdate.updated_at = new Date()
            if (dataUpdate.delete_at) dataUpdate.delete_at = null
            console.log(dataUpdate,777)
            await this.model.update(dataUpdate,
                {
                    where: {id: dataUpdate.id},
                }
            );
            const userUpdated = await this.model.findOne({
                where: {id: dataUpdate.id},
            })
            const expireSecond = 5
            await client.set(`${this.table_name}_id`, JSON.stringify(userUpdated))
            await client.expire(`${this.table_name}_id`, expireSecond)
            return userUpdated
        // }
    }

    /**
     *
     * @param where
     * @param id
     * @param transaction {{}|Boolean}
     * @return {Promise<{{}}>}
     */
    static findId(id, transaction = false, where = {}) {
        const opts = {where: {id, deleted_at: null, ...where}, raw: true};
        if (transaction) opts.transaction = transaction;
        if (this.caches) {
            return cacheRedis(this.table_name + "_" + id, () =>
                this.model.findOne(opts)
            );
        }
        return this.model.findOne(opts);
    }

    static del(where, transaction) {
        if (!where || Object.keys(where) === 0) return
        where.id && this.clearCache(this.table_name, where.id);
        const opts = {where, transaction};
        return this.model.update(
            {updated_at: new Date(), deleted_at: new Date()},
            opts
        );
    }

    /**
     *
     * @param attr
     * @param where
     * @param transaction {Transaction|Boolean}
     * @return {Promise<{item : {}  , before : {}}>}
     */
    static async findOneAndUpdate(attr, where, transaction = false) {
        if (!where || Object.keys(where) === 0) return
        where.id && this.clearCache(this.table_name, where.id);
        if (where.deleted_at) where.deleted_at = null;
        const data = await this.model.findOne({where, raw: true, transaction});
        if (objIsEmpty(attr)) {
            return {item: data, before: data}
        }
        if (!attr.updated_at) attr.updated_at = new Date();
        let item = null;
        if (data) {
            const update = await this.model.update(attr, {where, transaction});
            if (update[0] === 1)
                item = {...data, ...attr, updated_at: dateNowDataBase(true)};
        }
        return data
            ? {
                item,
                before: data,
            }
            : {item: null, before: null};
    }

    /**
     *
     * @param attr
     * @param where
     * @param transaction
     * @return {Promise<>}
     */
    static async findAndUpdate(attr, where, transaction) {
        where.id && this.clearCache(this.table_name, where.id);
        if (!attr.updated_at) attr.updated_at = new Date();
        if (where.deleted_at) where.deleted_at = null;
        await this.model.update(attr, {where, transaction});
        return this.model.findAll({where, raw: true, transaction});
    }

    /**
     *
     * @param list {[]}
     * @param key {String}
     * @return  {Promise<{}[]>}
     */
    static findByList(list, key = "id") {
        return this.model.findAll({
            where: {[key]: {[Op.in]: list}, deleted_at: null},
        });
    }

    static clearCache = (table_name, id) => {
        rdDel(table_name + "_" + id);
    };


}

export {ModelBase};
