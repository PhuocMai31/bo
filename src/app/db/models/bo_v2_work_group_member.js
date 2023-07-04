
import { ModelBase } from "@config/ModelBase";

class Bo_v2_work_group_permission extends ModelBase {
}
Bo_v2_work_group_permission.init("bo_v2_work_group_permission", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    id_work_group: {type: "int(11)"},
    user_id: {type: "int(11)"},
    status: {type: "tinyint(1)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},
});

/**
 *
 * @param params {Bo_v2_work_group_permission|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_work_group_permission>}
 */
export  const addBoV2WorkGroupPermissionMd = (params, transaction = false)=> {
    return Bo_v2_work_group_permission.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_work_group_permission|any}
 * @param where {Bo_v2_work_group_permission|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_work_group_permission>}
 */
export  const updateBoV2WorkGroupPermissionMd = (attr , where ,transaction = false)=> {
    return Bo_v2_work_group_permission.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_work_group_permission|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_work_group_permission[]>}
 */
export  const getListBoV2WorkGroupPermissionMd = ( where,transaction,limit,page,order,group,attr)=> {
    return Bo_v2_work_group_permission.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_work_group_permission|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_work_group_permission>}
 */
export  const getDetailBoV2WorkGroupPermissionMd = ( where,transaction =false)=> {
    return Bo_v2_work_group_permission.findItem( where ,transaction)
}

export default Bo_v2_work_group_permission;