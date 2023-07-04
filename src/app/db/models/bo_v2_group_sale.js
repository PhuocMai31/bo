import {ModelBase} from "@config/ModelBase";

class Bo_v2_group_sale extends ModelBase {
    id
    name
    desc
    company_id
    exchange_id
    created_at
    deleted_at
    updated_at
    code
    status
}

Bo_v2_group_sale.init("bo_v2_group_sale", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    name: {type: "varchar(255)"},
    code: {type: "varchar(50)"},
    desc: {type: "varchar(255)"},
    status: {type: "tinyint(1)"},
    company_id: {type: "int(11)"},
    exchange_id: {type: "int(11)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},
}, {}, true);

/**
 *
 * @param params {Bo_v2_group_sale|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_sale>}
 */
export const addBoV2GroupSaleMd = (params, transaction = false) => {
    return Bo_v2_group_sale.create(params, {transaction})
}


/**
 *
 * @param attr {Bo_v2_group_sale|any}
 * @param where {Bo_v2_group_sale|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_sale>}
 */
export const updateBoV2GroupSaleMd = (attr, where, transaction = false) => {
    return Bo_v2_group_sale.findOneAndUpdate(attr, where, transaction)
}


/**
 *
 * @param where {Bo_v2_group_sale|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_group_sale[]>}
 */
export const getListBoV2GroupSaleMd = (where, transaction = false, limit = false, page = false, order = false, group = false, attr = false) => {
    return Bo_v2_group_sale.findArr(where, transaction, limit, page, order, group, attr)
}


/**
 *
 * @param where {Bo_v2_group_sale|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_sale>}
 */
export const getDetailBoV2GroupSaleMd = (where, transaction = false) => {
    return Bo_v2_group_sale.findItem(where, transaction)
}

/**
 *
 * @param where {Bo_v2_group_sale|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_sale>}
 */
export const countBoV2GroupSaleMd = (where, transaction = false) => {
    return Bo_v2_group_sale.count({where, transaction},)
}


export const deleteBoV2GroupSaleMd = (where, transaction) => {
    return Bo_v2_group_sale.del(where, transaction)
}
export default Bo_v2_group_sale;
