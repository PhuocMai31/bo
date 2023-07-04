import {ModelBase} from "@config/ModelBase";

class Bo_v2_permission_group_member extends ModelBase {
    id
    user_id
    group_id
    status
    /**
     * @type {"nhanvienbanhang",
     * "khachhang",
     * "giamdocsan",
     * "dieuphoikinhdoanh",
     * "dichvukhachhang",
     * "ketoan",
     * "truongphong",
     * "truongnhom",
     * "quanlychiendich",
     * "quanlydohang"
     * }
     */
    staff_object_id
    created_at
    deleted_at
    updated_at
    /**
     * @type {"department","group","company","campaign" , "category" , "cart"}
     * */
    scope_type
    scope_id
}

Bo_v2_permission_group_member.init("bo_v2_permission_group_member", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    user_id: {type: "int(11)"},
    group_id: {type: "int(11)"},
    status: {type: "tinyint(1)", defaultValue: 1},
    staff_object_id: {type: "varchar(50)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},
    scope_type :{type : "nvarchar(100)"} ,
    scope_id :  { type: "int"}
});

/**
 *
 * @param params {Bo_v2_permission_group_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group_member>}
 */
export const addBoV2PermissionGroupMemberMd = (params, transaction = false) => {
    return Bo_v2_permission_group_member.create(params, {transaction})
}




/**
 *
 * @param attr {Bo_v2_permission_group_member|any}
 * @param where {Bo_v2_permission_group_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group_member>}
 */
export const updateBoV2PermissionGroupMemberMd = (attr, where, transaction = false) => {
    return Bo_v2_permission_group_member.findOneAndUpdate(attr, where, transaction)
}





/**
 *
 * @param where {Bo_v2_permission_group_member|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_permission_group_member[]>}
 */
export const getListBoV2PermissionGroupMemberMd = (where, transaction = false, limit = false, page = false, order = false, group = false, attr = false) => {
    return Bo_v2_permission_group_member.findArr(where, transaction, limit, page, order, group, attr)
}


/**
 *
 * @param where {Bo_v2_permission_group_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group_member>}
 */
export const getDetailBoV2PermissionGroupMemberMd = (where, transaction = false) => {
    return Bo_v2_permission_group_member.findItem(where, transaction)
}

/**
 *
 * @param where {Bo_v2_permission_group_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group_member>}
 */
export const delBoV2PermissionGroupMemberMd = (where, transaction = false) => {
    return Bo_v2_permission_group_member.del(where, transaction)
}
export default Bo_v2_permission_group_member;

