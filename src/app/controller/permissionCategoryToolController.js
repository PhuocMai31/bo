import {
    addBoV2PermissionToolMd,
    getDetailBoV2PermissionToolMd,
    getListBoV2PermissionToolMd
} from "@model/bo_v2_permission_tool";
import {Op, where} from "sequelize";

import {
    addBoV2PermissionToolCategoryMd,
    getDetailBoV2PermissionToolCategoryMd, getListBoV2PermissionToolCategoryMd
} from "@model/bo_v2_permission_tool_category";
import permission_tool_category from "../../router/web/permission_tool_category";
import {
    getDetailBoV2PermissionGroupMemberMd,
    getListBoV2PermissionGroupMemberMd
} from "@model/bo_v2_permission_group_member";
import {throwError} from "@util";
import {
    getDetailBoV2PermissionGroupPermissionMd,
    getListBoV2PermissionGroupPermissionMd
} from "@model/bo_v2_permission_group_permission";
import {getListGroupPermission} from "@repository/permissionRepo";

/**
 * @param p
 * @param c {Controller}
 */
export const addPermissionToolCategory = async ({name, sort, status, tool}, c) => {
    c.runValid({
        S_name: name,
        N_sort: sort,
        N_status: status
    })
    if (c.v()) return
    const checkToolCategory = await getDetailBoV2PermissionToolCategoryMd({name})
    if (checkToolCategory) {
        c.status = false
        c.mess = "Danh sach tool da ton tai"
    } else {
        const permissionToolCategory = await addBoV2PermissionToolCategoryMd({name, sort, status})
            .then(async (permissionToolCategory) => {
                    let category_id = await permissionToolCategory.id
                    let name = await tool.name
                    let route = await tool.route
                    let status = await tool.status
                    let actions = await tool.action
                    let sort = await tool.sort
                    const permissionTool = await addBoV2PermissionToolMd({name, route, status, sort, actions, category_id})
                    c.data = {permissionToolCategory, permissionTool}
                    c.mess = c.MESS.addData
                }
            )
    }
}

/**
 * @param p
 * @param c {Controller}
 */
export const getListPermissionToolCateBy = async ({}, c) => {
    const permissionMember = await getListGroupPermission(c.user_id)
    if (permissionMember.length === 0) {
        c.data = 0
        return
    }
    const group_ids = permissionMember.filter(value => value.group_id).map((value) => value.group_id)
    const staff_object_id = permissionMember.filter(value => value.staff_object_id).map((value) => value.staff_object_id)
    const permissions = await getListBoV2PermissionGroupPermissionMd({[Op.or]: [{group_id: {[Op.in]: group_ids}}, {staff_object_id: {[Op.in]: staff_object_id}}]});
    /**
     *
     * @type {Bo_v2_permission_group_permission[]}
     */
    const tools = [];
    permissions.forEach((value) => {
        const find = tools.find(value1 => value1.tool_id === value.tool_id)
            if (find) {
            /**
             *
             * @type {{action : ""}[]}
             */
            const per1 = JSON.parse(find.permission)
            const per3 = [...per1]
            /**
             *
             * @type {{action : ""}[]}
             */
            const per2 = JSON.parse(value.permission)
            per1.forEach((value1) => {
                if (per2.find(value2 => value2.action === value1.action) === undefined) {
                    per3.push(value1)
                }
            })
                // if()
            find.permission = JSON.stringify(per3)
            return
        }
        tools.push(value)
    })
    // console.log(tools)
    const toolsAll = []
    const permission_cate = await getListBoV2PermissionToolCategoryMd({status: 1})
    for (let boV2PermissionToolCategory of permission_cate) {
        boV2PermissionToolCategory.items = await getListBoV2PermissionToolMd({category_id: boV2PermissionToolCategory.id})
        toolsAll.push(...boV2PermissionToolCategory.items)
    }
    tools.forEach(value => {
        value.route = toolsAll.find(value1 => value1.id === value.tool_id)?.route
    })
    c.data = {permission_cate, permissions_tool: tools}
}

/**
 * @param p
 * @param c {Controller}
 */
export const getListPermissionToolCate = async (p, c) => {
    const permissionToolCategory = await getListBoV2PermissionToolCategoryMd()
    let listCategoryId = []
    for (let i = 0; i < permissionToolCategory.length; i++) {
        listCategoryId.push(permissionToolCategory[i].id)
    }
    let where = {category_id: {[Op.in]: listCategoryId}}
    const permissionTool = await getListBoV2PermissionToolMd(where)
    c.data = {permissionToolCategory, permissionTool}
    c.mess = c.MESS.getData
}
