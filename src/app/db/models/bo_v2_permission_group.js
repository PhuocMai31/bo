import { ModelBase } from "@config/ModelBase";

class Bo_v2_permission_group extends ModelBase {
    id
    name
    desc
    status
    is_master
    created_at
    deleted_at
    updated_at
}
Bo_v2_permission_group.init("bo_v2_permission_group", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    name: {type: "varchar(255)"},
    desc: {type: "varchar(255)"},
    status: {type: "tinyint(1)"},
    is_master: {type: "tinyint(1)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},
});

/**
 *
 * @param params {Bo_v2_permission_group|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group>}
 */
export  const addBoV2PermissionGroupMd = (params, transaction = false)=> {
    return Bo_v2_permission_group.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_permission_group|any}
 * @param where {Bo_v2_permission_group|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group>}
 */
export  const updateBoV2PermissionGroupMd = (attr , where ,transaction = false)=> {
    return Bo_v2_permission_group.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_permission_group|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_permission_group[]>}
 */
export  const getListBoV2PermissionGroupMd = ( where,transaction= false,limit= false,page= false,order= false,group= false,attr= false)=> {
    return Bo_v2_permission_group.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_permission_group|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group>}
 */
export  const getDetailBoV2PermissionGroupMd = ( where,transaction =false)=> {
    return Bo_v2_permission_group.findItem( where ,transaction)
}
/**
 *
 * @param where {Bo_v2_permission_group|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group>}
 */
export  const countBoV2PermissionGroupMd = ( where,transaction =false)=> {
    return Bo_v2_permission_group.count({where, transaction})
}
/**
 *
 * @param where {Bo_v2_permission_group|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_permission_group>}
 */
export  const delBoV2PermissionGroupMd = ( where,transaction =false)=> {
    return Bo_v2_permission_group.del(where  ,transaction)
}

export default Bo_v2_permission_group;
