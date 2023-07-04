import { ModelBase } from "@config/ModelBase";

class Bo_v2_campaign_member extends ModelBase {
    id
    user_id
    sort
    created_at
    updated_at
    deleted_at
    campaign_id
}
Bo_v2_campaign_member.init("bo_v2_campaign_member", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    user_id : {type : "int"},
    sort: {type : "tinyint(1)"},
    campaign_id: {type : "int"},
    created_at: {type: "datetime"},
    updated_at: {type: "datetime"},
    deleted_at: {type: "datetime"},
});

/**
 *
 * @param params {Bo_v2_campaign_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_campaign_member>}
 */
export  const addBoV2CampaignMemberMd = (params, transaction = false)=> {
    return Bo_v2_campaign_member.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_campaign_member|any}
 * @param where {Bo_v2_campaign_member|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_campaign_member>}
 */
export  const updateBoV2CampaignMemberMd = (attr , where ,transaction = false)=> {
    return Bo_v2_campaign_member.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_campaign_member|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_campaign_member[]>}
 */
export  const getListBoV2CampaignMemberMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_campaign_member.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_campaign_member|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_campaign_member>}
 */
export  const getDetailBoV2CampaignMemberMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_campaign_member.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_campaign_member|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2CampaignMemberMd = ( where,transaction =false )=> {
    return Bo_v2_campaign_member.count( {where,transaction} )
}
/**
 *
 * @param where {Bo_v2_campaign_member|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const delBoV2CampaignMemberMd = ( where,transaction =false )=> {
    return Bo_v2_campaign_member.del( where,transaction )
}

export default Bo_v2_campaign_member;

