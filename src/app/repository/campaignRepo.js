import {addBoV2CampaignMd, getDetailBoV2CampaignMd, updateBoV2CampaignMd} from "@model/bo_v2_campaign";
import {getListBoV2CustomerMd, updateBoV2CustomerMd} from "@model/bo_v2_customer";
import {
    addBoV2SaleCustomerCampaignHistoryMd,
    countBoV2SaleCustomerCampaignHistoryMd,
} from "@model/bo_v2_sale_customer_campaign_history";
import {
    addBoV2SaleViolationMd,
    countBoV2SaleViolationMd,
    getListBoV2SaleViolationMd
} from "@model/bo_v2_sale_violation";
import {
    addBoV2PermissionGroupMemberMd, delBoV2PermissionGroupMemberMd,
    getDetailBoV2PermissionGroupMemberMd,
    getDetailBoV2UserMd, getListBoV2PermissionGroupMemberMd,
    sequelize
} from "@model";
import {addBoV2LogCampaignMd, countBoV2LogCampaignMd} from "@model/bo_v2_log_campaign";
import {ModelQuery, sum_minus} from "@lib";
import {Op} from "sequelize";
import {sendToTelegram, validNumber} from "@util";
import allotmentCustomerQueen from "@cron/allotmentCustomerCron";
import allotmentCustomerCron from "@cron/allotmentCustomerCron";
import {addPermissionGroupMember} from "@controller/permissionGroupMember";
import {
    addBoV2CampaignMemberMd,
    delBoV2CampaignMemberMd, getListBoV2CampaignMemberMd,
    updateBoV2CampaignMemberMd
} from "@model/bo_v2_campaign_member";

/**
 *
 * @param name
 * @param category_id
 * @param rule_time
 * @param penalty
 * @param source_id
 * @param user_sale_ids {[{user_id , sort}]}
 * @param create_by
 * @param user_id_manager  {[]}
 * @param company_id
 * @param status
 * @return {Promise<Bo_v2_campaign>}
 */
export const addCampaignRp = async (name,
                                    category_id,
                                    rule_time,
                                    penalty,
                                    source_id, user_sale_ids, create_by, user_id_manager, company_id, status = undefined
) => {
    const campaign = await addBoV2CampaignMd({
        name,
        category_id,
        rule_time,
        penalty,
        source_id,
        create_by,
        user_id_manager: JSON.stringify(user_id_manager),
        status: 1,
        company_id
    })

    for (let userIdManagerElement of user_id_manager) {
        await addBoV2PermissionGroupMemberMd({
            staff_object_id: "quanlychiendich",
            scope_type: "campaign",
            scope_id: campaign.id,
            user_id: userIdManagerElement,
        })
    }
    for (let user of user_sale_ids) {
        await addBoV2CampaignMemberMd({user_id: user.user_id, sort: user.sort , campaign_id : campaign.id})
    }

    await allotmentCustomerQueen.push({id: campaign.id})
    allotmentCustomerQueen.runCronJob()
    return campaign
}


/**
 * @param p
 * @param c {Controller}
 */
export const getDetailCampaign = async (p, c) => {
    const campaign = await getDetailBoV2CampaignMd({id: p.id})
    if (campaign) {
        campaign.user_sale_ids = await getListBoV2CampaignMemberMd({campaign_id: campaign.id}, false, false, false, false, ["id", "user_id", "sort"])
    }
    c.data = campaign
    c.mess = c.MESS.getData
};

/**
 *
 * @param name
 * @param user_sale_ids {[{user_id , sort ,id ,deleted_at }]}
 * @param category_id
 * @param rule_time
 * @param penalty
 * @param status
 * @param source_id
 * @param update_by
 * @param user_id_manager
 * @param company_id
 * @param id
 * @returns {Promise<void>}
 */
export const updateCampaignRp = async (
    name,
    user_sale_ids,
    category_id,
    rule_time,
    penalty,
    status,
    source_id,
    update_by,
    user_id_manager,
    company_id,
    id
) => {
    await updateBoV2CampaignMd({
        name,
        category_id,
        rule_time,
        penalty,
        status,
        source_id,
        update_by,
        user_id_manager: user_id_manager ? JSON.stringify(user_id_manager) : undefined,
        company_id
    }, {id})
    if (user_id_manager) {


        for (let userIdManagerElement of user_id_manager) {
            const permission_member = await getDetailBoV2PermissionGroupMemberMd({
                user_id: userIdManagerElement,
                staff_object_id: "quanlychiendich",
                scope_id: id
            })
            if (permission_member === null) {
                await addBoV2PermissionGroupMemberMd({
                    staff_object_id: "quanlychiendich",
                    scope_type: "campaign",
                    scope_id: id,
                    user_id: userIdManagerElement,
                })
            }
        }
        const listD = await getListBoV2PermissionGroupMemberMd({
            staff_object_id: "quanlychiendich",
            scope_type: "campaign",
            scope_id: id,
            user_id: {[Op.notIn]: user_id_manager}
        })
        for (let boV2PermissionGroupMember of listD) {
            await delBoV2PermissionGroupMemberMd({id: boV2PermissionGroupMember.id})
        }
    }
    const campaign = await getDetailBoV2CampaignMd({id},)

    // them sua xóa member campaign
    for (let userSaleId of user_sale_ids) {
        if (userSaleId.id && userSaleId.deleted_at === 1) {
            await delBoV2CampaignMemberMd({id: userSaleId.id})
            continue
        }
        if (userSaleId.id) {
            await updateBoV2CampaignMemberMd({sort: userSaleId.sort}, {id: userSaleId.id})
            continue
        }


        const member = await addBoV2CampaignMemberMd({sort: userSaleId.sort, user_id: userSaleId.user_id, campaign_id: id})
        if(campaign.round) {
            await addBoV2LogCampaignMd({
                sort : 1000,
                campaign_id :campaign.id,
                user_id_sale : member.user_id,
                round_number : campaign.round,

            })
        }
    }
    if (validNumber(status)) {
        await allotmentCustomerQueen.push({id: campaign.id})
        allotmentCustomerQueen.runCronJob()
    }
}