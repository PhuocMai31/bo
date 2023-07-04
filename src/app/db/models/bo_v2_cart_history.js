import { ModelBase } from "@config/ModelBase";

class Bo_v2_cart_history extends ModelBase {
    id
    cart_id
    product_id
    action
    created_at
    deleted_at
    updated_at
}
Bo_v2_cart_history.init("bo_v2_cart_history", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    cart_id : {type : "int"},
    product_id : {type : "int"},
    action : {type : "nvarchar(40)"},
    created_at : {type : "datetime"},
    deleted_at : {type : "datetime"},
    updated_at : {type : "datetime"},
});

/**
 *
 * @param params {Bo_v2_cart_history|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_cart_history>}
 */
export  const addBoV2CartHistoryMd = (params, transaction = false)=> {
    return Bo_v2_cart_history.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_cart_history|any}
 * @param where {Bo_v2_cart_history|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_cart_history>}
 */
export  const updateBoV2CartHistoryMd = (attr , where ,transaction = false)=> {
    return Bo_v2_cart_history.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_cart_history|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_cart_history[]>}
 */
export  const getListBoV2CartHistoryMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_cart_history.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_cart_history|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_cart_history>}
 */
export  const getDetailBoV2CartHistoryMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_cart_history.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_cart_history|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2CartHistoryMd = ( where,transaction =false )=> {
    return Bo_v2_cart_history.count( {where,transaction} )
}

export default Bo_v2_cart_history;
