import { ModelBase } from "@config/ModelBase";

class Bo_v2_work_project_member extends ModelBase {
}
Bo_v2_work_project_member.init("bo_v2_work_project_member", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    id_project: {type: "int(11)"},
    user_id: {type: "int(11)"},
    id_work_group_member: {type: "int(11)"},
    id_work_group: {type: "int(11)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},
});

/**
 *
 * @param params {Bo_v2_work_project_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_work_project_member>}
 */
export  const addBoV2WorkProjectMemberMd = (params, transaction = false)=> {
    return Bo_v2_work_project_member.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_work_project_member|any}
 * @param where {Bo_v2_work_project_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_work_project_member>}
 */
export  const updateBoV2WorkProjectMemberMd = (attr , where ,transaction = false)=> {
    return Bo_v2_work_project_member.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_work_project_member|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_work_project_member[]>}
 */
export  const getListBoV2WorkProjectMemberMd = ( where,transaction,limit,page,order,group,attr)=> {
    return Bo_v2_work_project_member.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_work_project_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_work_project_member>}
 */
export  const getDetailBoV2WorkProjectMemberMd = ( where,transaction =false)=> {
    return Bo_v2_work_project_member.findItem( where ,transaction)
}

export default Bo_v2_work_project_member;