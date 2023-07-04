import {aLog1Rp, ArrRedis, ModelQuery, validMapLiD} from "@lib";
import {getDetailBoV2CampaignMd, updateBoV2CampaignMd} from "@model/bo_v2_campaign";
import {getListBoV2CustomerMd, updateBoV2CustomerMd} from "@model/bo_v2_customer";
import {
    getDetailBoV2SaleViolationMd,
    getListBoV2SaleViolationMd,
    updateBoV2SaleViolationMd
} from "@model/bo_v2_sale_violation";
import {
    addBoV2LogCampaignMd,
    countBoV2LogCampaignMd,
    getListBoV2LogCampaignMd,
    updateBoV2LogCampaignMd
} from "@model/bo_v2_log_campaign";
import {addBoV2SaleCustomerCampaignHistoryMd} from "@model/bo_v2_sale_customer_campaign_history";
import {sendToTelegram, seqIn} from "@util";
import notifyQueen from "@cron/notifyCron";
import {STATUS, TYPE_SENDER} from "@constant";
import {getListBoV2CampaignMemberMd} from "@model/bo_v2_campaign_member";


const allotmentCustomerQueen = new ArrRedis("allotmentCustomerQueen");

/**
 *
 * @param id
 * @returns {Promise<void>}
 */
allotmentCustomerQueen.callbackCron = async ({id}) => {
    try {
        const campaign = await getDetailBoV2CampaignMd({id: id, status: 1})
        if (campaign === null) return
        const customers = await getListBoV2CustomerMd({
            category_id: campaign.category_id,
            source_id: campaign.source_id,
            status_allocation: 1
        })
        if (customers.length === 0) return
        console.log(customers)

        const campaignMembers = await getListBoV2CampaignMemberMd({campaign_id: campaign.id}, false, false, false, [["sort", "asc"],["id" , "asc"]])
        //   lấy danh sách phân bổ lần trước
        aLog1Rp("check1", {id, campaignMembers})
        const data_log = await getListBoV2LogCampaignMd({
            campaign_id: campaign.id,
            round_number: campaign.round
        }, false, false, false, [["sort", "asc"], ["id" , "asc"]])
        console.debug(data_log)

        aLog1Rp("data_log", data_log, 12)
        let allIsViolation = true
        //  dừng lại khi chiến dịch có tất cả đều vi phạm trong 1 round phân bổ
        //  khi có nhân viên mới thêm khi phân bổ lại thì sẽ pass qua phần chiến dịch vi phạm này
        for (let dataLogElement of campaignMembers) {
            const violations = await getDetailBoV2SaleViolationMd({
                user_id_sale: dataLogElement.user_id,
                campaign_id: campaign.id,
                status: seqIn([1, 2])
            })
            if (violations === null ) {
                allIsViolation = false
            }
        }

        if (allIsViolation && data_log.length > 0) {

            return
        }

        if ( data_log.length > 0  && data_log.find(value => value.is_allotted === 0)) {
            await phanBo(data_log, campaign, customers)
        }

        //  chạy phân bổ
        do {
            if(customers.length === 0 )break;
            campaign.round += 1
            const log = await addLogByCampaignMember(campaignMembers, campaign.round)
            await phanBo(log, campaign, customers)
        } while (customers.length > 0)
        await updateBoV2CampaignMd({round: campaign.round}, {id: campaign.id})
    } catch (e) {
        sendToTelegram("loi phan bo", JSON.stringify({
            id
        }))
    }

};

/**
 * @param campaign_members {Bo_v2_campaign_member[]}
 * @param round
 * @return {Promise<Bo_v2_log_campaign[]>}
 */
const addLogByCampaignMember = async (campaign_members, round) => {
    const result = []
    for (const campaignMember of campaign_members) {
        const data = await addBoV2LogCampaignMd({
            campaign_id: campaignMember.campaign_id,
            user_id_sale: campaignMember.user_id,
            round_number : round,
            sort: campaignMember.sort
        })
        result.push(data)
    }
    return result
}
/**
 * phân bổ
 * @param members {Bo_v2_log_campaign[]}
 * @param campaign {Bo_v2_campaign}
 * @param customers{Bo_v2_customer[]}
 */
const phanBo = async (members, campaign, customers) => {
    if(customers.length === 0) return
    for (let member of members) {
        if (member.is_allotted === 1) continue
        const violations = await getListBoV2SaleViolationMd({
            user_id_sale: member.user_id_sale,
            campaign_id: member.campaign_id,
            status: seqIn([1, 2])
        })
        //      trường hợp vi phạm sử lý bỏ qua
        let is_violation = false
        for (let violation of violations) {
            const countLogViolation = await countBoV2LogCampaignMd({
                violation_id: violation.id,
                campaign_id: violation.campaign_id,
                user_id_sale: member.user_id_sale
            })
            if (countLogViolation < campaign.penalty) {
                await updateBoV2LogCampaignMd({
                    is_allotted: STATUS.ON,
                    violation_id: violation.id,
                }, {id: member.id})
                if (countLogViolation + 1 === campaign.penalty) {
                    await updateBoV2SaleViolationMd({status: 5}, {id: violation.id})
                }
                is_violation = true
            }
        }
        if (is_violation)
            continue
        //      trường hợp phân bổ
        const customer = customers.pop()
        if (customer === undefined) return
        const timePhanBo = new Date(new Date().getTime() + 20 * 1000)
        const update = await updateBoV2CustomerMd({
            user_id_sale: member.user_id_sale,
            status_allocation: 2,
            create_date: timePhanBo,
            campaign_id: campaign.id
        }, {id: customer.id})
        await addBoV2SaleCustomerCampaignHistoryMd({
            user_id_sale: member.user_id_sale,
            campaign_id: campaign.id,
            action: "phan_bo",
            interactive_form: 0,
            interactive_status: 0,
            customer_id: customer.id,
            created_at: timePhanBo
        })

        aLog1Rp("noitfyK", {
            id_sender: customer.id,
            type_sender: TYPE_SENDER.vipham,
            user_id: member.user_id_sale,
        })
        await notifyQueen.push({
            title: "Khách hàng mới được phân bổ",
            body: ` Bạn vừa nhận được phân bổ khách hàng mới. Khách hàng cần chăm sóc: ${customer.full_name}`,
            id_sender: customer.id,
            type_sender: TYPE_SENDER.vipham,
            user_id: member.user_id_sale,
        })
        notifyQueen.runCronJob()
        await updateBoV2LogCampaignMd({
            customer_id: customer.id,
            is_allotted: STATUS.ON
        }, {id: member.id})

    }
}


export default allotmentCustomerQueen;


