import { ModelBase } from "@config/ModelBase";

class Bo_v2_work_group_member extends ModelBase {
}
Bo_v2_work_group_member.init("bo_v2_work_group_member", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    id_work_group: {type: "int(11)"},
    key_action: {type: "varchar(255)"},
    key_step: {type: "varchar(255)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},
});

/**
 *
 * @param params {Bo_v2_work_group_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_work_group_member>}
 */
export  const addBoV2WorkGroupMemberMd = (params, transaction = false)=> {
    return Bo_v2_work_group_member.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_work_group_member|any}
 * @param where {Bo_v2_work_group_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_work_group_member>}
 */
export  const updateBoV2WorkGroupMemberMd = (attr , where ,transaction = false)=> {
    return Bo_v2_work_group_member.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_work_group_member|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_work_group_member[]>}
 */
export  const getListBoV2WorkGroupMemberMd = ( where,transaction,limit,page,order,group,attr)=> {
    return Bo_v2_work_group_member.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_work_group_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_work_group_member>}
 */
export  const getDetailBoV2WorkGroupMemberMd = ( where,transaction =false)=> {
    return Bo_v2_work_group_member.findItem( where ,transaction)
}

export default Bo_v2_work_group_member;
