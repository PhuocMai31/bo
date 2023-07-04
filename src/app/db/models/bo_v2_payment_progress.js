import { ModelBase } from "@config/ModelBase";

class Bo_v2_payment_progress extends ModelBase {
    id
    code
    sale_policy_id
    title
    type_bonus
    bonus
    updated_at
    created_at
    deleted_at
}
Bo_v2_payment_progress.init("bo_v2_payment_progress", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    code: {type: "nvarchar(50)"},
    sale_policy_id : {type: "int"},
    title : {type: "nvarchar(255)"},
    type_bonus: {type: "tinyint"},
    bonus :  {type: "bigint"},
    updated_at: {type: "datetime"},
    created_at: {type: "datetime"},
    deleted_at: {type: "datetime"},

});

/**
 *
 * @param params {Bo_v2_payment_progress|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_payment_progress>}
 */
export  const addBoV2PaymentProgressMd = (params, transaction = false)=> {
    return Bo_v2_payment_progress.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_payment_progress|any}
 * @param where {Bo_v2_payment_progress|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_payment_progress>}
 */
export  const updateBoV2PaymentProgressMd = (attr , where ,transaction = false)=> {
    return Bo_v2_payment_progress.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_payment_progress|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_payment_progress[]>}
 */
export  const getListBoV2PaymentProgressMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_payment_progress.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_payment_progress|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_payment_progress>}
 */
export  const getDetailBoV2PaymentProgressMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_payment_progress.findItem( where ,transaction ,attr)
}

/**
 *
 * @param where {Bo_v2_payment_progress|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_payment_progress>}
 */
export  const delBoV2PaymentProgressMd = ( where,transaction =false )=> {
    return Bo_v2_payment_progress.del( where ,transaction )
}



/**
 *
 * @param where {Bo_v2_payment_progress|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2PaymentProgressMd = ( where,transaction =false )=> {
    return Bo_v2_payment_progress.count( {where,transaction} )
}

export default Bo_v2_payment_progress;
