import {ModelBase} from "@config/ModelBase";

class Bo_v2_sale_customer_campaign_history extends ModelBase {
    id
    /**
         * @type  {"cham_soc", "thu_hoi", "phan_bo"}
     */
    action
    data
    campaign_id
    user_id_sale
    created_at
    deleted_at
    updated_at
    interactive_form
    interactive_status
    note
    customer_id
}

Bo_v2_sale_customer_campaign_history.init("bo_v2_sale_customer_campaign_history", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    action: {type: "varchar(20)"},
    customer_id: {type: "int(11)",defaultValue : 0},
    data: {type: "text"},
    campaign_id: {type: "int(11)",defaultValue : 0},
    user_id_sale: {type: "int(11)"},
    created_at: {type: "datetime"},
    deleted_at: {type: "datetime"},
    updated_at: {type: "datetime"},
    interactive_form: {type: "tinyint(1)" ,defaultValue : 0},
    interactive_status: {type: "tinyint(1)",defaultValue : 0},
    note: {type: "text"},
});

/**
 *
 * @param params {Bo_v2_sale_customer_campaign_history |any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_sale_customer_campaign_history>}
 */
export const addBoV2SaleCustomerCampaignHistoryMd = (params, transaction = false) => {
    return Bo_v2_sale_customer_campaign_history.create(params, {transaction})
}


/**
 *
 * @param attr {Bo_v2_sale_customer_campaign_history|any}
 * @param where {Bo_v2_sale_customer_campaign_history|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_sale_customer_campaign_history>}
 */
export const updateBoV2SaleCustomerCampaignHistoryMd = (attr, where, transaction = false) => {
    return Bo_v2_sale_customer_campaign_history.findOneAndUpdate(attr, where, transaction)
}


/**
 *
 * @param where {Bo_v2_sale_customer_campaign_history|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_sale_customer_campaign_history[]>}
 */
export const getListBoV2SaleCustomerCampaignHistoryMd = (where, transaction = false, limit = false, page = false, order = false, group = false, attr = false) => {
    return Bo_v2_sale_customer_campaign_history.findArr(where, transaction, limit, page, order, group, attr)
}


/**
 *
 * @param where {Bo_v2_sale_customer_campaign_history|any}
 * @param transaction {any}
 * @param order {[]|any}
 * @param attr{[]|any}
 * @return {Promise<Bo_v2_sale_customer_campaign_history>}
 */
export const getDetailBoV2SaleCustomerCampaignHistoryMd = (where , transaction = false,attr =false, order =false) => {
    return Bo_v2_sale_customer_campaign_history.findItem(where, transaction,attr ,order )
}

/**
 *
 * @param where {Bo_v2_sale_customer_campaign_history|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export const countBoV2SaleCustomerCampaignHistoryMd = (where, transaction = false) => {
    return Bo_v2_sale_customer_campaign_history.count({where ,transaction}, )
}

export default Bo_v2_sale_customer_campaign_history;

