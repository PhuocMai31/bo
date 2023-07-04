import { ModelBase } from "@config/ModelBase";

class Bo_v2_work_group extends ModelBase {
}
Bo_v2_work_group.init("bo_v2_work_group", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    name: {type: "varchar(255)"},
    desc: {type: "varchar(255)"},
    status: {type: "tinyint(1)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},
});

/**
 *
 * @param params {Bo_v2_work_group|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_work_group>}
 */
export  const addBoV2WorkGroupMd = (params, transaction = false)=> {
    return Bo_v2_work_group.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_work_group|any}
 * @param where {Bo_v2_work_group|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_work_group>}
 */
export  const updateBoV2WorkGroupMd = (attr , where ,transaction = false)=> {
    return Bo_v2_work_group.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_work_group|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_work_group[]>}
 */
export  const getListBoV2WorkGroupMd = ( where,transaction,limit,page,order,group,attr)=> {
    return Bo_v2_work_group.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_work_group|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_work_group>}
 */
export  const getDetailBoV2WorkGroupMd = ( where,transaction =false)=> {
    return Bo_v2_work_group.findItem( where ,transaction)
}

export default Bo_v2_work_group;