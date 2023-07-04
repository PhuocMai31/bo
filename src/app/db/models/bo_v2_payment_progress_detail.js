import { ModelBase } from "@config/ModelBase";

class Bo_v2_payment_progress_detail extends ModelBase {
    id
    id_payment_progress
    sale_policy_id
    expired_time_paid
    desc
    type_payment
    total
    type
    title
    updated_at
    created_at
    deleted_at
    note
    from_type
}
Bo_v2_payment_progress_detail.init("bo_v2_payment_progress_detail", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    payment_progress_id: {type: "int" ,defaultValue : 0},
    sale_policy_id : {type: "int" ,defaultValue : 0},
    expired_time_paid  : {type: "int"},
    desc   : {type: "text"},
    type_payment : {type: "tinyint"},
    total  : {type: "bigint"},
    type :{type: "tinyint"},
    title: {type: "nvarchar(255)"},
    note : {type : "text"},
    from_type : {type: "tinyint"},
    updated_at: {type: "datetime"},
    created_at: {type: "datetime"},
    deleted_at: {type: "datetime"},
});

/**
 *
 * @param params {Bo_v2_payment_progress_detail|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_payment_progress_detail>}
 */
export  const addBoV2PaymentProgressDetailMd = (params, transaction = false)=> {
    return Bo_v2_payment_progress_detail.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_payment_progress_detail|any}
 * @param where {Bo_v2_payment_progress_detail|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_payment_progress_detail>}
 */
export  const updateBoV2PaymentProgressDetailMd = (attr , where ,transaction = false)=> {
    return Bo_v2_payment_progress_detail.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_payment_progress_detail|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_payment_progress_detail[]>}
 */
export  const getListBoV2PaymentProgressDetailMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_payment_progress_detail.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_payment_progress_detail|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_payment_progress_detail>}
 */
export  const getDetailBoV2PaymentProgressDetailMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_payment_progress_detail.findItem( where ,transaction ,attr)
}

/**
 *
 * @param where {Bo_v2_payment_progress_detail|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_payment_progress_detail>}
 */
export  const delBoV2PaymentProgressDetailMd = ( where,transaction =false )=> {
    return Bo_v2_payment_progress_detail.del( where ,transaction ,)
}



/**
 *
 * @param where {Bo_v2_payment_progress_detail|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2PaymentProgressDetailMd = ( where,transaction =false )=> {
    return Bo_v2_payment_progress_detail.count( {where,transaction} )
}

export default Bo_v2_payment_progress_detail;
