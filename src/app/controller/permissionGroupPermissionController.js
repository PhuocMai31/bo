import {addBoV2PermissionGroupPermissionMd} from "@model/bo_v2_permission_group_permission";

/**
 * @param p
 * @param c {Controller}
 */
export const addPermissionGroupPermission = async ({tool_id,permission,staff_object_id,group_id},c)=>{
    c.runValid({
        N_tool_id:tool_id,
        S_permission: permission,
    })
    if(c.v()) return
    if(staff_object_id &&group_id){
        c.status = false
        c.mess = "Vui long chon 1 trong 2"
        return
    }
    if (staff_object_id ===undefined && group_id ===undefined){
        c.mess = "Vui long chon 1 trong 2"
        return
    }
    c.data = await addBoV2PermissionGroupPermissionMd({tool_id,permission,staff_object_id,group_id})
    c.mess = c.MESS.addData
}


