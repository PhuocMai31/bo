import Bo_v2_sale_violation, {
    getListBoV2SaleViolationMd,
    updateBoV2SaleViolationMd,
    countBoV2SaleViolationMd,
    getDetailBoV2SaleViolationMd
} from "@model/bo_v2_sale_violation";
import {Model as YourModel2, Model as YourModel, Model, Op, QueryTypes, where} from "sequelize";
import {getDetailBoV2UserInfoMd, getListBoV2PermissionGroupMemberMd, getListBoV2UserInfoMd, sequelize} from "@model";
import Bo_v2_customer, {countBoV2CustomerMd, getListBoV2CustomerMd} from "@model/bo_v2_customer";
import {dateNowDataBase, pushNotSame, seqIn, updateFiles, uploadImg} from "@util";
import {getDetailBoV2CampaignMd, getListBoV2CampaignMd} from "@model/bo_v2_campaign";
import {countLogRp, ModelQuery} from "@lib";
import {list} from "pm2";
import {getDetailBOCategoryMd} from "@model/b_o_categories";
import {getListBoV2ExchangeMd} from "@model/bo_v2_exchange";
import {getListBoV2GroupSaleMd} from "@model/bo_v2_group_sale";
import {getListBoV2GroupMemberMd} from "@model/bo_v2_group_member";
import allotmentCustomerQueen from "@cron/allotmentCustomerCron";
import {getPermissionObjStaffByUser} from "@repository/permissionRepo";

/**
 * @param p
 * @param c {Controller}
 */
export const getDetailFilterViolatingCustomers = async ({id}, c) => {
    let where = {id: id}
    const data = await sequelize.query(`select a.id,
                                               a.user_id_sale,
                                               a.status,
                                               a.campaign_id,
                                               a.reason,
                                               a.created_at,
                                               a.deleted_at,
                                               a.updated_at,
                                               a.allotment_time,
                                               a.images,
                                               a.desc,
                                               a.customer_id,
                                               b.full_name,
                                               b.category_id
                                        from bo_v2_sale_violation as a,
                                             bo_v2_customer as b
                                        where a.id = ${id}
                                          and a.customer_id = b.id`)
    let user_id = data[0][0].user_id_sale
    const user = await sequelize.query(`select full_name
                                                                   from bo_v2_user_info
                                                                   where user_id = ${user_id}`)
    console.log(user)
    if (user) {
        data[0][0].name_sale = user[0][0].full_name
    }
    const category = await getDetailBOCategoryMd({id: data[0][0].category_id})
    if (category) {
        data[0][0].name_category = category.cb_title
    }
    c.data = data[0][0]
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const getListFilterViolatingCustomersOfSale = async ({
                                                                category_id,
                                                                from,
                                                                to,
                                                                campaign_id,
                                                                status,
                                                                source_id,
                                                                key_search,
                                                                limit,
                                                                page
                                                            }, c) => {
    let where = ``
    if (from && to) {
        where += ` and a.allotment_time between '${from}' and '${to}'`
    }
    if (campaign_id) {
        where += ` and a.campaign_id=${campaign_id}`
    }
    if (status) {
        where += ` and a.status = ${status}`
    }
    if (category_id) {
        category_id = JSON.parse(category_id)
        where += ` and b.category_id in (${category_id})`
    }
    if (key_search) {
        where += ` and (full_name like '%${key_search}%' or phone like '%${key_search}%')`
    }

    if (source_id) {
        where += ` and b.source_id = ${source_id}`
    }
    page = (page - 1) * 10
    const data = await sequelize.query(`select a.id,
                                               a.user_id_sale,
                                               a.campaign_id,
                                               a.reason,
                                               a.created_at,
                                               a.updated_at,
                                               a.allotment_time,
                                               a.images,
                                               a.desc,
                                               a.status,
                                               a.time_send_explanation,
                                               a.customer_id,
                                               b.category_id,
                                               b.full_name,
                                               b.phone,
                                               b.email,
                                               b.source_id,
                                               c.name,
                                               c.user_id_manager,
                                               c.company_id
                                        from bo_v2_sale_violation as a,
                                             bo_v2_customer as b,
                                             bo_v2_campaign as c,
                                             bo_v2_source as d
                                        where a.user_id_sale = ${c.user_id}
                                          and a.customer_id = b.id
                                          and a.campaign_id = c.id
                                          and b.source_id = d.id
                                          and d.status = 1 
                                          and d.deleted_at is null
                                          and a.deleted_at is null
                                          and b.deleted_at is null
                                          and c.deleted_at is null ${where}
                                          limit ${limit}
                                        offset ${page}
    `)
    data[0].sort(function (a, b) {
        if (a.status !== b.status) {
            if (a.status === 4) a.status = 3
            if (b.status === 4) b.status = 3
            return a.status - b.status;
        } else {
            let timeA, timeB;

            if (a.hasOwnProperty("created_at")) {
                timeA = new Date(a.created_at);
            } else if (a.hasOwnProperty("time_send_explanation")) {
                timeA = new Date(a.time_send_explanation);
            } else if (a.hasOwnProperty("updated_at")) {
                timeA = new Date(a.updated_at);
            }

            if (b.hasOwnProperty("created_at")) {
                timeB = new Date(b.created_at);
            } else if (b.hasOwnProperty("time_send_explanation")) {
                timeB = new Date(b.time_send_explanation);
            } else if (b.hasOwnProperty("updated_at")) {
                timeB = new Date(b.updated_at);
            }

            return timeB - timeA;
        }
    });
    c.data = data[0]
    c.mess = c.MESS.getData
}


/**
 * @param p
 * @param c {Controller}
 */
export const getListFilterViolatingCustomersOfManager = async ({
                                                                   user_id_sale,
                                                                   from,
                                                                   source_id,
                                                                   to,
                                                                   exchange_id,
                                                                   campaign_id,
                                                                   status,
                                                                   category_id,
                                                                   key_search,
                                                                   page,
                                                                   group_sale_id,
                                                                   limit
                                                               }, c) => {
    c.runValid({page, limit})
    if (c.v()) return
    const permission = await getPermissionObjStaffByUser(c.user_id)
    if (permission.campaign.length === 0) {
        c.data = []
        c.mess = c.MESS.getData
        return
    }
    console.log(permission)
    let where = ""
    page = (page - 1) * limit
    if (user_id_sale) {
        where += ` and a.user_id_sale = ${user_id_sale}`
    }
    if (source_id) {
        where += ` and c.source_id = ${source_id}`
    }
    if (group_sale_id) {
        where += ` and b.group_sale_id = ${group_sale_id}`
    }
    if (exchange_id) {
        where += ` and b.exchange_id = ${exchange_id}`
    }
    if (campaign_id) {
        permission.campaign = [campaign_id]
    }
    if (status) {
        console.log(JSON.parse(status))
        where += ` and a.status in (${JSON.parse(status)})`
    }
    const data = await sequelize.query(`select a.id, c.full_name,c.phone,c.source_id,c.category_id,a.allotment_time,a.created_at,a.updated_at,a.user_id_sale,a.status,a.campaign_id, d.full_name as name_sale
                                                                             from bo_v2_sale_violation as a,
                                                                                  bo_v2_group_member as b,
                                                                                  bo_v2_customer as c,
                                                                                  bo_v2_user_info as d,
                                                                                  bo_v2_source as e
                                                                                  where a.campaign_id in (${permission.campaign})
                                                                                  and a.customer_id = c.id
                                                                                  and a.user_id_sale=d.user_id
                                                                                  and c.source_id = e.id
                                                                                  and e.status = 1
                                                                                  and e.deleted_at is null
                                                                                  and a.deleted_at is null
                                                                                  and b.deleted_at is null
                                                                                  and c.deleted_at is null
                                                                                  and a.user_id_sale=b.user_id ${where}
                                                                                  order by a.created_at desc
                                                                                  limit ${limit} offset ${page}`)
    c.data = data[0]
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const countFilterViolatingCustomersOfManager = async ({
                                                                 user_id_sale,
                                                                 category_id,
                                                                 from,
                                                                 to,
                                                                 campaign_id,
                                                                 status,
                                                                 source_id,
                                                                 key_search,
                                                                 exchange_id, group_sale_id
                                                             }, c) => {
    const permission = await getPermissionObjStaffByUser(c.user_id)
    if (permission.campaign.length === 0) {
        c.data = []
        c.mess = c.MESS.getData
        return
    }
    console.log(permission)
    let where = ""
    if (user_id_sale) {
        where += ` and a.user_id_sale = ${user_id_sale}`
    }
    if (source_id) {
        where += ` and c.source_id = ${source_id}`
    }
    if (group_sale_id) {
        where += ` and b.group_sale_id = ${group_sale_id}`
    }
    if (exchange_id) {
        where += ` and b.exchange_id = ${exchange_id}`
    }
    if (campaign_id) {
        permission.campaign = [campaign_id]
    }
    if (status) {
        console.log(JSON.parse(status))
        where += ` and a.status in (${JSON.parse(status)})`
    }
    const data = await sequelize.query(`select count(*) as count
                                                                             from bo_v2_sale_violation as a,
                                                                                  bo_v2_group_member as b,
                                                                                  bo_v2_customer as c,
                                                                                  bo_v2_user_info as d,
                                                                                  bo_v2_source as e
                                                                                  where a.campaign_id in (${permission.campaign})
                                                                                  and a.customer_id = c.id
                                                                                  and a.user_id_sale=d.user_id
                                                                                  and c.source_id = e.id
                                                                                  and e.status = 1
                                                                                  and e.deleted_at is null
                                                                                  and a.deleted_at is null
                                                                                  and b.deleted_at is null
                                                                                  and c.deleted_at is null
                                                                                  and a.user_id_sale=b.user_id ${where}
                                                                                  `)
    c.data=data[0][0].count
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const countFilterViolatingCustomers = async ({
                                                        user_id_sale,
                                                        category_id,
                                                        from,
                                                        to,
                                                        campaign_id,
                                                        status,
                                                        source_id,
                                                        key_search
                                                    }, c) => {
    let where = ""
    if (user_id_sale) {
        where += ` and a.user_id_sale = ${user_id_sale}`
    }
    if (from && to) {
        where += ` and a.created_at between '${from}' and '${to}'`
    }
    if (campaign_id) {
        where += ` and a.campaign_id=${campaign_id}`
    }
    if (status) {
        where += ` and a.status = ${status}`
    }
    if (source_id) {
        where += ` and b.source_id = ${source_id}`
    }
    if (category_id) {
        where += ` and b.category_id = ${category_id}`
    }
    if (key_search) {
        where += ` and (full_name like '%${key_search}%' or phone like '%${key_search}%')`
    }
    const data = await sequelize.query(`select count(*) as t, b.full_name, a.id
                                        from bo_v2_sale_violation as a,
                                             bo_v2_customer as b,
                                             bo_v2_campaign as c,
                                             bo_v2_source as d
                                        where a.user_id_sale = ${c.user_id}
                                          and a.campaign_id = c.id
                                          and a.customer_id = b.id
                                          and b.source_id = d.id
                                          and d.status = 1
                                          and d.deleted_at is null
                                          and a.deleted_at is null
                                          and b.deleted_at is null
                                          and c.deleted_at is null
                                            ${where}`)
    c.data = data[0][0].t
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const sendExplanation = async ({reason, desc, files, id}, c) => {
    let time_send_explanation = dateNowDataBase(true)
    let status = 2
    c.runValid({
        S_reason: reason,
        S_desc: desc,
    })
    if (c.v()) return
    let images = undefined
    if (files.image) {
        let listImages = []
        for (let i = 0; i < files.image.length; i++) {
            let res = await updateFiles(files.image[i])
            listImages.push(res)
        }
        images = JSON.stringify(listImages)
    }
    const check = await getDetailBoV2SaleViolationMd({id})
    if (!check) {
        c.status = false
        c.mess = "Vi pham khong ton tai"
        return
    }
    c.data = await updateBoV2SaleViolationMd({status, reason, desc, images, time_send_explanation}, {id})

    c.mess = c.MESS.update
}

/**
 * @param p
 * @param c {Controller}
 */
export const cancelExplanation = async ({id}, c) => {
    let status = 1
    let reason = null
    let desc = null
    let images = null
    c.data = await updateBoV2SaleViolationMd({status, reason, desc, images}, {id})
    c.mess = c.MESS.update
}
/**
 * @param p
 * @param c {Controller}
 */
export const browseExplanations = async ({status, id}, c) => {
    const campaign = await getDetailBoV2SaleViolationMd({id})
    let campaign_id = campaign.campaign_id
    const checkPermission = await sequelize.query(`select * from bo_v2_campaign where id=${campaign_id} and JSON_CONTAINS(user_id_manager,${c.user_id})`)
    if (checkPermission[0].length === 0) {
        c.status = false;
        c.mess = "Ban khong co quyen"
        return
    }

    c.data = await updateBoV2SaleViolationMd({status}, {id})
    await allotmentCustomerQueen.push({id: campaign.campaign_id})
    c.mess = c.MESS.update
}


/**
 * @param p
 * @param c {Controller}
 */
export const getListSaleViolation = async ({
                                               user_id_sale,
                                               from,
                                               source_id,
                                               to,
                                               exchange_id,
                                               campaign_id,
                                               status,
                                               category_id,
                                               key_search,
                                               page,
                                               group_sale_id,
                                               limit
                                           }, c) => {
    c.runValid({page, limit})
    if (c.v()) return
    const query = new ModelQuery("bo_v2_sale_violation a,   bo_v2_group_member c,bo_v2_customer d")
    query.condition_2 = "a.user_id_sale = c.user_id"
    query.condition_3 = "a.deleted_at is null"
    if (c.p.master === false) {
        const map = await getPermissionObjStaffByUser(c.user_id)
        query.condition_5 = ` (  ${map.campaign.length ? `a.campaign_id in (${map.campaign}) or ` : ""} ${map.group.length ? `c.group_sale_id in (${map.group}) or ` : ""}  ${map.exchange.length ? `c.exchange_id in (${map.exchange}) or ` : ""}  a.user_id_sale = ${c.user_id}  )`
    }
    query.condition_14 = `a.customer_id = d.id`
    if (user_id_sale) {
        query.condition_6 = ` a.user_id_sale = ${user_id_sale}`
    }
    if (from && to) {
        query.condition_7 = ` a.allotment_time between '${from}' and '${to}'`
    }
    if (exchange_id) {
        query.condition_8 = ` c.exchange_id = ${exchange_id}`
    }
    if (campaign_id) {
        query.condition_9 = `  a.campaign_id= ${campaign_id}`
    }
    if (status) {
        query.condition_10 = `  a.status=${status}`
    }
    if (category_id) {
        query.condition_11 = `  d.category_id = ${category_id}`
    }
    if (source_id) {
        query.condition_12 += `  b.source_id = ${source_id}`
    }
    if (key_search) {
        query.condition_13 = `  (d.full_name like '%${key_search}%' or d.phone like '%${key_search}%')`
    }
    if (group_sale_id) {
        query.condition_14 = ` c.group_sale_id = ${group_sale_id}`
    }
    query.condition_15 = `c.deleted_at is null`
    query.condition_4 = `d.deleted_at is null`
    query.page = page
    query.limit = limit
    query.group = ["a.id"]
    query.attr = ["a.id", "d.full_name", "CONCAT('****', SUBSTRING(d.phone, 5) ) phone", "d.source_id", "d.category_id", "a.allotment_time", "a.created_at", "a.updated_at", "a.user_id_sale", "a.status", "a.campaign_id"]
    query.order [["a.created_at", "desc"]]
    c.data = await query.exe()
    c.mess = c.MESS.getData

}
export const countSaleViolation = async ({
                                             user_id_sale,
                                             from,
                                             source_id
                                             ,
                                             to,
                                             exchange_id,
                                             campaign_id,
                                             status,
                                             category_id,
                                             key_search,
                                             group_sale_id
                                         }, c) => {
    const query = new ModelQuery("bo_v2_sale_violation a,   bo_v2_group_member c,bo_v2_customer d")
    query.condition_2 = "a.user_id_sale = c.user_id"
    query.condition_3 = "a.deleted_at is null"
    query.condition_4 = "c.deleted_at is null"
    query.condition_15 = "d.deleted_at is null"
    if (c.p.master === false) {
        const map = await getPermissionObjStaffByUser(c.user_id)
        query.condition_5 = ` (  ${map.campaign.length ? `a.campaign_id in (${map.campaign}) or ` : ""} ${map.group.length ? `c.group_sale_id in (${map.group}) or ` : ""}  ${map.exchange.length ? `c.exchange_id in (${map.exchange}) or ` : ""}  a.user_id_sale = ${c.user_id}  )`
    }
    query.condition_14 = `a.customer_id = d.id`
    if (user_id_sale) {
        query.condition_6 = ` a.user_id_sale = ${user_id_sale}`
    }
    if (from && to) {
        query.condition_7 = ` a.allotment_time between '${from}' and '${to}'`
    }
    if (exchange_id) {
        query.condition_8 = ` c.exchange_id = ${exchange_id}`
    }
    if (campaign_id) {
        query.condition_9 = `  a.campaign_id= ${campaign_id}`
    }
    if (status) {
        query.condition_10 = `  a.status=${status}`
    }
    if (category_id) {
        query.condition_11 = `  b.category_id = ${category_id}`
    }
    if (source_id) {
        query.condition_12 += `  b.source_id = ${source_id}`
    }
    if (key_search) {
        query.condition_13 = `  (d.full_name like '%${key_search}%' or d.phone like '%${key_search}%')`
    }
    if (group_sale_id) {
        query.condition_14 = ` c.group_sale_id = ${group_sale_id}`
    }
    query.attr = ["COUNT(DISTINCT a.id) AS count"]
    query.plain = true
    query.order = []
    c.data = (await query.exe()).count
    c.mess = c.MESS.getData

}


/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const forgiveViolation = async ({ids}, c) => {
    /**
     *
     * @type {[]}
     */
    const _ids = JSON.parse(ids)
    const campaign_id = []
    for (let id of _ids) {
        const violation = await getDetailBoV2SaleViolationMd({id})
        if (violation === null) {
            continue
        }

        c.data = await updateBoV2SaleViolationMd({status: 6}, {id: id})
        pushNotSame(campaign_id, violation.campaign_id)

    }

    for (let campaignIdElement of campaign_id) {
        allotmentCustomerQueen.push({id: campaignIdElement})
    }
    await allotmentCustomerQueen.runCronJob()
    c.mess = c.MESS.update
}
