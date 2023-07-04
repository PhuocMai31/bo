
import { ModelBase } from "@config/ModelBase";

class Bo_v2_sale_policy extends ModelBase {
    id
    title
    code
    building_id
    category_id
    create_date
    create_by
    status
    from_date
    to_date
    updated_at
    created_at
    deleted_at
}
Bo_v2_sale_policy.init("bo_v2_sale_policy", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    title: {type: "nvarchar(255)"},
    code: {type: "nvarchar(50)"},
    building_id: {type: "int", defaultValue: 0},
    category_id: {type: "int", defaultValue: 0},
    create_date: {type: "datetime"},
    create_by: {type: "int"},
    status: {type: "tinyint"},
    from_date: {type: "datetime"},
    to_date: {type: "datetime"},
    updated_at: {type: "datetime"},
    created_at: {type: "datetime"},
    deleted_at: {type: "datetime"},

});

/**
 *
 * @param params {Bo_v2_sale_policy|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_sale_policy>}
 */
export  const addBoV2SalePolicyMd = (params, transaction = false)=> {
    return Bo_v2_sale_policy.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_sale_policy|any}
 * @param where {Bo_v2_sale_policy|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_sale_policy>}
 */
export  const updateBoV2SalePolicyMd = (attr , where ,transaction = false)=> {
    return Bo_v2_sale_policy.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_sale_policy|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_sale_policy[]>}
 */
export  const getListBoV2SalePolicyMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_sale_policy.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_sale_policy|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_sale_policy>}
 */
export  const getDetailBoV2SalePolicyMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_sale_policy.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_sale_policy|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2SalePolicyMd = ( where,transaction =false )=> {
    return Bo_v2_sale_policy.count( {where,transaction} )
}

export default Bo_v2_sale_policy;
