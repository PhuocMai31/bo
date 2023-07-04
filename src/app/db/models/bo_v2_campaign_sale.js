
import { ModelBase } from "@config/ModelBase";

class Bo_v2_campaign_sale extends ModelBase {
    id
    title
    max
    time_start
    time_end
    category_id
    total
    company_id
    building_id
    deleted_at
    updated_at
    created_at
    desc
    status
}
Bo_v2_campaign_sale.init("bo_v2_campaign_sale", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    title : {type : "varchar(255)"},
    max : {type : "int" , defaultValue : 1},
    time_start : {type : "datetime"},
    time_end : {type : "datetime"},
    category_id : {type : "int"},
    total : {type : "bigint"},
    company_id : {type : "int"},
    building_id : {type : "int" , defaultValue : 0},
    deleted_at : {type : "datetime"},
    updated_at : {type : "datetime"},
    created_at : {type : "datetime"},
    desc : {type : "text"},
    status : {type : "tinyint(1)" ,defaultValue : 1},

});
/**
 *
 * @param params {Bo_v2_campaign_sale|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_campaign_sale>}
 */
export  const addBoV2CampaignSaleMd = (params, transaction = false)=> {
    return Bo_v2_campaign_sale.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_campaign_sale|any}
 * @param where {Bo_v2_campaign_sale|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_campaign_sale>}
 */
export  const updateBoV2CampaignSaleMd = (attr , where ,transaction = false)=> {
    return Bo_v2_campaign_sale.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_campaign_sale|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_campaign_sale[]>}
 */
export  const getListBoV2CampaignSaleMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_campaign_sale.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_campaign_sale|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_campaign_sale>}
 */
export  const getDetailBoV2CampaignSaleMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_campaign_sale.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_campaign_sale|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2CampaignSaleMd = ( where,transaction =false )=> {
    return Bo_v2_campaign_sale.count( {where,transaction} )
}



/**
 *
 * @param where {Bo_v2_campaign_sale|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_campaign_sale>}
 */
export  const delBoV2CampaignSaleMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_campaign_sale.findItem( where ,transaction ,attr)
}

export default Bo_v2_campaign_sale;

