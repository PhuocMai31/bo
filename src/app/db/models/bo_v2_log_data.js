import { ModelBase } from "@config/ModelBase";

class Bo_v2_log_data extends ModelBase {
}
Bo_v2_log_data.init("bo_v2_log_data", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    user_id:{type:"int"},
    action:{type:"nvarchar(20)"},
    status:{type:"tinyint"},
    datatype:{type:"tinyint"},
    data:{type:"longtext"},
    code:{type:"nvarchar(100)"},
    created_at:{type:"datetime"},
    deleted_at:{type:"datetime"},
    updated_at:{type:"datetime"}

});

/**
 *
 * @param params {Bo_v2_log_data|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_log_data>}
 */
export  const addBoV2LogDataMd = (params, transaction = false)=> {
    return Bo_v2_log_data.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_log_data|any}
 * @param where {Bo_v2_log_data|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_log_data>}
 */
export  const updateBoV2LogDataMd = (attr , where ,transaction = false)=> {
    return Bo_v2_log_data.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_log_data|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_log_data[]>}
 */
export  const getListBoV2LogDataMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_log_data.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_log_data|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_log_data>}
 */
export  const getDetailBoV2LogDataMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_log_data.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_log_data|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2LogDataMd = ( where,transaction =false )=> {
    return Bo_v2_log_data.count( {where,transaction} )
}

export default Bo_v2_log_data;

