import { ModelBase } from "@config/ModelBase";

class Bo_v2_permission_tool extends ModelBase {
}
Bo_v2_permission_tool.init("bo_v2_permission_tool", {


    id: {type:"int(11)", primaryKey:true, autoIncrement:true},
    name: {type:"varchar"},
    route: {type:"varchar(255)"},
    created_at: { type: "DATETIME" },
    updated_at: { type: "DATETIME" },
    deleted_at:{ type: "DATETIME" },
    status: {type:"tinyint"},
    category_id: {type:"int"},
    sort: {type:"int"},
    actions: {type:"text"}

});

/**
 *
 * @param params {Bo_v2_permission_tool|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_tool>}
 */
export  const addBoV2PermissionToolMd = (params, transaction = false)=> {
    return Bo_v2_permission_tool.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_permission_tool|any}
 * @param where {Bo_v2_permission_tool|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_tool>}
 */
export  const updateBoV2PermissionToolMd = (attr , where ,transaction = false)=> {
    return Bo_v2_permission_tool.findOneAndUpdate(attr , where,transaction)
}

/**
 *
 * @param attr {Bo_v2_permission_tool|any}
 * @param where {Bo_v2_permission_tool|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_tool>}
 */
export  const deleteBoV2PermissionToolMd = (attr , where ,transaction = false)=> {
    return Bo_v2_permission_tool.findOneAndUpdate(attr , where,transaction)
}




/**
 *
 * @param where {Bo_v2_permission_tool|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_permission_tool[]>}
 */
export  const getListBoV2PermissionToolMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_permission_tool.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_permission_tool|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_permission_tool>}
 */
export  const getDetailBoV2PermissionToolMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_permission_tool.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_permission_tool|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2PermissionToolMd = ( where,transaction =false )=> {
    return Bo_v2_permission_tool.count( {where,transaction} )
}

export default Bo_v2_permission_tool;