import {REGEX} from "@constant";
import {
    countBoV2CampaignMd,
    deleteBoV2CampaignMd,
    getDetailBoV2CampaignMd,
    getListBoV2CampaignMd, updateBoV2CampaignMd
} from "@model/bo_v2_campaign";
import {addCampaignRp, updateCampaignRp} from "@repository/campaignRepo";
import {Op} from "sequelize";
import {aLog1Rp} from "@lib";
import {addBoV2CampaignMemberMd, getListBoV2CampaignMemberMd} from "@model/bo_v2_campaign_member";
import {validNumber} from "@util";

/**
 * @param  p {{
 *     name,
 *     user_sale_ids : [],
 *     category_id,
 *     rule_time,
 *     penalty,
 *     source_id,
 *     user_id_manager : [],
 *     company_id
 * }}
 * @param c {Controller}
 */
export const addCampaign = async ({
                                      name,
                                      user_sale_ids,
                                      category_id,
                                      rule_time,
                                      penalty,
                                      source_id,
                                      user_id_manager,
                                      company_id
                                  }, c) => {
    aLog1Rp("addCampaign", {
        name,
        user_sale_ids,
        category_id,
        rule_time,
        penalty,
        source_id,
        user_id_manager,
    })
    c.valid(
        {v: category_id, f: REGEX.C_NUMBER, m: "Không được để trống dự án"},
        {v: rule_time, f: REGEX.C_NUMBER, m: "Không được để trống thời gian chăm sóc"},
        {v: penalty, f: REGEX.C_NUMBER, n: "penalty", c: "AllowUndefined"},
        {v: source_id, f: REGEX.C_NUMBER, n: "source_id",},
    )
    if (c.v()) return
    user_sale_ids = JSON.parse(user_sale_ids)
    user_id_manager = JSON.parse(user_id_manager)
    const checkSources = await getDetailBoV2CampaignMd({source_id, category_id})

    if (checkSources) {
        c.mess = "Chiến dịch cho nguồn này đã tồn tại"
        c.status = false
        return
    }

    c.data = await addCampaignRp(
        name,
        category_id,
        rule_time,
        penalty,
        source_id,
        user_sale_ids,
        c.user_id, user_id_manager,
        company_id
    )


    c.mess = c.MESS.addData
};

/**
 * @param p
 * @param c {Controller}
 */
export const getListCampaign = async ({category_id, source_id, name, user_id_manager , limit , page, status}, c) => {
    const where = {}
    if (user_id_manager) where.user_id_manager = user_id_manager
    if (source_id) where.source_id = source_id
    if (name) where.name = {[Op.like]: `%${name}%`}
    if (category_id) where.category_id = category_id
    if (validNumber(status)) where.status = status
    c.data = await getListBoV2CampaignMd(where ,false , limit , page)
    c.mess = c.MESS.getData
}


/**
 * @param p
 * @param c {Controller}
 */
export const countCampaign = async ({category_id, source_id, name, user_id_manager}, c) => {
    const where = {}
    if (user_id_manager) where.user_id_manager = user_id_manager
    if (source_id) where.source_id = source_id
    if (name) where.name = {[Op.like]: `%${name}%`}
    if (category_id) where.category_id = category_id
    c.data = await countBoV2CampaignMd(where)
    c.mess = c.MESS.getData
};


/**
 *
 * @param id
 * @param name
 * @param user_sale_ids
 * @param category_id
 * @param rule_time
 * @param penalty
 * @param status
 * @param source_id
 * @param update_by
 * @param delete_by
 * @param create_by
 * @param user_id_manager : []
 * @param company_id
 * @param c {Controller}
 * @returns {Promise<void>}
 */

export const updateCampaign = async ({
                                         id,
                                         name,
                                         user_sale_ids,
                                         category_id,
                                         rule_time,
                                         penalty,
                                         status,
                                         source_id,
                                         update_by,
                                         delete_by,
                                         create_by,
                                         user_id_manager, company_id
                                     }, c) => {
    aLog1Rp("updateCampaign", {
        id,
        name,
        user_sale_ids,
        category_id,
        rule_time,
        penalty,
        status,
        source_id,
        update_by,
        delete_by,
        create_by,
        user_id_manager, company_id
    })
    if (user_sale_ids)
        user_sale_ids = JSON.parse(user_sale_ids);
    if (user_id_manager)
        user_id_manager = JSON.parse(user_id_manager)
    const checkCampaign = await getDetailBoV2CampaignMd({id})
    if (!checkCampaign) {
        c.status = false
        c.mess = "Chien dich khong ton tai"
        return
    }
    if (category_id || source_id) {
        if (checkCampaign.round > 0) {
            c.status = false;
            c.mess = "Bạn không thể cập nhập vì chiến dịch đã có khách hàng"
            return
        }
        let where = {}
        where.category_id = category_id ? category_id : checkCampaign.category_id
        where.source_id = source_id ? source_id : checkCampaign.source_id
        const checkSource = await getDetailBoV2CampaignMd(where)
        if (checkSource) {
            c.status = false
            c.mess = "Chien dich nguon nay da ton tai"
            return
        }
    }
    const data =await  updateCampaignRp(name, user_sale_ids  , category_id , rule_time , penalty , status,source_id, c.user_id,user_id_manager , company_id, id)
    c.mess = c.MESS.update
}

/**
 * @param p
 * @param c {Controller}
 */
export const deleteCampaign = async ({id}, c) => {
    const checkCampaign = await getDetailBoV2CampaignMd({id})
    if (!checkCampaign) {
        c.status = false
        c.mess = "Chien dich khong ton tai"
        return
    }
    const deleteCampaign = await deleteBoV2CampaignMd({id})
    c.mess = c.MESS.delete
}
/**
 * @param p
 * @param c {Controller}
 */
export const getDetailCampaign = async (p, c) => {
    const campaign = await getDetailBoV2CampaignMd({id: p.id})
    if (campaign) {
        campaign.user_sale_ids = await getListBoV2CampaignMemberMd({campaign_id: campaign.id}, false, false, false, false, false,["id", "user_id", "sort"])
    }
    c.data = campaign
    c.mess = c.MESS.getData
};
