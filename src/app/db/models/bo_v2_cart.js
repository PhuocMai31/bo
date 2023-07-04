import { ModelBase } from "@config/ModelBase";

class Bo_v2_cart extends ModelBase {
    id
    name
    category_id
    time_hold
    status
    created_at
    deleted_at
    updated_at
    desc
    company_id
    image
}
Bo_v2_cart.init("bo_v2_cart", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    code: {type: "nvarchar(50)"},
    name: {type: "nvarchar(255)"},
    desc: {type: "text"},
    category_id: {type: "int"},
    time_hold: {type: "int"},
    company_id: {type: "int"},
    status: {type: "tinyint"},
    image: {type:"text"},
    created_at: {type: "datetime"},
    deleted_at: {type: "datetime"},
    updated_at: {type: "datetime"},

});

/**
 *
 * @param params {Bo_v2_cart|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_cart>}
 */
export  const addBoV2CartMd = (params, transaction = false)=> {
    return Bo_v2_cart.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_cart|any}
 * @param where {Bo_v2_cart|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_cart>}
 */
export  const updateBoV2CartMd = (attr , where ,transaction = false)=> {
    return Bo_v2_cart.findOneAndUpdate(attr , where,transaction)
}

/**
 *
 * @param where {Bo_v2_cart|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_cart>}
 */
export  const deleteBoV2CartMd = (where ,transaction = false)=> {
    return Bo_v2_cart.del(where,transaction)
}





/**
 *
 * @param where {Bo_v2_cart|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_cart[]>}
 */
export  const getListBoV2CartMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_cart.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_cart|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_cart>}
 */
export  const getDetailBoV2CartMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_cart.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_cart|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2CartMd = ( where,transaction =false )=> {
    return Bo_v2_cart.count( {where,transaction} )
}

export default Bo_v2_cart;
