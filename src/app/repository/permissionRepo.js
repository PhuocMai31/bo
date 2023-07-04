import {cacheRedis, ModelQuery} from "@lib";
import {getListBoV2PermissionGroupMemberMd} from "@model";
import {Op} from "sequelize";
import {mapPermission} from "@util";

/**
 *
 * @param user_id
 * @param staff_object_id {any}
 * @param is_mater { any}
 * @returns {Promise<Bo_v2_permission_group_member[]>}
 */
export const getListPermission = (user_id, staff_object_id = false, is_mater = 1) => cacheRedis("getPermission_" + user_id, () => {
    const queryPermission = new ModelQuery(" bo_v2_permission_group_member a left join bo_v2_permission_group b on a.group_id = b.id")
    queryPermission.condition_2 = "a.user_id = " + user_id
    queryPermission.condition_3 = "a.deleted_at is null"
    queryPermission.condition_4 = "b.deleted_at is null"
    queryPermission.condition_5 = `(${is_mater === 1 ? `b.is_master =  ${1} or` : ""}   staff_object_id  is not null)`
    if (staff_object_id) {
        queryPermission.condition_6 = " staff_object_id  = " + staff_object_id
    }
    queryPermission.order = []
    return queryPermission.exe()
}, 40)
/**
 *
 * @param user_id
 * @returns {Promise<Bo_v2_permission_group_member[]>}
 */
export const getListGroupPermission = (user_id) => {
    const query = new ModelQuery(" bo_v2_permission_group_member a left join bo_v2_permission_group b on a.group_id = b.id ")
    query.condition_2 = "a.user_id = " + user_id
    query.condition_4 = "a.deleted_at is null "
    query.condition_3 = `((b.deleted_at is null and b.status = 1 ) or staff_object_id is not null)`
    query.condition_6 = "a.status  = 1"
    query.attr = ["a.*"]
    query.order = []
    return query.exe()

}


export const getPermissionObjStaffByUser = async (user_id, scope_id ,staff_object_id) => {
    const where = {
        user_id: user_id,
        status: 1,
        staff_object_id:  staff_object_id || {
            [Op.in]: ["giamdocsan", "truongphong", "truongnhom", "quanlychiendich","dieuphoikinhdoanh","quanlydohang"]
        }
    }
    if (scope_id) {
        where.scope_id = Array.isArray(scope_id) ? {[Op.in]: scope_id} : scope_id
    }
    const group_permission_member = await getListBoV2PermissionGroupMemberMd(where);
    return mapPermission(group_permission_member)

}
