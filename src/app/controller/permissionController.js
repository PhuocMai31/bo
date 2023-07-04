import {
    addBoV2PermissionGroupMd, countBoV2PermissionGroupMd, delBoV2PermissionGroupMd,
    getDetailBoV2PermissionGroupMd,
    getListBoV2PermissionGroupMd, updateBoV2PermissionGroupMd
} from "@model/bo_v2_permission_group";
import {
    addBoV2PermissionGroupPermissionMd, delBoV2PermissionGroupPermissionMd, getDetailBoV2PermissionGroupPermissionMd,
    getListBoV2PermissionGroupPermissionMd, updateBoV2PermissionGroupPermissionMd
} from "@model/bo_v2_permission_group_permission";
import {getListPermission} from "@repository/permissionRepo";
import {
    addBoV2PermissionGroupMemberMd,
    getListBoV2PermissionGroupMemberMd,
    updateBoV2PermissionGroupMemberMd
} from "@model/bo_v2_permission_group_member";
import {addBoV2GroupMemberMd} from "@model/bo_v2_group_member";
import {
    delBoV2PermissionGroupMemberMd,
    getDetailBoV2PermissionGroupMemberMd
} from "@model/bo_v2_permission_group_member";
import {commit} from "lodash/seq";
import {sequelize} from "@config/main";
import {Op} from "sequelize";
import {aLog1Rp} from "@lib";
import {addWardMd} from "@model/ward";
import {mapPermission, seqIn} from "@util";
import {STAFF} from "@constant";

/**
 * @param p {{
 *     group_members : [{
 *     user_id,
 *     group_id,
 *     status,
 *     company_id,
 *     exchange_id,
 *     staff_object_id,
 *     }],
 *     tools :  [{
 *        tool_id,
 *        permission,
 *        staff_object_id,
 *     }],
 * }}
 * @param c {Controller}
 */
export const addPermissionGroup = async ({tool_id, name, desc, status, is_master, group_members, tools}, c) => {
    aLog1Rp("oke", {
        tool_id, name, desc, status, is_master, group_members, tools
    },)
    group_members = JSON.parse(group_members)
    tools = JSON.parse(tools)
    c.runValid({
        S_name: name,
        N_status: status,
        N_is_master: is_master
    })
    group_members.forEach((v) => {
        c.runValid({
            N_user_id: v.user_id,
            N_company_id: v.user_id,
            N0_exchange_id: v.exchange_id,
        })
    })
    tools.forEach((value) => {
        c.runValid({
            N_company_id: value.tool_id,
            permission: value.permission,
        })
    })
    if (c.v()) return
    const checkName = await getDetailBoV2PermissionGroupMd({name})
    if (checkName) {
        c.status = false
        c.mess = "Nhom quyen da ton tai"
        return
    }
    const permissionGroup = await addBoV2PermissionGroupMd({tool_id, name, desc, status, is_master})

    for (let groupMember of group_members) {
        const da = await addBoV2PermissionGroupMemberMd({
            company_id: groupMember.company_id,
            exchange_id: groupMember.exchange_id,
            status: 1,
            group_id: permissionGroup.id,
            user_id: groupMember.user_id,
        })
    }

    for (let tool of tools) {
        const newTool = await addBoV2PermissionGroupPermissionMd({
            group_id: permissionGroup.id,
            tool_id: tool.tool_id,
            permission: JSON.stringify(tool.permission),
        })
    }
    c.mess = c.MESS.addData
}

/**
 * @param p {
 *     {
 *         group_members : [],
 *         tools :[]
 *     }
 * }
 * @param c {Controller}
 */
export const updatePermissionGroup = async ({id, staff_object_id, name, desc, status, group_members, tools}, c) => {
    aLog1Rp("updatePermissionGroup", {tools, status, group_members, desc, name, staff_object_id})
    const transaction = await sequelize.transaction()
    try {
        if (id) {
            await updateBoV2PermissionGroupMd({name, desc, status}, {id}, transaction)
        }
        if (group_members) {
            group_members = JSON.parse(group_members)
            for (let groupMember of group_members) {
                if (groupMember.id && groupMember.deleted_at === 1) {
                    await delBoV2PermissionGroupMemberMd({
                        id: groupMember.id
                    }, transaction)
                } else if (groupMember.id) {
                    await updateBoV2PermissionGroupMemberMd({
                        user_id: groupMember.user_id,
                        staff_object_id: staff_object_id,
                        scope_type: groupMember.scope_type,
                        scope_id: groupMember.scope_id,
                        group_id: id
                    }, {id: groupMember.id}, transaction)
                } else {
                    console.log(!groupMember.scope_id && staff_object_id && staff_object_id !== STAFF.nhanVienBanHang ,STAFF.nhanVienBanHang === staff_object_id )
                    if (!groupMember.scope_id && staff_object_id && staff_object_id !== STAFF.nhanVienBanHang) {
                        c.mess = "Bạn phải truyền phạm vi"
                        c.status = false
                        await transaction.rollback()
                        return
                    }
                    if (staff_object_id && staff_object_id !== STAFF.nhanVienBanHang) {
                        const checkHas = await getDetailBoV2PermissionGroupMemberMd({
                            user_id: groupMember.user_id, staff_object_id: staff_object_id,
                            scope_type: groupMember.scope_type,
                            scope_id: groupMember.scope_id,
                        }, transaction)
                        if (checkHas) continue
                    }
                    await addBoV2PermissionGroupMemberMd({
                        user_id: groupMember.user_id,
                        staff_object_id: staff_object_id,
                        scope_type: groupMember.scope_type,
                        scope_id: groupMember.scope_id,
                        group_id: id
                    }, transaction)


                }
            }
        }
        if (tools) {
            tools = JSON.parse(tools)
            for (let tool of tools) {
                if (tool.id && tool.deleted_at === 1) {
                    await delBoV2PermissionGroupPermissionMd({id: tool.id}, transaction)
                } else if (tool.id) {
                    await updateBoV2PermissionGroupPermissionMd({
                        permission: tool.permission ? JSON.stringify(tool.permission) : undefined,
                    }, {id: tool.id}, transaction)
                } else {
                    if (id) {
                        const check = await getDetailBoV2PermissionGroupPermissionMd({
                            tool_id: tool.tool_id,
                            group_id: id
                        })
                        if (check) {
                            c.status = false;
                            c.mess = "Nhóm quyền này đã có tool này "
                            await transaction.rollback()
                            return
                        }

                    } else if (tool.staff_object_id) {
                        const check = await getDetailBoV2PermissionGroupPermissionMd({
                            staff_object_id: tool.staff_object_id,
                            tool_id: tool.tool_id
                        })
                        if (check) {
                            c.status = false;
                            c.mess = "Nhóm quyền này đã có tool này "
                        }
                        await transaction.rollback()
                        return
                    }
                    await addBoV2PermissionGroupPermissionMd({
                        tool_id: tool.tool_id,
                        permission: JSON.stringify(tool.permission),
                        group_id: id,
                        staff_object_id: staff_object_id
                    }, transaction)
                }
            }

        }
        await transaction.commit()
    } catch (e) {
        await transaction.rollback()
        throw e
    }
    c.mess = c.MESS.update
}
/**
 * @param p
 * @param c {Controller}
 */
export const getListPermissionGroup = async (p, c) => {
    c.runValid({limit: p.limit, page: p.page})
    if (c.v()) return
    const where = {}
    if (p.name) {
        where.name = {[Op.like]: `%${p.name}%`}
    }
    c.data = await getListBoV2PermissionGroupMd(where, false, p.limit, p.page)
    c.mess = c.MESS.getData
}


/**
 *
 * @param p
 * @param c {Controller}
 * @return {Promise<void>}
 */
export const getPermission = async (p, c) => {
    if (c.user_id) {
        /**
         * @type {Bo_v2_permission_group_member[]}
         */
        const listPermission = await getListPermission(c.user_id)
        for (let object of listPermission) {
            if (object.is_master) {
                c.p.master = true
                c.p.havPermission = true
            } else {
                c.p[object.staff_object_id] = true
                c.p.havPermission = true
            }
        }
    }
}


/**
 * @param p
 * @param c {Controller}
 */
export const countPermissionGroup = async (p, c) => {
    const where = {deleted_at: null,}
    if (p.name) {
        where.name = {[Op.like]: `%${p.name}%`}
    }
    c.data = await countBoV2PermissionGroupMd(where)
    c.mess = c.MESS.getData
}


/**
 * @param p
 * @param c {Controller}
 */
export const delPermissionGroup = async (p, c) => {
    c.runValid({id: p.id})
    if (c.v() && p.id != 1) return
    c.data = await delBoV2PermissionGroupMd({id: p.id});
    c.data = c.MESS.delete
}

/**
 * @param p
 * @param c {Controller}
 */
export const getDetailPermission = async (p, c) => {
    const where = {
        user_id: c.user_id,
        status: 1,
        staff_object_id: seqIn([STAFF.giamDoSsan, STAFF.truongphong, STAFF.truongnhom, STAFF.quanlychiendich, STAFF.DieuPhoiKinhDoanh, STAFF.quanlydohang, STAFF.dichVuKhachHang])

    }
    c.data = await getListBoV2PermissionGroupMemberMd(where, false, false, false, false, false, ["id","staff_object_id","scope_type","scope_id"]);
    c.mess = c.MESS.getData
}