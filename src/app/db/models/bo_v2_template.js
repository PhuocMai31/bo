import { ModelBase } from "@config/ModelBase";

class Bo_v2_template extends ModelBase {
    id
    type
    type_product
    code
    title
    category_id
    state
    type_pattern
    created_at
    updated_at
    deleted_at
    data
    status
    email_term
}
Bo_v2_template.init("bo_v2_template", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    type: {type: "tinyint"},
    type_product: {type: "tinyint"},
    code: {type: "nvarchar(50)"},
    title: {type: "nvarchar(255)"},
    category_id: {type: "int"},
    stage: {type: "tinyint"},
    type_pattern: {type: "tinyint"},
    status: {type: "tinyint"},
    created_at: {type: "datetime"},
    updated_at: {type: "datetime"},
    deleted_at: {type: "datetime"},
    data : {type : "longtext"},
     email_term: {type : "longtext"}
});

/**
 *
 * @param params {Bo_v2_template|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_template>}
 */
export  const addBoV2TemplateMd = (params, transaction = false)=> {
    return Bo_v2_template.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_template|any}
 * @param where {Bo_v2_template|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_template>}
 */
export  const updateBoV2TemplateMd = (attr , where ,transaction = false)=> {
    return Bo_v2_template.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_template|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_template[]>}
 */
export  const getListBoV2TemplateMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_template.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_template|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_template>}
 */
export  const getDetailBoV2TemplateMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_template.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_template|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2TemplateMd = ( where,transaction =false )=> {
    return Bo_v2_template.count( {where,transaction} )
}
export default Bo_v2_template;

