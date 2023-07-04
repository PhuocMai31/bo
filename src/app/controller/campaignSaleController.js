import {
    addBoV2CampaignSaleMd,
    countBoV2CampaignSaleMd, getDetailBoV2CampaignSaleMd,
    getListBoV2CampaignSaleMd,
    updateBoV2CampaignSaleMd
} from "@model/bo_v2_campaign_sale";
import {addWardMd} from "@model/ward";
import {seqLike, whereSequelize} from "@util";
import {aLog1Rp} from "@lib";
import {countBoV2BillMd} from "@model/bo_v2_bill";

/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const addCampaignSale = async ({
                                          title,
                                          max,
                                          time_start,
                                          time_end,
                                          category_id,
                                          total,
                                          company_id,
                                          building_id,
                                          desc
                                      }, c) => {
    c.runValid({
        title,
        category_id,
        total,
    })
    if (c.v()) return
    c.data = await addBoV2CampaignSaleMd({title, max, time_start, time_end, category_id, total, building_id})
    c.mess = c.MESS.addData
}
/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const updateCampaignSale = async ({
                                             id,
                                             title,
                                             max,
                                             time_start,
                                             time_end,
                                             category_id,
                                             total,
                                             company_id,
                                             building_id,
                                             desc,
                                             status
                                         }, c) => {
    aLog1Rp("updateCampaignSale", {
        id,
        title,
        max,
        time_start,
        time_end,
        category_id,
        total,
        company_id,
        building_id,
        desc,
        status
    })
    c.runValid({
        id
    })
    if (c.v()) return
    c.data = await updateBoV2CampaignSaleMd({
        title,
        max,
        time_start,
        time_end,
        category_id,
        total,
        building_id,
        status
    }, {id})
    aLog1Rp("updateCampaignSale", {
        da: c.data
    })
    c.mess = c.MESS.update
}


/**
 * @param p
 * @param c {Controller}
 */
export const getListCampaignSale = async ({limit, page, category_id, building_id , title , status}, c) => {
    c.runValidAlNull({limit, page})
    if (c.v()) return
    const where = whereSequelize({category_id, building_id , status})
    if(title) {
        where.title = seqLike(title)
    }
    const data = await getListBoV2CampaignSaleMd(where, false, limit, page)
    for (const datum of data) {
        const countBill = await countBoV2BillMd({campaign_sale_id:datum.id})
        datum.vacant_position=datum.max-countBill
    }
    c.data=data
    c.mess = c.MESS.getData
}

/**
 * @param p
 * @param c {Controller}
 */
export const countCampaignSale = async ({limit, page, category_id, building_id ,title , status}, c) => {
    const where = whereSequelize({category_id, building_id , status})
    if(title) {
        where.title = seqLike(title)
    }
    c.data = await countBoV2CampaignSaleMd(where)
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */

export const getDetailCampaignSale = async ({id}, c) => {
    c.data = await getDetailBoV2CampaignSaleMd({id})
    c.mess = c.MESS.getData
}
