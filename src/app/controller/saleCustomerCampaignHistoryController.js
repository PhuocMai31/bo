import {
    addBoV2SaleCustomerCampaignHistoryMd,
    getListBoV2SaleCustomerCampaignHistoryMd
} from "@model/bo_v2_sale_customer_campaign_history";
import {TYPE_HIS_CUSTOMER} from "@constant";
import {getDetailBoV2CustomerMd, updateBoV2CustomerMd} from "@model/bo_v2_customer";

/**
 *
 * @param p
 * @param c {Controller}
 */
export const addSaleCustomerCampaignHistoryTakeCare = async ({
                                                                 customer_id,
                                                                 interactive_form,
                                                                 interactive_status, note
                                                             }, c) => {
    c.runValid({
        N_customer_id: customer_id, N_interactive_form: interactive_form,
        N_interactive_status: interactive_status,
    });
    if (c.v()) return
    const boV2U = await getDetailBoV2CustomerMd({id: customer_id, user_id_sale: c.user_id})
    if (!boV2U) {
        c.status = false
        c.mess = "Không tìm thấy khách hàng"
        return
    }
    if (boV2U.status_allocation === 2 && boV2U.create_type === 1)
        await updateBoV2CustomerMd({interactive_status, status_allocation: 3 ,final_time_care : new Date()}, {id: boV2U.id})
    else
        await updateBoV2CustomerMd({interactive_status ,final_time_care : new Date() }, {id: boV2U.id})

    c.data = await addBoV2SaleCustomerCampaignHistoryMd({
        user_id_sale: c.user_id,
        campaign_id: 0,
        interactive_form,
        interactive_status,
        action: TYPE_HIS_CUSTOMER.cham_soc,
        customer_id, note
    })
    c.mess = c.MESS.getData
}
/**
 *
 * @param p
 * @param c {Controller}
 */
export const getListSaleCustomerCampaignHistory = async ({customer_id, page, limit}, c) => {
    c.runValid({N_customer_id: customer_id, page, limit})
    if (c.v()) return
    const where = {   customer_id,}
    if(c.p.master === false) {
        where.user_id_sale = c.user_id
    }
    c.data = await getListBoV2SaleCustomerCampaignHistoryMd(where, false, limit, page, [["created_at", "asc"]])
    c.mess = c.MESS.getData
}
