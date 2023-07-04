import { ModelBase } from "@config/ModelBase";

class Bo_v2_sale_violation extends ModelBase {
    id
    user_id_sale
    status
    campaign_id
    desc
    allotment_time
    images
    reason
    customer_id
    time_send_explanation
    /**
     * @private
     */
    created_at
    /**
     * @private
     */
    deleted_at
    /**
     * @private
     */
    updated_at
}
Bo_v2_sale_violation.init("bo_v2_sale_violation", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    user_id_sale: {type: "int(11)"},
    status: {type: "tinyint(1)"},
    campaign_id: {type: "int(11)"},
    reason: {type: "varchar(255)"},
    desc: {type:"varchar(255)"},
    images: {type:"text"},
    customer_id: {type: "int(11)"},
    allotment_time: {type:"datetime"},
    created_at: {type: "datetime"},
    deleted_at: {type: "datetime"},
    updated_at: {type: "datetime"},
    time_send_explanation: {type:"datetime"}

});

/**
 *
 * @param params {Bo_v2_sale_violation|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_sale_violation>}
 */
export  const addBoV2SaleViolationMd = (params, transaction = false)=> {
    return Bo_v2_sale_violation.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_sale_violation|any}
 * @param where {Bo_v2_sale_violation|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_sale_violation>}
 */
export  const updateBoV2SaleViolationMd = (attr , where ,transaction = false)=> {
    return Bo_v2_sale_violation.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_sale_violation|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_sale_violation[]>}
 */
export  const getListBoV2SaleViolationMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_sale_violation.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_sale_violation|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_sale_violation>}
 */
export  const getDetailBoV2SaleViolationMd = ( where,transaction =false)=> {
    return Bo_v2_sale_violation.findItem( where ,transaction)
}
/**
 *
 * @param where {Bo_v2_sale_violation|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_sale_violation>}
 */
export  const delBoV2SaleViolationMd = ( where,transaction =false)=> {
    return Bo_v2_sale_violation.del( where ,transaction)
}
/**
 *
 * @param where {Bo_v2_sale_violation|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2SaleViolationMd = ( where,transaction =false)=> {
    return Bo_v2_sale_violation.count({where,transaction} )
}

export default Bo_v2_sale_violation;

