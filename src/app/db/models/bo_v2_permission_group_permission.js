import { ModelBase } from "@config/ModelBase";

class Bo_v2_permission_group_permission extends ModelBase {
    id
    tool_id
    permission
    staff_object_id
    group_id
    created_at
    deleted_at
    updated_at
}
Bo_v2_permission_group_permission.init("bo_v2_permission_group_permission", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    tool_id: {type: "int(11)"},
    permission: {type: "nvarchar(255)"},
    staff_object_id: {type: "int(11)"},
    group_id: {type: "int(11)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},
});

/**
 *
 * @param params {Bo_v2_permission_group_permission|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group_permission>}
 */
export  const addBoV2PermissionGroupPermissionMd = (params, transaction = false)=> {
    return Bo_v2_permission_group_permission.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_permission_group_permission|any}
 * @param where {Bo_v2_permission_group_permission|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group_permission>}
 */
export  const updateBoV2PermissionGroupPermissionMd = (attr , where ,transaction = false)=> {
    return Bo_v2_permission_group_permission.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_permission_group_permission|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_permission_group_permission[]>}
 */
export  const getListBoV2PermissionGroupPermissionMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr=false)=> {
    return Bo_v2_permission_group_permission.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_permission_group_permission|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group_permission>}
 */
export  const getDetailBoV2PermissionGroupPermissionMd = ( where,transaction =false)=> {
    return Bo_v2_permission_group_permission.findItem( where ,transaction)
}/**
 *
 * @param where {Bo_v2_permission_group_permission|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group_permission>}
 */
export  const delBoV2PermissionGroupPermissionMd = ( where,transaction =false)=> {
    return Bo_v2_permission_group_permission.del( where ,transaction)
}

export default Bo_v2_permission_group_permission;
