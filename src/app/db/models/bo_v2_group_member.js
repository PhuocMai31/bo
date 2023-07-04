import { ModelBase } from "@config/ModelBase";

class Bo_v2_group_member extends ModelBase {
    id
    group_sale_id
    user_id
    created_at
    deleted_at
    updated_at
    company_id
    exchange_id
}
Bo_v2_group_member.init("bo_v2_group_member", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    group_sale_id: {type: "int(11)"},
    user_id: {type: "int(11)"},
    company_id: {type: "int(11)"},
    exchange_id: {type: "int(11)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},
});

/**
 *
 * @param params {Bo_v2_group_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_member>}
 */
export  const addBoV2GroupMemberMd = (params, transaction = false)=> {
    return Bo_v2_group_member.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_group_member|any}
 * @param where {Bo_v2_group_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_member>}
 */
export  const updateBoV2GroupMemberMd = (attr , where ,transaction = false)=> {
    return Bo_v2_group_member.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_group_member|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_group_member[]>}
 */
export  const getListBoV2GroupMemberMd = ( where,transaction =false,limit =false,page =false,order =false,group =false,attr =false)=> {
    return Bo_v2_group_member.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_group_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_member>}
 */
export  const getDetailBoV2GroupMemberMd = ( where,transaction =false)=> {
    return Bo_v2_group_member.findItem( where ,transaction)
}
/**
 *
 * @param where {Bo_v2_group_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_member>}
 */
export  const deleteBoV2GroupMemberMd = ( where,transaction =false)=> {
    return Bo_v2_group_member.del( where ,transaction)
}

export default Bo_v2_group_member;
