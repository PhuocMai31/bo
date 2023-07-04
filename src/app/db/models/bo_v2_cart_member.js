import { ModelBase } from "@config/ModelBase";

class Bo_v2_cart_member extends ModelBase {
    id
    cart_id
    user_id
    created_at
    deleted_at
    updated_at
}
Bo_v2_cart_member.init("bo_v2_cart_member", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    cart_id : {type :"int"},
    user_id : {type :"int"},
    created_at : {type :"datetime"},
    deleted_at : {type :"datetime"},
    updated_at : {type :"datetime"},
});

/**
 *
 * @param params {Bo_v2_cart_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_cart_member>}
 */
export  const addBoV2CartMemberMd = (params, transaction = false)=> {
    return Bo_v2_cart_member.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_cart_member|any}
 * @param where {Bo_v2_cart_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_cart_member>}
 */
export  const updateBoV2CartMemberMd = (attr , where ,transaction = false)=> {
    return Bo_v2_cart_member.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_cart_member|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_cart_member[]>}
 */
export  const getListBoV2CartMemberMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_cart_member.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_cart_member|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_cart_member>}
 */
export  const getDetailBoV2CartMemberMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_cart_member.findItem( where ,transaction ,attr)
}

/**
 *
 * @param where {Bo_v2_cart_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_cart_member>}
 */
export  const delBoV2CartMemberMd = ( where,transaction =false )=> {
    return Bo_v2_cart_member.del( where ,transaction )
}



/**
 *
 * @param where {Bo_v2_cart_member|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2CartMemberMd = ( where,transaction =false )=> {
    return Bo_v2_cart_member.count( {where,transaction} )
}

export default Bo_v2_cart_member;
