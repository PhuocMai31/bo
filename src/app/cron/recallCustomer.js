import {ArrRedis, cacheRedis} from "@lib/redis";
import {getListBoV2CustomerMd, updateBoV2CustomerMd} from "@model/bo_v2_customer";
import {getDetailBoV2CampaignMd} from "@model/bo_v2_campaign";
import {
    addBoV2SaleCustomerCampaignHistoryMd,
    getDetailBoV2SaleCustomerCampaignHistoryMd
} from "@model/bo_v2_sale_customer_campaign_history";
import {aLog1Rp, sum_minus} from "@lib";
import {MyCron} from "@lib/cron";
import {addBoV2SaleViolationMd} from "@model/bo_v2_sale_violation";
import allotmentCustomerQueen from "@cron/allotmentCustomerCron";
import notifyQueen from "@cron/notifyCron";
import {TYPE_SENDER} from "@constant";

/**
 *
 * @return {void}
 */

export const runRecallCustomer = new MyCron()

runRecallCustomer.callback = async () => {
    const customers = await getListBoV2CustomerMd({
        create_type: 1,
        status_allocation: 2,
    })
    /**
     * @type {Bo_v2_campaign[]}
     */
    const campaigns = []
    for (let customer of customers) {

        /**
         * @type {Bo_v2_campaign}
         */
        const campaign = await cacheRedis("campaign_" + customer.source_id + "_" + customer.category_id, () => {
            return getDetailBoV2CampaignMd({
                source_id: customer.source_id,
                category_id: customer.category_id,
            })
        }, 50)

        if (campaign === null) continue
        const history = await getDetailBoV2SaleCustomerCampaignHistoryMd({customer_id: customer.id}, false, false, [["created_at", "desc"]])
        if (history === null) {
            continue
        }
        if (history.action === "phan_bo") {
            const now = new Date()
            const expiredTime = new Date(sum_minus(campaign.rule_time, new Date(history.created_at)))
            aLog1Rp("campaginsrun", {expiredTime, now})
            if (now > expiredTime) {
                await updateBoV2CustomerMd({status_allocation: 1, user_id_sale: 0}, {id: customer.id})
                await addBoV2SaleCustomerCampaignHistoryMd({
                    customer_id: customer.id,
                    action: "thu_hoi",
                    campaign_id: campaign.id,
                    user_id_sale: customer.user_id_sale
                })
                const violation = await addBoV2SaleViolationMd({
                    user_id_sale: customer.user_id_sale,
                    status: 1,
                    campaign_id: campaign.id,
                    customer_id: customer.id,
                    allotment_time: customer.create_date
                })
                aLog1Rp("noitfyK" , {
                    id_sender: customer.id,
                    type_sender: TYPE_SENDER.vipham,
                    user_id: customer.user_id_sale
                })
                await notifyQueen.push({
                    title: "Thu hồi khách hàng",
                    body: `KH ${customer.full_name} vừa bị thu hồi khỏi danh sách chăm sóc của bạn vì lý do quá hạn chưa chăm sóc`,
                    id_sender: violation.id,
                    type_sender: TYPE_SENDER.vipham,
                    user_id: customer.user_id_sale
                })
                notifyQueen.runCronJob()
                if (campaigns.find((value) => value.id === campaign.id) === undefined)
                    campaigns.push(campaign)
            }
        }
    }
    await aLog1Rp("campaginsrun", campaigns)
    for (let campaign of campaigns) {
        if (campaign.status === 1) await allotmentCustomerQueen.push({id: campaign.id})
    }
}
