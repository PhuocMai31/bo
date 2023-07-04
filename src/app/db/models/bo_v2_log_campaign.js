import { ModelBase } from "@config/ModelBase";

class Bo_v2_log_campaign extends ModelBase {
    id
    violation_id
    campaign_id
    round_number
    customer_id
    user_id_sale
    created_at
    deleted_at
    updated_at
    is_allotted
    sort
}
Bo_v2_log_campaign.init("bo_v2_log_campaign", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    violation_id : {type : "int(11)"},
    campaign_id : {type : "int(11)" ,defaultValue : 0},
    round_number : {type : "int(5)"},
    customer_id : {type : "int(11)" ,defaultValue : 0},
    user_id_sale : {type : "int(11)"},
    sort : {type : "int(11)"},
    is_allotted : {type : "tinyint(11)" ,defaultValue : 0},
    created_at : {type : "datetime"},
    deleted_at : {type : "datetime"},
    updated_at : {type : "datetime"},

});

/**
 *
 * @param params {Bo_v2_log_campaign|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_log_campaign>}
 */
export  const addBoV2LogCampaignMd = (params, transaction = false)=> {
    return Bo_v2_log_campaign.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_log_campaign|any}
 * @param where {Bo_v2_log_campaign|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_log_campaign>}
 */
export  const updateBoV2LogCampaignMd = (attr , where ,transaction = false)=> {
    return Bo_v2_log_campaign.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_log_campaign|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_log_campaign[]>}
 */
export  const getListBoV2LogCampaignMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_log_campaign.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_log_campaign|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @param order {[]|any}
 * @return {Promise<Bo_v2_log_campaign>}
 */
export  const getDetailBoV2LogCampaignMd = ( where,transaction =false , attr =false ,order =false)=> {
    return Bo_v2_log_campaign.findItem( where ,transaction ,attr,order)
}



/**
 *
 * @param where {Bo_v2_log_campaign|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2LogCampaignMd = ( where,transaction =false )=> {
    return Bo_v2_log_campaign.count( {where,transaction} )
}

export default Bo_v2_log_campaign;
