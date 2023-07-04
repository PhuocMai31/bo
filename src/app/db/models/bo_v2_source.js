import { ModelBase } from "@config/ModelBase";

class Bo_v2_source extends ModelBase {
    id
    name
    code
    status
    created_at
    deleted_at
    updated_at
}
Bo_v2_source.init("bo_v2_source", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    name: {type: "nvarchar(255)"},
    code: {type: "varchar(50)"},
    status: {type: "tinyint(1)"},
    created_at: {type: "datetime"},
    deleted_at: {type: "datetime"},
    updated_at: {type: "datetime"},
});

/**
 *
 * @param params {Bo_v2_source|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_source>}
 */
export  const addBoV2SourceMd = (params, transaction = false)=> {
    return Bo_v2_source.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_source|any}
 * @param where {Bo_v2_source|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_source>}
 */
export  const updateBoV2SourceMd = (attr , where ,transaction = false)=> {
    return Bo_v2_source.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_source|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_source[]>}
 */
export  const getListBoV2SourceMd = ( where,transaction,limit,page,order,group,attr)=> {
    return Bo_v2_source.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_source|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_source>}
 */
export  const getDetailBoV2SourceMd = ( where,transaction =false)=> {
    return Bo_v2_source.findItem( where ,transaction)
}
/**
 *
 * @param where {Bo_v2_source|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_source>}
 */
export  const delBoV2SourceMd = ( where,transaction =false)=> {
    return Bo_v2_source.del( where ,transaction)
}
/**
 *
 * @param where {Bo_v2_source|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2SourceMd = ( where,transaction =false)=> {
    return Bo_v2_source.count({where, transaction})
}

export default Bo_v2_source;