import {addBoV2PermissionGroupMemberMd, getListBoV2PermissionGroupMemberMd} from "@model/bo_v2_permission_group_member";
import {getDetailBoV2PermissionGroupMd} from "@model/bo_v2_permission_group";
import {getListBoV2PermissionToolMd} from "@model/bo_v2_permission_tool";
import {getListBoV2PermissionGroupPermissionMd} from "@model/bo_v2_permission_group_permission";

/**
 * @param p
 * @param c {Controller}
 */
export const addPermissionGroupMember = async ({
                                                   user_id,
                                                   group_id,
                                                   status,
                                                   company_id,
                                                   exchange_id,
                                                   staff_object_id
                                               }, c) => {
    c.runValid({
        N_user_id: user_id,
        N_group_id: group_id,
        N_status: status,
        N_company_id: company_id,
        N_exchange_id: exchange_id,
        S_staff_object_id: staff_object_id
    })
    if (c.v()) return
    c.data = await addBoV2PermissionGroupMemberMd({user_id, group_id, status, company_id, exchange_id, staff_object_id})
    c.mess = c.MESS.addData
}

/**
 * @param p
 * @param c {Controller}
 */
export const getListPermissionGroupMember = async ({staff_object_id, group_id}, c) => {
    c.runValid({
        S0_staff_object_id: staff_object_id,
        N0_group_id: group_id
    })
    let where = {}
    if (staff_object_id) where.staff_object_id = staff_object_id;
    if (group_id) where.group_id = group_id
    c.data = await getListBoV2PermissionGroupMemberMd(where)
    c.mess = c.MESS.getData
}

/**
 * @param p
 * @param c {Controller}
 */
export const getListPermission = async ({},c)=>{
    const data = await getListBoV2PermissionGroupMemberMd({user_id:c.user_id})
    let permission = []
    for (const datum of data) {
        permission.push(datum.staff_object_id)
    }
    permission = [...new Set(permission)]
    c.data= permission
    c.mess= c.MESS.getData
}

/**
 * @param p
 * @param c {Controller}
 */
export const getDetailPermissionGroup = async ({id, staff_object_id}, c) => {
    c.runValidOr({id, staff_object_id})
    if (c.v()) return
    if (id) {

        const permission = await getDetailBoV2PermissionGroupMd({id})
        const permission_members = await getListBoV2PermissionGroupMemberMd({group_id: permission.id}, false, false, false, false, false, [
            "id",
            "user_id",
            "group_id",
            "status",
            "staff_object_id" ,"scope_type" , "scope_id"])
        const permission_tools = await getListBoV2PermissionGroupPermissionMd({group_id: permission.id}, false, false, false, false, false, ["id", "tool_id", "permission", "group_id", "staff_object_id"])
        c.data = {permission_tools, permission_members, permission}
        c.mess = c.MESS.getData
    } else {
        const permission_members = await getListBoV2PermissionGroupMemberMd({staff_object_id},false,false,false ,false,false,
            [
                "id",
                "user_id","scope_type",
                 "scope_id"])
        const permission_tools = await getListBoV2PermissionGroupPermissionMd({staff_object_id},false,false,false,false,false,   ["id", "tool_id", "permission", "group_id", "staff_object_id"]


        )
        c.data = {permission_tools, permission_members, permission: {}}
        c.mess = c.MESS.getData
    }

}
