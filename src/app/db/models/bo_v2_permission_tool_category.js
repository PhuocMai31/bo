import { ModelBase } from "@config/ModelBase";

class Bo_v2_permission_tool_category extends ModelBase {
    id
    name
    sort
    status
    created_at
    deleted_at
    updated_at
    icon
}
Bo_v2_permission_tool_category.init("bo_v2_permission_tool_category", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    name: {type: "varchar(255)"},
    sort: {type: "int(11)"},
    status: {type: "tinyint(1)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},
    icon: {type: "nvarchar(100)"},
});

/**
 *
 * @param params {Bo_v2_permission_tool_category|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_tool_category>}
 */
export  const addBoV2PermissionToolCategoryMd = (params, transaction = false)=> {
    return Bo_v2_permission_tool_category.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_permission_tool_category|any}
 * @param where {Bo_v2_permission_tool_category|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_tool_category>}
 */
export  const updateBoV2PermissionToolCategoryMd = (attr , where ,transaction = false)=> {
    return Bo_v2_permission_tool_category.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_permission_tool_category|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_permission_tool_category[]>}
 */
export  const getListBoV2PermissionToolCategoryMd = ( where,transaction,limit,page,order,group,attr)=> {
    return Bo_v2_permission_tool_category.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_permission_tool_category|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_tool_category>}
 */
export  const getDetailBoV2PermissionToolCategoryMd = ( where,transaction =false)=> {
    return Bo_v2_permission_tool_category.findItem( where ,transaction)
}

export default Bo_v2_permission_tool_category;