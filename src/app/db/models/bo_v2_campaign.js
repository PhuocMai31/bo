import { ModelBase } from "@config/ModelBase";

class Bo_v2_campaign extends ModelBase {
    id
    name
    user_sale_ids
    category_id
    rule_time
    penalty
    status
    source_id
    update_by
    delete_by
    create_by
    created_at
    deleted_at
    updated_at
    user_id_manager
    round
}
Bo_v2_campaign.init("bo_v2_campaign", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    name: {type: "nvarchar(255)"},
    user_sale_ids: {type: "nvarchar(255)"},
    category_id: {type: "int(11)"},
    rule_time: {type: "int(11)"},
    penalty: {type: "int(4)",defaultValue:  0},
    status: {type: "tinyint(1)"},
    source_id: {type: "int(11)"},
    update_by: {type: "int(11)"},
    delete_by: {type: "int(11)"},
    create_by: {type: "int(11)"},
    company_id: {type: "int(11)"},
    round: {type: "int(4)",defaultValue : 0},
    user_id_manager: {type: "varchar(100)"},
    created_at: {type: "datetime"},
    deleted_at: {type: "datetime"},
    updated_at: {type: "datetime"},
});

/**
 *
 * @param params {Bo_v2_campaign|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_campaign>}
 */
export  const addBoV2CampaignMd = (params, transaction = false)=> {
    return Bo_v2_campaign.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_campaign|any}
 * @param where {Bo_v2_campaign|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_campaign>}
 */
export  const updateBoV2CampaignMd = (attr , where ,transaction = false)=> {
    return Bo_v2_campaign.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_campaign|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_campaign[]>}
 */
export  const getListBoV2CampaignMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr=false)=> {
    return Bo_v2_campaign.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_campaign|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_campaign>}
 */
export  const getDetailBoV2CampaignMd = ( where,transaction =false)=> {
    return Bo_v2_campaign.findItem( where ,transaction)
}
/**
 *
 * @param where {Bo_v2_campaign|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_campaign>}
 */
export  const countBoV2CampaignMd = ( where,transaction =false)=> {
    return Bo_v2_campaign.count({where,transaction} )
}
/**
 *
 * @param where {Bo_v2_campaign|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_campaign>}
 */
export  const deleteBoV2CampaignMd = ( where,transaction =false)=> {
    return Bo_v2_campaign.del( where ,transaction)
}

export default Bo_v2_campaign;
