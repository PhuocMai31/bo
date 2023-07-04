import { ModelBase } from "@config/ModelBase";

class Bo_v2_required extends ModelBase {
    id
    status
    title
    user_sale_id
    building_id
    product_id
    deleted_at
    updated_at
    created_at
    category_id
    bug_log_time
    bill_id
    type
    data
}
Bo_v2_required.init("bo_v2_required", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    status: {type: "int"},
    title: {type: "nvarchar(255)"},
    user_sale_id: {type: "int"},
    building_id: {type: "int"},
    product_id: {type: "int"},
    deleted_at: {type: "datetime"},
    updated_at: {type: "datetime"},
    created_at: {type: "datetime"},
    category_id: {type: "int"},
    bug_log_time: {type: "datetime"},
    bill_id: {type: "int"},
    type: {type: "tinyint(1)"},
    data: {type: "text"},

});

/**
 *
 * @param params {Bo_v2_required|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_required>}
 */
export  const addBoV2RequiredMd = (params, transaction = false)=> {
    return Bo_v2_required.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_required|any}
 * @param where {Bo_v2_required|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_required>}
 */
export  const updateBoV2RequiredMd = (attr , where ,transaction = false)=> {
    return Bo_v2_required.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_required|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_required[]>}
 */
export  const getListBoV2RequiredMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_required.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_required|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_required>}
 */
export  const getDetailBoV2RequiredMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_required.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_required|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2RequiredMd = ( where,transaction =false )=> {
    return Bo_v2_required.del( {where,transaction} )
}



/**
 *
 * @param where {Bo_v2_required|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_required>}
 */
export  const delBoV2RequiredMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_required.findItem( where ,transaction ,attr)
}

export default Bo_v2_required;
