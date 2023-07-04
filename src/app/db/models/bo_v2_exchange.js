import { ModelBase } from "@config/ModelBase";

class Bo_v2_exchange extends ModelBase {
    id
    name
    desc
    company_id
    created_at
    deleted_at
    updated_at
    code
    address
    parent_id
    phone_contact
    date_inactive
    date_active
    user_id_representative
    status
}
Bo_v2_exchange.init("bo_v2_exchange", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    name: {type: "varchar(255)"},
    desc: {type: "varchar(255)"},
    company_id: {type: "int(11)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},
    date_inactive: {type: "DATETIME"},
    date_active: {type: "DATETIME"},
    code: {type: "varchar"},
    address: {type:"varchar"},
    parent_id: {type:"int"},
    user_id_representative: {type : "int(11)"},
    phone_contact: { type: "varchar(20)"},
    status: { type: "tinyint(1)", defaultValue : 1},
}, {}, true);

/**
 *
 * @param params {Bo_v2_exchange|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_exchange>}
 */
export  const addBoV2ExchangeMd = (params, transaction = false)=> {
    return Bo_v2_exchange.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_exchange|any}
 * @param where {Bo_v2_exchange|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_exchange>}
 */
export  const updateBoV2ExchangeMd = (attr , where ,transaction = false)=> {
    return Bo_v2_exchange.findOneAndUpdate(attr , where,transaction)
}



/**
 *
 * @param where {Bo_v2_exchange|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_exchange>}
 */
export  const deleteBoV2ExchangeMd = ( where ,transaction = false)=> {
    return Bo_v2_exchange.del( where,transaction)
}





/**
 *
 * @param where {Bo_v2_exchange|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_exchange[]>}
 */
export  const getListBoV2ExchangeMd = ( where,transaction,limit=false,page=false,order=false,group=false,attr=false)=> {
    return Bo_v2_exchange.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_exchange|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_exchange>}
 */
export  const getDetailBoV2ExchangeMd = ( where,transaction =false)=> {
    return Bo_v2_exchange.findItem( where ,transaction)
}

/**
 *
 * @param where {Bo_v2_user|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user>}
 */
export const countBoV2ExchangeMd = (where, transaction = false) => {
    return Bo_v2_exchange.count({where,transaction}, )
}
export default Bo_v2_exchange;
