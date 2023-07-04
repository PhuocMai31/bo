import {
    addBoV2CustomerMd, countBoV2CustomerMd, deleteBoV2CustomerMd,
    getDetailBoV2CustomerMd,
    getListBoV2CustomerMd,
    updateBoV2CustomerMd
} from "@model/bo_v2_customer";
import {
    dateNowDataBase,
    mapPermission, pushNotSame,
    removeBuffer,
    seqOr,
    updateFiles,
    uploadFiles,
    uploadFilesV2,
    uploadImg
} from "@util";
import {addLogRp, aLog1Rp, getDateName, ModelQuery, readExel2} from "@lib";
import {Op, QueryTypes, where} from "sequelize";
import {REGEX, STAFF} from "@constant";
import {importCustomerRp, importCustomerV2Rp, mapCustomer} from "@repository/customerRp";
import {getDetailBoV2GroupMemberMd, getListBoV2GroupMemberMd} from "@model/bo_v2_group_member";
import {getDetailBoV2GroupSaleMd, getListBoV2GroupSaleMd} from "@model/bo_v2_group_sale";
import {getDetailBoV2ExchangeMd, getListBoV2ExchangeMd} from "@model/bo_v2_exchange";
import {getDetailBoV2CompanyMd} from "@model/bo_v2_company";
import Bo_v2_sale_customer_campaign_history, {
    addBoV2SaleCustomerCampaignHistoryMd,
    getDetailBoV2SaleCustomerCampaignHistoryMd
} from "@model/bo_v2_sale_customer_campaign_history";
import {getDetailBoV2CampaignMd} from "@model/bo_v2_campaign";
import {sequelize} from "@config/main";
import {getDetailBOCategoryMd} from "@model/b_o_categories";
import {getDetailBoV2SourceMd} from "@model/bo_v2_source";
import {
    getDetailBoV2PermissionGroupMemberMd,
    getListBoV2PermissionGroupMemberMd
} from "@model/bo_v2_permission_group_member";
import bcrypt from "bcrypt";
import {getPermission} from "@controller/permissionController";
import {getListPermission, getPermissionObjStaffByUser} from "@repository/permissionRepo";
import {getDetailBoV2GroupCustomerMd} from "@model/bo_v2_group_customer";
import {getDetailCityMd} from "@model/city";
import {getDetailDistrictsMd} from "@model/districts";
import {getDetailWardMd} from "@model/ward";
import allotmentCustomerQueen from "@cron/allotmentCustomerCron";
import {countBoV2SaleViolationMd} from "@model/bo_v2_sale_violation";
import {getDetailBoV2LogCampaignMd, getDetailBoV2UserInfoMd, getListBoV2UserInfoMd} from "@model";
import {getListGroupMember} from "@controller/groupMemberController";
import {addBoV2WorkGroupMd} from "@model/bo_v2_work_group";
import {getListBoV2PermissionGroupPermissionMd} from "@model/bo_v2_permission_group_permission";
import {addBoV2CartHistoryMd} from "@model/bo_v2_cart_history";

/**
 * @param p
 * @param c {Controller}
 */
export const getListCustomer = async ({
                                          create_type,
                                          limit,
                                          page,
                                          from,
                                          to,
                                          interactive_status,
                                          source_id,
                                          group_customer_id,
                                          key_search,
                                          category_id,
                                          user_id_sale,
                                          exchange_id,
                                          status_allocation,
                                          care_time_start,
                                          care_time_end,
                                          group_sale_id,
                                          campaign_id
                                      }, c) => {
    c.runValid({
        limit,
        page,
        D0_from: from,
        D0_to: to,
        N0_care_time_start: care_time_start,
        N0_care_time_end: care_time_end
    })
    if (c.v()) return

    const query = new ModelQuery(`bo_v2_customer a left
         join bo_v2_group_member b on a.user_id_sale = b.user_id`);
    query.attr = ["a.*", 'datediff(now() ,  final_time_care ) date_final', "b.exchange_id", " b.group_sale_id"]
    query.condition_2 = 'a.deleted_at  is null';
    query.condition_16 = `b.deleted_at is null`
    if (c.p.master === true) {
    } else {
        const map = await getPermissionObjStaffByUser(c.user_id)
        console.log(map)
        query.condition_3 = `(a.user_id_sale= ${c.user_id} or a.create_by = ${c.user_id} ${map.exchange.length ? `or  exchange_id in (${map.exchange})` : ''}   ${map.group.length ? `or  group_sale_id in (${map.group})` : ''}  ${map.campaign.length ? `or  campaign_id  in (${map.campaign})` : ''}) `
    }
    if (from && to)
        query.condition_4 = `a.created_at between '${from}' and '${to}'`
    if (interactive_status)
        query.condition_5 = `a.interactive_status in (${JSON.parse(interactive_status)})`
    if (source_id)
        query.condition_6 = `a.source_id in (${JSON.parse(source_id)})`
    if (category_id)
        query.condition_7 = `a.category_id in (${JSON.parse(category_id)})`
    if (group_customer_id)
        query.condition_8 = `group_customer_id in (${JSON.parse(group_customer_id)})`
    if (create_type)
        query.condition_9 = `create_type = ${create_type}`
    if (status_allocation)
        query.condition_10 = `status_allocation = ${status_allocation}`;

    if (user_id_sale) {
        query.condition_13 = `user_id_sale in (${JSON.parse(user_id_sale)})`
    }
    if (exchange_id) {
        query.condition_14 = `exchange_id in (${JSON.parse(exchange_id)})`
    }
    if (group_sale_id) {
        query.condition_15 = `group_sale_id in (${JSON.parse(group_sale_id)})`
    }
    if (campaign_id) {
        query.condition_16 = `campaign_id in (${JSON.parse(campaign_id)})`
    }
    if (key_search) {
        query.condition_12 = `(phone like  '%${key_search}%' or email like '%${key_search}%'  or full_name like '%${key_search}%' ) `
    }
    if (care_time_start && care_time_end) {
        query.having = `(date_final >=${care_time_start} and date_final <= ${care_time_end} ) `
    }
    query.limit = limit
    query.page = page

    query.group = ["id"]
    /**
     * @type Bo_v2_customer[]
     */
    const list = await query.exe()
    for (const boV2Customer of list) {
        if (boV2Customer.campaign_id) {
            const round = await getDetailBoV2LogCampaignMd({
                customer_id: boV2Customer.id,
                campaign_id: boV2Customer.campaign_id
            }, false, false, [["created_at", "desc"]])
            boV2Customer.round = round?.round_number
        }

        const campaign = await getDetailBoV2CampaignMd({
            id: boV2Customer.campaign_id
        })
        boV2Customer.campaign_name = campaign?.name || null
    }


    for (let i = 0; i < list.length; i++) {
        if (c.user_id !== list[i].user_id_sale) {
            if (list[i].phone) {
                list[i].phone = "xxxx" + list[i].phone.slice(list[i].phone.length - 6, list[i].phone.length)
            }
            if (list[i].email) {
                list[i].email = list[i].email.slice(0, 1) + "xxx" + "@gmail.com"
            }
        }
    }
    c.data = list
    c.mess = c.MESS.getData
}

/**
 * @param p
 * @param c {Controller}
 */
export const getListCustomerV2 = async ({
                                            create_type,
                                            limit,
                                            page,
                                            from,
                                            to,
                                            interactive_status,
                                            source_id,
                                            group_customer_id,
                                            key_search,
                                            category_id,
                                            user_id_sale,
                                            exchange_id,
                                            status_allocation,
                                        }, c) => {
    c.runValid({
        limit,
        page,
        D0_from: from,
        D0_to: to,
        N0_interactive_status: interactive_status,
        N0_source_id: source_id,
        N0_group_customer_id: group_customer_id
    })
    if (c.v()) return
    let where = {user_id_sale: c.user_id}
    if (from && to)
        where.create_date = {[Op.between]: [from, to]}
    if (interactive_status)
        where.interactive_status = interactive_status
    if (source_id)
        where.source_id = source_id
    if (category_id) {
        category_id = JSON.parse(category_id)
        where.category_id = {[Op.in]: category_id}
    }
    if (user_id_sale)
        where.user_id_sale = user_id_sale
    if (group_customer_id)
        where.group_customer_id = group_customer_id
    if (create_type && Number(create_type) === 1) {
        where.create_type = create_type
        where.status_allocation = 2
    } else {
        where[Op.or] = [{status_allocation: {[Op.ne]: 2}}, {create_type: 2}]

    }

    if (exchange_id) {
        const listUser = await sequelize.query(`select user_id
                                                from bo_v2_group_member
                                                         join bo_v2_group_sale
                                                              on bo_v2_group_sale.id = bo_v2_group_member.group_sale_id
                                                where exchange_id = ${exchange_id}`)
        let listUserIdSale = []
        for (let i = 0; i < listUser[0].length; i++) {
            listUserIdSale.push(listUser[0][i].user_id)
        }
        where.user_id_sale = {[Op.in]: listUserIdSale}
    }
    if (key_search) {
        where[Op.or] = [
            {phone: {[Op.like]: `%${key_search}%`}},
            {email: {[Op.like]: `%${key_search}%`}},
            {full_name: {[Op.like]: `%${key_search}%`}}
        ]
    }
    const list = await getListBoV2CustomerMd(where, false, limit, page, [["updated_at", "desc"]])
    console.log("------------------------------------------")
    for (const boV2Customer of list) {
        if (boV2Customer.user_id_sale) {
            const group_member = await getDetailBoV2GroupMemberMd({user_id: boV2Customer.user_id_sale})
            if (group_member === null) {
                boV2Customer.exchange_name = "";
                continue
            }
            const group_sale = await getDetailBoV2GroupSaleMd({id: group_member.group_sale_id})
            if (group_sale && group_sale.exchange_id) {
                const exchange = await getDetailBoV2ExchangeMd({id: group_sale.exchange_id})
                boV2Customer.exchange_name = exchange?.name || ""
            } else if (group_sale && group_sale.company_id) {
                const company = await getDetailBoV2CompanyMd({id: group_sale.exchange_id})
                boV2Customer.exchange_name = company?.name || ""
            }
        } else {
            boV2Customer.exchange_name = "";
        }

        const history_phan_bo = await getDetailBoV2SaleCustomerCampaignHistoryMd({
            action: "phan_bo",
            customer_id: boV2Customer.id
        }, false, false [['created_at', "desc"]])
        const history = await getDetailBoV2SaleCustomerCampaignHistoryMd({
            action: "cham_soc",
            customer_id: boV2Customer.id
        }, false, false [['created_at', "desc"]])
        boV2Customer.final_date = history?.created_at || null
        boV2Customer.allocation_date = history_phan_bo?.created_at || null


        const campaign = await getDetailBoV2CampaignMd({
            source_id: boV2Customer.source_id,
            category_id: boV2Customer.category_id
        })

        if (campaign) {
            boV2Customer.campaign_name = campaign.name
            boV2Customer.rule_time = campaign.rule_time
        }
    }


    c.data = list
    c.mess = c.MESS.getData
};
/**
 * @param p
 * @param c {Controller}
 */
export const getCountCustomer = async ({
                                           create_type,
                                           limit,
                                           page,
                                           from,
                                           to,
                                           interactive_status,
                                           source_id,
                                           group_customer_id,
                                           key_search,
                                           category_id,
                                           user_id_sale,
                                           exchange_id,
                                           status_allocation,
                                           care_time_start,
                                           care_time_end, group_sale_id,
                                           campaign_id
                                       }, c) => {
    c.runValid({
        D0_from: from,
        D0_to: to,
    })
    if (c.v()) return
    const query = new ModelQuery(`bo_v2_customer a left
         join bo_v2_group_member b on a.user_id_sale = b.user_id`);
    query.attr = ["a.*", 'datediff(now() ,  final_time_care ) date_final', "b.exchange_id", " b.group_sale_id"]
    query.condition_2 = 'a.deleted_at  is null';
    query.condition_16 = `b.deleted_at is null`
    if (c.p.master === true) {
    } else {
        const group_permission_member = await getListBoV2PermissionGroupMemberMd({
            user_id: c.user_id,
            status: 1,
            staff_object_id: {[Op.in]: ["giamdocsan", "truongphong", "truongnhom", "quanlychiendich"]}
        });
        const map = mapPermission(group_permission_member)
        query.condition_3 = `(a.user_id_sale= ${c.user_id} or a.create_by = ${c.user_id} ${map.exchange.length ? `or  exchange_id in (${map.exchange})` : ''}   ${map.group.length ? `or  group_sale_id in (${map.group})` : ''}  ${map.campaign.length ? `or  campaign_id  in (${map.campaign})` : ''}) `
    }
    if (from && to)
        query.condition_4 = `a.created_at between '${from}' and '${to}'`
    if (interactive_status)
        query.condition_5 = `a.interactive_status in (${JSON.parse(interactive_status)})`
    if (source_id)
        query.condition_6 = `a.source_id in (${JSON.parse(source_id)})`
    if (category_id)
        query.condition_7 = `a.category_id in (${JSON.parse(category_id)})`
    if (group_customer_id)
        query.condition_8 = `group_customer_id in (${JSON.parse(group_customer_id)})`
    if (create_type)
        query.condition_9 = `create_type = ${create_type}`
    if (status_allocation)
        query.condition_10 = `status_allocation = ${status_allocation}`;

    if (user_id_sale) {
        query.condition_13 = `user_id_sale in (${JSON.parse(user_id_sale)})`
    }
    if (exchange_id) {
        query.condition_14 = `exchange_id in (${JSON.parse(exchange_id)})`
    }
    if (group_sale_id) {
        query.condition_15 = `group_sale_id in (${JSON.parse(group_sale_id)})`
    }
    if (campaign_id) {
        query.condition_15 = `campaign_id in (${JSON.parse(campaign_id)})`
    }
    if (key_search) {
        query.condition_12 = `(phone like  '%${key_search}%' or email like '%${key_search}%'  or full_name like '%${key_search}%' ) `
    }
    if (care_time_start && care_time_end) {
        query.having = `(date_final >=${care_time_start} and date_final <= ${care_time_end} ) `
    }
    query.group = ["id"]

    const count = await sequelize.query(`select count(*) count
                                         from (${query.genQuery()}) as tb2`, {
        plain: true,
        type: QueryTypes.SELECT
    })
    c.data = count?.count || 0
    c.mess = c.MESS.getData
}
export const getCountCustomerV2 = async ({
                                             create_type,
                                             from,
                                             to,
                                             interactive_status,
                                             source_id,
                                             category_id,
                                             group_customer_id,
                                             key_search,
                                             user_id_sale,
                                             exchange_id
                                         }, c) => {
    c.runValid({
        D0_from: from,
        D0_to: to,
        N0_interactive_status: interactive_status,
        N0_source_id: source_id,
        N0_group_customer_id: group_customer_id
    })
    if (c.v()) return
    let where = {user_id_sale: c.user_id}
    if (from && to)
        where.create_date = {[Op.between]: [from, to]}
    if (interactive_status)
        where.interactive_status = interactive_status
    if (source_id)
        where.source_id = source_id
    if (category_id) {
        category_id = JSON.parse(category_id)
        where.category_id = {[Op.in]: category_id}
    }
    if (user_id_sale)
        where.user_id_sale = user_id_sale
    if (group_customer_id)
        where.group_customer_id = group_customer_id
    if (create_type && Number(create_type) === 1) {
        where.create_type = create_type
        where.status_allocation = 2
    } else {
        where[Op.or] = [{status_allocation: {[Op.ne]: 2}}, {create_type: 2}]

    }

    if (exchange_id) {
        const listUser = await sequelize.query(`select user_id
                                                from bo_v2_group_member
                                                         join bo_v2_group_sale
                                                              on bo_v2_group_sale.id = bo_v2_group_member.group_sale_id
                                                where exchange_id = ${exchange_id}`)
        let listUserIdSale = []
        for (let i = 0; i < listUser[0].length; i++) {
            listUserIdSale.push(listUser[0][i].user_id)
        }
        where.user_id_sale = {[Op.in]: listUserIdSale}
    }
    if (key_search) {
        where[Op.or] = [
            {phone: {[Op.like]: `%${key_search}%`}},
            {email: {[Op.like]: `%${key_search}%`}},
            {full_name: {[Op.like]: `%${key_search}%`}}
        ]
    }
    c.data = await countBoV2CustomerMd(where)
    c.mess = c.MESS.getData
}


/**
 * @param p {{
 *        city_id,
 *        district_id,
 *        ward_id,
 *        cb_city_id,
 *        cb_district_id,
 *        cb_ward_id,
 *        country,
 *        code_area,
 *        birthday,
 *        sex,
 *        cmt_full_name,
 *        full_name,
 *        phone,
 *        email,
 *        address,
 *        cb_address,
 *        files ,
 *        note    ,
 *        source_id ,
 *        cmt_date,cmt_number, category_id,
 *        cmt_address        ,interactive_form    ,interactive_status  ,group_customer_id
 * }}
 * @param c {Controller}
 */
export const addCustomer = async (p, c) => {
    const valid = {
        N0_city_id: p.city_id,
        N0_district_id: p.district_id,
        N0_ward_id: p.ward_id,
        N0_cb_city_id: p.cb_city_id,
        N0_cb_district_id: p.cb_district_id,
        N0_cb_ward_id: p.cb_ward_id,
        N0_sex: p.sex,
        N_source_id: p.source_id,
        D0_cmt_date: p.cmt_date,
    }
    if (c.p.master && p.category_id) {
        valid.N_category_id = p.category_id
        valid.N_group_customer_id = p.group_customer_id
    }
    if (p.country !== "nuoc_ngoai") valid.phone = p.phone
    if (p.country === "nuoc_ngoai") valid.S_phone = p.phone
    c.runValid(valid)
    c.runValidAlNull({birthday: p.birthday, email: p.email})

    if (c.v()) return
    let images = {}
    if (p.files.cmt_img_before) {
        images.cmt_img_before = await updateFiles(p.files.cmt_img_before[0])
    }
    if (p.files.cmt_img_after) {
        images.cmt_img_after = await updateFiles(p.files.cmt_img_after[0])
    }
    const customerCheck = await getDetailBoV2CustomerMd({
        phone: p.phone,
        user_id_sale: c.user_id
    })
    if (customerCheck) {
        c.status = false
        c.mess = "Số điện thoại khách hàng trùng với số điện thoại trong danh sách khách  hàng của bạn"
        return
    }

    const param = {
        city_id: p.city_id,
        district_id: p.district_id,
        ward_id: p.ward_id,
        cb_city_id: p.cb_city_id,
        cb_district_id: p.cb_district_id,
        cb_ward_id: p.cb_ward_id,
        country: p.country,
        code_area: p.code_area,
        birthday: p.birthday,
        sex: p.sex,
        cmt_full_name: p.cmt_full_name,
        full_name: p.full_name,
        phone: p.phone,
        email: p.email,
        address: p.address,
        cb_address: p.cb_address,
        images: JSON.stringify(images),
        user_id_sale: c.p.master ? 0 : c.user_id,
        create_by: c.user_id,
        create_type: c.p.master ? 1 : 2,
        status_allocation: c.p.master ? 1 : 3,
        interactive_status: p.interactive_status || 1,
        interactive_form: p.interactive_form,
        note: p.note,
        source_id: p.source_id,
        cmt_number: p.cmt_number,
        cmt_date: p.cmt_date,
        cmt_address: p.cmt_address,
        group_customer_id: p.group_customer_id,
        category_id: p.category_id
    }

    c.data = await addBoV2CustomerMd(param)
    if (c.p.master) {
        const campaign = await getDetailBoV2CampaignMd({
            category_id: p.category_id,
            source_id: p.source_id,
            status: 1
        })
        if (campaign) await allotmentCustomerQueen.push({id: campaign.id})
    }
    c.mess = c.MESS.addData

}

/**
 * @param p {{
 *          city_id,
 *        district_id,
 *        ward_id,
 *        cb_city_id,
 *        cb_district_id,
 *        cb_ward_id,
 *        country,
 *        code_area,
 *        birthday,
 *        sex,
 *        cmt_full_name,
 *        full_name,
 *        phone,
 *        email,
 *        address,
 *        cb_address,
 *        source_id,
 *        group_customer_id,
 *        files : any},
 *        id      ,
 *        cmt_date,
 *        cmt_address    ,
 *         images      ,
 *   category_id    ,note,
 *        id,
 *        cmt_number
 * }}
 * @param c {Controller}
 */
export const updateCustomer = async (p, c) => {
    c.runValid({
        N0_district_id: p.district_id,
        N0_ward_id: p.ward_id,
        N0_cb_city_id: p.cb_city_id,
        N0_cb_district_id: p.cb_district_id,
        N0_cb_ward_id: p.cb_ward_id,
        N0_sex: p.sex,
        N0_source_id: p.source_id,
        N0_group_customer_id: p.group_customer_id,
        N0_city_id: p.city_id,
        D0_cmt_date: p.cmt_date
    })
    c.runValidAlNull({birthday: p.birthday, email: p.email, cmt_number: p.cmt_number})
    if (c.v()) return
    const where = {id: p.id}
    const customerDetail = await getDetailBoV2CustomerMd(where)
    if (customerDetail.create_type === 1) {
        if (customerDetail.status_allocation === 2) {
            c.status = false
            c.mess = "Bạn không thể cập nhập khách hàng trong thời gian phân bổ"
            return
        }
        if (customerDetail.status_allocation === 1 && (c.p.master === false || customerDetail.create_by !== c.user_id)) {
            c.status = false
            c.mess = "Bạn không có quyền cập nhập khách hàng"
            return
        }
        if (customerDetail.status_allocation === 3 && customerDetail.user_id_sale !== c.user_id) {
            c.status = false
            c.mess = "Bạn không có quyền cập nhập khách hàng"
            return
        }
    }
    if (customerDetail.create_type === 2 && customerDetail.user_id_sale !== c.user_id) {
        c.status = false
        c.mess = "Bạn không có quyền cập nhập khách hàng"
        return
    }
    if (!customerDetail) {
        c.status = false
        c.mess = "Không tìm thấy khách hàng"
        return
    }

    if (customerDetail.create_type === 1 && p.source_id && c.p.master === false) {
        c.mess = "Không thể cập nhập nguồn";
        c.status = false
        return
    }
    if (p.country === "nuoc_ngoai") {
    } else if (customerDetail.country === "nuoc_ngoai" && p.country === undefined) {
    } else {
        c.runValidAlNull({phone: p.phone})
        if (c.v()) return
    }
    let images = p.images ? JSON.parse(p.images) : JSON.parse(customerDetail.images)
    if (p.files.cmt_img_before) {
        images.cmt_img_before = await updateFiles(p.files.cmt_img_before[0])
    }
    if (p.files.cmt_img_after) {
        images.cmt_img_after = await updateFiles(p.files.cmt_img_after[0])
    }


    if (p.phone) {
        const customerCheck = await getDetailBoV2CustomerMd({
            phone: p.phone,
            user_id_sale: c.user_id,
            id: {[Op.ne]: p.id}
        })
        if (customerCheck) {
            c.status = false
            c.mess = "Số điện thoại khách hàng trùng với số điện thoại trong danh sách khách  hàng của bạn"
            return
        }

    }
    c.data = await updateBoV2CustomerMd({
        city_id: p.city_id,
        district_id: p.district_id,
        ward_id: p.ward_id,
        cb_city_id: p.cb_city_id,
        cb_district_id: p.cb_district_id,
        cb_ward_id: p.cb_ward_id,
        country: p.country,
        code_area: p.code_area,
        birthday: p.birthday,
        sex: p.sex,
        cmt_full_name: p.cmt_full_name,
        full_name: p.full_name,
        phone: p.phone,
        email: p.email,
        address: p.address,
        cb_address: p.cb_address,
        images: images && JSON.stringify(images),
        cmt_date: p.cmt_date,
        cmt_address: p.cmt_address,
        cmt_number: p.cmt_number,
        group_customer_id: p.group_customer_id,
        category_id: p.category_id,
        note: p.note,
        source_id: p.source_id
    }, {id: p.id})
    c.mess = c.MESS.update
}
/**
 * @param p
 * @param c {Controller}
 */
export const getDetailCustomer = async ({id}, c) => {
    c.runValid({id})
    if (c.v()) return
    const data = await getDetailBoV2CustomerMd({id})
    if (data) {
        if (data.category_id) {
            const category = await getDetailBOCategoryMd({id: data.category_id})
            if (category) {
                data.category_name = category.cb_title
            }
        }
        const campaign = await getDetailBoV2CampaignMd({
            source_id: data.source_id,
            category_id: data.category_id
        })
        if (campaign) {
            data.rule_time = campaign.rule_time
            data.campagin_name = campaign.name
        }
        if (data.source_id) {

            const source = await getDetailBoV2SourceMd({id: data.source_id})
            if (source) {
                data.source_name = source.name
            }
        } else {
            data.source_name = ""

        }

    }
    if (c.p.master || c.p.giamdocsan) {
        if (data.phone) {
            data.phone = "xxxx" + data.phone.slice(4, 10)
        }
        if (data.email) {
            data.email = data.email.slice(0, 1) + "xxx@gmail.com"
        }
    }
    c.data = data
    c.mess = c.MESS.getData
}


/**
 * @param p
 * @param c {Controller}
 */
export const importCustomer = async ({file}, c) => {
    if (file) {
        c.valid({v: file.mimetype, n: "file", f: REGEX.F_EXCEL})
        if (c.v()) return;
        const attr = [
            "stt", "phone", "full_name"
            , "source_id", "group_customer_id", "category_id"
            , "cmt_full_name", "country", "gender"
            , "email", "birthday", "cmt_number",
            "cmt_date", "cmt_province", "cb_city_id",
            "cb_district_id", "cb_ward_id", "cb_address",
            "city_id", "district_id", "ward_id"
            , "address", "interactive_status", "interactive_form",
            "note",
        ]
        let data = readExel2(file.buffer, attr)
        data = data.filter((value) => value.stt !== undefined)
        await aLog1Rp("test2", data)
        const campaign = []
        for (let datum of data) {
            const da = await importCustomerRp(datum, c.user_id)
            if (da && da.campaign && campaign.find(value => value && value.id === da.campaign.id) === undefined) {
                campaign.push(da.campaign)
            }
        }
        for (let campaignElement of campaign) {
            await allotmentCustomerQueen.push({id: campaignElement.id})
        }
        allotmentCustomerQueen.runCronJob()
        data.forEach(value => {
            if (value.status === true) value["Kết quả"] = "thành công"
            else {
                value["Kết quả"] = "Thất bại"
                value["Nguyên Nhân"] = value.mess
            }
            delete value.status
            delete value.mess
        })
        console.log(data)
        attr.push("Kết quả", "Nguyên Nhân")
        c.data = data
        c.type_return = "FILE_EXEL"
        c.rest = {headers: attr, filename: "customer" + getDateName()}
        return
    }
    c.mess = "Bạn gửi thiếu file"
    c.status = false

}

/**
 * @param p
 * @param c {Controller}
 */
export const deleteCustomer = async ({id}, c) => {
    const checkCustomer = await getDetailBoV2CustomerMd({id})
    if (!checkCustomer) {
        c.status = false
        c.mess = "Nguoi dung khong ton tai"
        return
    }
    const deleteCustomer = await deleteBoV2CustomerMd({id})
    c.mess = c.MESS.delete
}

/**
 * @param p
 * @param c {Controller}
 */
export const expListCustomer = async ({
                                          create_type,
                                          limit,
                                          page,
                                          from,
                                          to,
                                          interactive_status,
                                          source_id,
                                          group_customer_id,
                                          key_search,
                                          category_id,
                                          user_id_sale,
                                          exchange_id,
                                          status_allocation,
                                          care_time_start,
                                          care_time_end, group_sale_id
                                      }, c) => {
    c.runValid({
        D0_from: from,
        D0_to: to,
        N0_interactive_status: interactive_status,
        N0_source_id: source_id,
        N0_group_customer_id: group_customer_id,
        N0_category_id: category_id,
        N0_user_id_sale: user_id_sale,
        N0_exchange_id: exchange_id,
        N0_status_allocation: status_allocation,
        N0_care_time_start: care_time_start,
        N0_care_time_end: care_time_end
    })


    if (c.v()) return

    const query = new ModelQuery(`bo_v2_customer a  left join
     (select customer_id, MAX(created_at) max_date
            from bo_v2_sale_customer_campaign_history  where action = "cham_soc"   group by  customer_id ) as tb  on  a.id =  tb.customer_id
          `);
    query.attr = ["a.*", 'datediff(now(), max_date ) date_final']
    query.condition_2 = 'a.deleted_at  is null';

    if (c.p.master === true) {
    } else if (c.p.giamdocsan) {
        const permissionMembers = await getListPermission(c.user_id, "giamdocsan", 0)
        exchange_id = permissionMembers.map(value => value.exchange_id)
    } else {
        query.condition_3 = `a.user_id_sale= ${c.user_id}`
    }
    if (Array.isArray(exchange_id) && exchange_id.length === 0) {
        c.data = []
        c.mess = c.MESS.getData
        return
    }
    if (from && to)
        query.condition_4 = `a.created_at between '${from}' and '${to}'`
    if (interactive_status)
        query.condition_5 = `a.interactive_status in (${JSON.parse(interactive_status)})`
    if (source_id)
        query.condition_6 = `a.source_id in (${JSON.parse(source_id)})`
    if (category_id)
        query.condition_7 = `a.category_id in (${JSON.parse(category_id)})`
    if (group_customer_id)
        query.condition_8 = `group_customer_id in (${JSON.parse(group_customer_id)})`
    if (create_type)
        query.condition_9 = `create_type = ${create_type}`
    if (status_allocation)
        query.condition_10 = status_allocation == 1 ? `status_allocation = ${status_allocation}` : `(status_allocation in ( 2, 3 ) and create_type =1 )`

    if (user_id_sale) {
        query.condition_13 = `user_id_sale in (${JSON.parse(user_id_sale)})`
    }
    if (exchange_id || group_sale_id) {
        const w = {}
        if (exchange_id) {
            w.exchange_id = {[Op.in]: Array.isArray(exchange_id) ? exchange_id : JSON.parse(exchange_id)}
        }
        if (group_sale_id) {
            w.group_sale_id = {[Op.in]: JSON.parse(group_sale_id)}
        }
        const listUser = await getListBoV2GroupMemberMd(w)
        let listUserIdSale = listUser.map(value => value.user_id)
        if (listUserIdSale.length === 0) {
            c.data = []
            c.mess = c.MESS.getData
            return
        }
        query.condition_11 = `user_id_sale in  (${listUserIdSale})`
    }


    if (key_search) {
        query.condition_12 = `(phone like  '%${key_search}%' or email like '%${key_search}%'  or full_name like '%${key_search}%' ) `
    }
    if (care_time_start && care_time_end) {
        query.having = `(date_final >=${care_time_start} and date_final <= ${care_time_end} ) `
    }

    /**
     * @type Bo_v2_customer[]
     */
    const list = await query.exe()
    for (const boV2Customer of list) {
        if (boV2Customer.user_id_sale) {
            const group_member = await getDetailBoV2GroupMemberMd({user_id: boV2Customer.user_id_sale})
            if (group_member === null) {
                boV2Customer.exchange_name = ""
                continue
            }
            const group_sale = await getDetailBoV2GroupSaleMd({id: group_member.group_sale_id})
            if (group_sale && group_sale.exchange_id) {
                const exchange = await getDetailBoV2ExchangeMd({id: group_sale.exchange_id})
                boV2Customer.exchange_name = exchange?.name || ""
            } else if (group_sale && group_sale.company_id) {
                const company = await getDetailBoV2CompanyMd({id: group_sale.exchange_id})
                boV2Customer.exchange_name = company?.name || ""
            }
        } else {
            boV2Customer.exchange_name = ""
        }
        const campaign = await getDetailBoV2CampaignMd({
            source_id: boV2Customer.source_id,
            category_id: boV2Customer.category_id
        })
        boV2Customer.campaign_name = campaign?.name || null
    }
    if (c.p.giamdocsan) {
        for (let i = 0; i < list.length; i++) {
            if (list[i].phone) {
                list[i].phone = list[i].phone.slice(0, 7) + "xxx"
            }
            if (list[i].email) {
                list[i].email = list[i].email.slice(0, 1) + "xxx" + "@gmail.com"
            }
        }
    }

    let i = 1


    const attr = ["stt", "Số điện thoại", "họ và tên", "Nguồn khách hàng",
        "Mã Nhóm khách hàng", "Mã dự án quan tâm", /* new */ "Loại khách hàng", "Chiến dịch", "sale", "Nhóm sale", "Phòng ban",
        "Họ và tên (cmt)", "quốc tịnh", "giới tính", "email",
        "ngày sinh", "số cmt/hộ chiếu", "ngày cấp", "nơi cấp",
        "Mã tỉnh thành phố thường chú", "Mã Quận huyện thường chú"
        , "Mã phường xã thường chú", "Địa chỉ thường chú cụ thể",
        "Mã tỉnh thành phố Liên hệ", "Mã quận huyện liên hệ",
        "Mã phường xã liên hệ", "địa chỉ liên hệ cụ thể",/* new */  "Lần cuối CS"
        , "tình trạng khách hàng", "ghi chú"]
    const list2 = []
    for (let boV2Customer of list) {
        const item = {}
        item[attr[0]] = i
        item[attr[1]] = boV2Customer.phone
        item[attr[2]] = boV2Customer.full_name
        if (boV2Customer.source_id) {
            const source = await getDetailBoV2SourceMd({id: boV2Customer.source_id})
            item[attr[3]] = source?.name
        }
        if (boV2Customer.group_customer_id) {
            const groupCustomer = await getDetailBoV2GroupCustomerMd({id: boV2Customer.group_customer_id})
            item[attr[4]] = groupCustomer.name
        }
        if (boV2Customer.category_id) {
            const category = await getDetailBOCategoryMd({id: boV2Customer.category_id})
            item[attr[5]] = category ? category.cb_title : ""
        }
        item[attr[6]] = boV2Customer.create_type === 1 ? "Khách hàng công ty khai thác" : "khách hàng cá nhân thêm"

        if (boV2Customer.create_type === 1 && boV2Customer.source_id && boV2Customer.category_id) {
            const campaign = await getDetailBoV2CampaignMd({
                category_id: boV2Customer.category_id,
                source_id: boV2Customer.source_id
            })
            item[attr[7]] = campaign?.name

        }
        if (boV2Customer.user_id_sale) {
            const userInfo = await getDetailBoV2UserInfoMd({user_id: boV2Customer.user_id_sale})
            item[attr[8]] = userInfo?.full_name
        }
        if (boV2Customer.user_id_sale) {
            const userGroupMember = await getDetailBoV2GroupMemberMd({user_id: boV2Customer.user_id_sale})
            if (userGroupMember !== null) {
                const groupSale = await getDetailBoV2GroupSaleMd({id: userGroupMember.group_sale_id})
                item[attr[9]] = groupSale.name
                const exchange = await getDetailBoV2ExchangeMd({id: userGroupMember.exchange_id})
                item[attr[10]] = exchange.name
            }
        }


        item[attr[11]] = boV2Customer.cmt_full_name

        item[attr[12]] = boV2Customer.country

        item[attr[13]] = boV2Customer.sex === 1 ? "nam" : (boV2Customer.sex === 2 ? "nữ" : "");
        item[attr[14]] = boV2Customer.email
        item[attr[15]] = boV2Customer.birthday
        item[attr[16]] = boV2Customer.cmt_number
        item[attr[17]] = boV2Customer.cmt_date
        item[attr[18]] = boV2Customer.cmt_address
        item[attr[19]] = boV2Customer.city_id
        if (boV2Customer.city_id) {
            const city = await getDetailCityMd({id: boV2Customer.city_id})
            if (city)
                item[attr[20]] = city.name
        }
        if (boV2Customer.district_id) {
            const city = await getDetailDistrictsMd({id: boV2Customer.district_id})
            if (city)
                item[attr[21]] = city.name
        }
        if (boV2Customer.ward_id) {
            const city = await getDetailWardMd({id: boV2Customer.ward_id})
            if (city)
                item[attr[22]] = city.name
        }
        item[attr[23]] = boV2Customer.address

        if (boV2Customer.cb_city_id) {
            const city = await getDetailCityMd({id: boV2Customer.cb_city_id})
            if (city)
                item[attr[24]] = city.name
        }
        if (boV2Customer.cb_district_id) {
            const cyti = await getDetailDistrictsMd({id: boV2Customer.cb_district_id})
            if (cyti)
                item[attr[25]] = cyti.name
        }
        if (boV2Customer.cb_ward_id) {
            const cyti = await getDetailWardMd({id: boV2Customer.cb_ward_id})
            if (cyti)
                item[attr[26]] = cyti.name
        }

        item[attr[27]] = boV2Customer.final_date
        item[attr[28]] = boV2Customer.interactive_status ? mapCustomer(Number(boV2Customer.interactive_status)) : "";
        item[attr[29]] = boV2Customer.note
        i += 1
        list2.push(item)
    }
    c.type_return = "FILE_EXEL"
    c.rest.filename = "customerExport.xlsx"
    c.rest.headers = attr
    c.data = list2
}
/**
 *
 * @param file
 * @param con {Controller}
 */
export const importCustomerByFile = async ({file}, con) => {
    let data = readExel2(file.buffer, ["stt", "customer_code",
        "full_name", "phone", "email", "note", "group_customer_id", "source_id", "category_id", "birthday",
        "sex", "address", "district_id", "city_id", "country", "create_type", "created_at", "create_by",
        "user_id_sale", "interactive_status", "final_time_care"
    ])
    data = data.filter((value) => value.stt)
    console.log(data.length)
    for (let datum of data) {
        console.log(datum)
        await importCustomerV2Rp(datum)
    }
}

/**
 * @param p
 * @param c {Controller}
 */
export const getDetailCustomerStatus = async ({from, to, create_type, group_sale_id, user_id_sale, exchange_id}, c) => {
    c.runValid({
        D_from: from,
        D_to: to
    })
    if (c.v()) return
    const permission = await getPermissionObjStaffByUser(c.user_id, false, [STAFF.truongnhom, STAFF.truongphong, STAFF.giamDoSsan])
    const or = []
    if (permission.exchange.length > 0) {
        or.push({exchange_id: {[Op.in]: permission.exchange}})
    }
    if (permission.group.length > 0) {
        or.push({group_sale_id: {[Op.in]: permission.group}})
    }
    let where = seqOr(or)

    let query = ""
    if (exchange_id) {
        query += ` and b.exchange_id = ${exchange_id}`
    }
    if (group_sale_id) {
        query += ` and b.group_sale_id = ${group_sale_id}`
    }
    if (user_id_sale) {
        query += ` and b.user_id = ${user_id_sale}`
    }
    if (create_type) {
        query += ` and a.create_type = ${create_type}`
    }
    if (or.length === 0) {
        where = {user_id: c.user_id}
    }
    const groupMember = await getListBoV2GroupMemberMd(where)
    let listSaleId = groupMember.map(value => value.user_id)
    listSaleId = [...new Set(listSaleId)]
    const data = await sequelize.query(`SELECT a.interactive_status as status, COUNT(*) AS count
                                        FROM bo_v2_customer as a,
                                             bo_v2_group_member as b
                                        WHERE a.user_id_sale in (${listSaleId})
                                          and a.user_id_sale=b.user_id
                                          and a.deleted_at is null
                                          and b.deleted_at is null
                                          and a.created_at between '${from}'
                                          and '${to}' ${query}
                                          and a.interactive_status BETWEEN 1
                                          AND 7
                                        GROUP BY a.interactive_status
                                        `)
    c.data = data[0]
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const countCustomersAllocatedByMonth = async ({exchange_id, group_sale_id, month, year, user_id_sale}, c) => {
    c.runValid({
        N_month: month,
        N_year: year
    })
    if (c.v()) return
    const permission = await getPermissionObjStaffByUser(c.user_id, false, [STAFF.truongnhom, STAFF.truongphong, STAFF.giamDoSsan])
    console.log(permission)
    const or = []
    if (permission.exchange.length > 0) {
        or.push({exchange_id: {[Op.in]: permission.exchange}})
    }
    if (permission.group.length > 0) {
        or.push({group_sale_id: {[Op.in]: permission.group}})
    }
    let where = seqOr(or)

    if (exchange_id) {
        where.exchange_id = exchange_id
    }
    if (group_sale_id) {
        where.group_sale_id = group_sale_id
    }
    if (user_id_sale) {
        where.user_id = user_id_sale
    }
    if (or.length === 0) {
        where = {user_id: c.user_id}
    }
    const groupMember = await getListBoV2GroupMemberMd(where)
    let listSaleId = groupMember.map(value => value.user_id)
    listSaleId = [...new Set(listSaleId)]
    const data = await sequelize.query(`SELECT YEAR(created_at)                                                                                  AS year_number,
       MONTH(created_at)                                                                                 AS month_number,
       WEEK(created_at, 3) - WEEK(DATE_ADD(DATE_FORMAT(created_at, '%Y-%m-01'), INTERVAL -3 DAY), 3) + 1 AS week_number,
       COUNT(*)                                                                                          AS count
FROM bo_v2_customer
where bo_v2_customer.user_id_sale IN (${listSaleId})
and MONTH (created_at) = ${month}
and YEAR (created_at) = ${year}
and deleted_at is null
GROUP BY YEAR(created_at), MONTH(created_at), week_number
ORDER BY YEAR(created_at), MONTH(created_at), week_number;`)
    let week = [{week_number: 1, count: 0}, {week_number: 2, count: 0}, {week_number: 3, count: 0}, {
        week_number: 4,
        count: 0
    }, {week_number: 5, count: 0}]
    for (let i = 0; i < week.length; i++) {
        for (let j = 0; j < data[0].length; j++) {
            if (week[i].week_number === data[0][j].week_number) {
                week[i].count = data[0][j].count
            }
        }
    }
    c.data = {data: week, permission: permission}
    c.mess = c.MESS.getData
}

/**
 * @param p
 * @param c {Controller}
 */
export const countAllottedCustomersOfSale = async (p, c) => {
    const allottedCustomers = await countBoV2CustomerMd({status_allocation: 2, user_id_sale: c.user_id})
    const askForExplanation = await countBoV2SaleViolationMd({user_id_sale: c.user_id, status: 1})
    let transactionsAreProcessed = null
    c.data = {allottedCustomers, askForExplanation, transactionsAreProcessed}
    c.mess = c.MESS.getData
}

/**
 * @param p
 * @param c {Controller}
 */
export const countCustomerOverviewOfLead = async ({from, to, user_id_sale, create_type}, c) => {
    if (!c.p.truongnhom) {
        c.status = false
        c.mess = "Ban khong phai truong nhom"
        return
    }
    let listSaleId = []
    const permissionGroupMember = await getListBoV2PermissionGroupMemberMd({
        user_id: c.user_id,
        staff_object_id: "truongnhom"
    })
    let group_sale_id = []
    for (let i = 0; i < permissionGroupMember.length; i++) {
        group_sale_id.push(permissionGroupMember[i].scope_id)
    }
    console.log(group_sale_id)
    const listMember = await getListBoV2GroupMemberMd({group_sale_id: {[Op.in]: group_sale_id}})
    for (let i = 0; i < listMember.length; i++) {
        listSaleId.push(listMember[i].user_id)
    }
    let where = ""
    if (from && to) {
        where += ` and created_at between '${from}' and '${to}'`
    }
    if (user_id_sale) {
        listSaleId = [user_id_sale]
    }
    if (create_type) {
        where += ` and create_type = ${create_type}`
    }
    const listSale = await getListBoV2UserInfoMd({user_id: {[Op.in]: listSaleId}})
    const countCustomersArise = await sequelize.query(`select user_id_sale, count(*) as total
                                                                            from bo_v2_customer
                                                                            where user_id_sale in (${listSaleId})
                                                                            and deleted_at is null ${where}
                                                                            group by user_id_sale`)
    const countPotentialCustomers = await sequelize.query(`select user_id_sale, count(*) as total
                                                                            from bo_v2_customer
                                                                            where user_id_sale in (${listSaleId}) 
                                                                            and deleted_at is null ${where}
                                                                            and interactive_status = 5
                                                                            group by user_id_sale`)
    let data = []
    for (let i = 0; i < listSale.length; i++) {
        data.push({
            user_id: listSale[i].user_id,
        })
    }
    for (let i = 0; i < data.length; i++) {
        data[i].total = 0
        for (let j = 0; j < countCustomersArise[0].length; j++) {
            if (data[i].user_id === countCustomersArise[0][j].user_id_sale) {
                data[i].total = countCustomersArise[0][j].total
            }
        }
    }
    for (let i = 0; i < data.length; i++) {
        data[i].total_potential = 0
        for (let j = 0; j < countPotentialCustomers[0].length; j++) {
            if (data[i].user_id === countPotentialCustomers[0][j].user_id_sale) {
                data[i].total_potential = countPotentialCustomers[0][j].total
            }
        }
    }
    c.data = data
    c.mess = c.MESS.getData
}

/**
 * @param p
 * @param c {Controller}
 */
export const countCustomerOverviewOfManager = async ({
                                                         from,
                                                         to,
                                                         group_sale_id,
                                                         create_type,
                                                         user_id_sale,
                                                         exchange_id
                                                     }, c) => {
    console.log(typeof user_id_sale)
    let permission = ""
    let listUserId = []
    let listExchangeId = []
    let listGroupId = []
    let type = null
    const permissionGroupMember = await getListBoV2PermissionGroupMemberMd({user_id: c.user_id})
    for (const boV2PermissionGroupMember of permissionGroupMember) {
        if (boV2PermissionGroupMember.staff_object_id === "giamdocsan" || boV2PermissionGroupMember.staff_object_id === "truongphong") {
            listExchangeId.push(boV2PermissionGroupMember.scope_id)
        }
        if (boV2PermissionGroupMember.staff_object_id === "truongnhom") {
            listGroupId.push(boV2PermissionGroupMember.scope_id)
        }
        if (boV2PermissionGroupMember.staff_object_id === "nhanvienbanhang") {
            listUserId.push(c.user_id)
        }
    }
    const groupMember = await getListBoV2GroupMemberMd({
        [Op.or]: {
            exchange_id: {[Op.in]: listExchangeId},
            group_sale_id: {[Op.in]: listGroupId}
        }
    })
    for (const boV2GroupMember of groupMember) {
        listUserId.push(boV2GroupMember.user_id)
    }
    listUserId = [...new Set(listUserId)]

    let listPermission = []
    for (const boV2PermissionGroupMember of permissionGroupMember) {
        listPermission.push(boV2PermissionGroupMember.staff_object_id)
    }
    listPermission = [...new Set(listPermission)]
    if (listUserId.length === 0) {
        listUserId = [c.user_id]
    }
    permission = ""
    if (listPermission.includes("nhanvienbanhang")) permission = "nhanvienbanhang"
    if (listPermission.includes("truongnhom")) permission = "truongnhom"
    if (listPermission.includes("truongphong")) permission = "truongphong"
    if (listPermission.includes("giamdocsan")) permission = "giamdocsan"
    if (c.p.master) permission = "master"
    if (permission === "nhanvienbanhang") type = "a.user_id_sale"
    if (permission === "truongnhom") type = "b.group_sale_id"
    if (permission === "truongphong") type = "b.exchange_id"
    if (permission === "giamdocsan") type = "b.exchange_id"
    if (permission === "master") type = "b.exchange_id"
    console.log(type)
    let where = ""
    if (from && to) {
        where += ` and a.created_at between '${from}' and '${to}'`
    }
    if (create_type) {
        where += ` and a.create_type = ${create_type}`
    }
    if (exchange_id) {
        type = "b.group_sale_id"
        where += ` and b.exchange_id = ${exchange_id}`
    }
    if (group_sale_id) {
        type = "a.user_id_sale"
        where += ` and b.group_sale_id = ${group_sale_id}`
    }
    if (user_id_sale) {
        type = "a.user_id_sale"
        where += ` and a.user_id_sale = ${user_id_sale}`
    }
    const countCustomersArise = await sequelize.query(`select ${type}, count(*) as total
                                                                                from bo_v2_customer as a,
                                                                                bo_v2_group_member as b
                                                                                where a.user_id_sale in (${listUserId})
                                                                                and a.user_id_sale = b.user_id
                                                                                ${where}
                                                                                and b.deleted_at is null
                                                                                and a.deleted_at is null
                                                                                group by ${type}`)
    const countPotentialCustomers = await sequelize.query(`select ${type}, count(*) as total
                                                                                from bo_v2_customer as a,
                                                                                bo_v2_group_member as b
                                                                                where a.user_id_sale in (${listUserId})
                                                                                and a.user_id_sale = b.user_id
                                                                                and a.interactive_status = 5
                                                                                ${where}
                                                                                and b.deleted_at is null
                                                                                and a.deleted_at is null
                                                                                group by ${type}`)
    let data = []
    console.log(type)
    if (type === "b.exchange_id") {
        const exchange = await getListBoV2ExchangeMd({id: {[Op.in]: listExchangeId}})
        for (let i = 0; i < exchange.length; i++) {
            data.push({
                exchange_id: exchange[i].id,
            })
        }
        for (let i = 0; i < data.length; i++) {
            data[i].total = 0
            for (let j = 0; j < countCustomersArise[0].length; j++) {
                if (data[i].exchange_id === countCustomersArise[0][j].exchange_id) {
                    data[i].total = countCustomersArise[0][j].total
                }
            }
        }
        for (let i = 0; i < data.length; i++) {
            data[i].total_potential = 0
            for (let j = 0; j < countPotentialCustomers[0].length; j++) {
                if (data[i].exchange_id === countPotentialCustomers[0][j].exchange_id) {
                    data[i].total_potential = countPotentialCustomers[0][j].total
                }
            }
        }
        c.data = data
        c.mess = c.MESS.getData
        return

    }
    if (type === "b.group_sale_id") {
        let list = []
        if (exchange_id) {
            const groupSale = await getListBoV2GroupMemberMd({exchange_id: exchange_id})
            for (const boV2GroupMember of groupSale) {
                list.push(boV2GroupMember.group_sale_id)
            }
        } else {
            const groupSale = await getListBoV2GroupMemberMd({group_sale_id: {[Op.in]: listGroupId}})
            for (let boV2GroupMember of groupSale) {
                list.push(boV2GroupMember.group_sale_id)
            }
        }
        list = [...new Set(list)]
        for (let i = 0; i < list.length; i++) {
            data.push({
                group_sale_id: list[i],
            })
        }
        for (let i = 0; i < data.length; i++) {
            data[i].total = 0
            for (let j = 0; j < countCustomersArise[0].length; j++) {
                if (data[i].group_sale_id === countCustomersArise[0][j].group_sale_id) {
                    data[i].total = countCustomersArise[0][j].total
                }
            }
        }
        for (let i = 0; i < data.length; i++) {
            data[i].total_potential = 0
            for (let j = 0; j < countPotentialCustomers[0].length; j++) {
                if (data[i].group_sale_id === countPotentialCustomers[0][j].group_sale_id) {
                    data[i].total_potential = countPotentialCustomers[0][j].total
                }
            }
        }
        c.data = data
        c.mess = c.MESS.getData
        return

    }
    if (type === "a.user_id_sale") {
        if (user_id_sale) {
            data = [{user_id_sale: Number(user_id_sale), total: 0, total_potential: 0}]
            if (countCustomersArise[0].length > 0) {
                data[0].total = countCustomersArise[0][0].total
            }
            if (countPotentialCustomers[0].length > 0) {
                data[0].total_potential = countPotentialCustomers[0][0].total
            }
            c.data = data
            c.mess = c.MESS.getData
            return
        }
        if (group_sale_id) {
            const member = await getListBoV2GroupMemberMd({group_sale_id: group_sale_id})
            for (const boV2GroupMember of member) {
                data.push({user_id_sale: boV2GroupMember.user_id})
            }
            for (let i = 0; i < data.length; i++) {
                data[i].total = 0
                for (let j = 0; j < countCustomersArise[0].length; j++) {
                    if (data[i].user_id_sale === countCustomersArise[0][j].user_id_sale) {
                        data[i].total = countCustomersArise[0][j].total
                    }
                }
            }
            for (let i = 0; i < data.length; i++) {
                data[i].total_potential = 0
                for (let j = 0; j < countPotentialCustomers[0].length; j++) {
                    if (data[i].user_id_sale === countPotentialCustomers[0][j].user_id_sale) {
                        data[i].total_potential = countPotentialCustomers[0][j].total
                    }
                }
            }
            c.data = data
            c.mess = c.MESS.getData
            return
        }
        const user = await getListBoV2UserInfoMd({user_id: {[Op.in]: listUserId}})
        for (let i = 0; i < user.length; i++) {
            data.push({
                user_id_sale: user[i].user_id,
            })
        }
        for (let i = 0; i < data.length; i++) {
            data[i].total = 0
            for (let j = 0; j < countCustomersArise[0].length; j++) {
                if (data[i].user_id_sale === countCustomersArise[0][j].user_id_sale) {
                    data[i].total = countCustomersArise[0][j].total
                }
            }
        }
        for (let i = 0; i < data.length; i++) {
            data[i].total_potential = 0
            for (let j = 0; j < countPotentialCustomers[0].length; j++) {
                if (data[i].user_id_sale === countPotentialCustomers[0][j].user_id_sale) {
                    data[i].total_potential = countPotentialCustomers[0][j].total
                }
            }
        }
        c.data = data
        c.mess = c.MESS.getData
    }
}

/**
 * @param p
 * @param c {Controller}
 */
export const getListCustomerRecall = async (p, c) => {
    const {category_id, key_search, source_id, interactive_status, group_customer_id} = p
    const where = {status_allocation: 4}
    if (interactive_status) {
        where.interactive_status = {[Op.in]: JSON.parse(interactive_status)}
    }
    if (category_id) {
        where.category_id = {[Op.in]: JSON.parse(category_id)}
    }
    if (group_customer_id) {
        where.group_customer_id = {[Op.in]: JSON.parse(group_customer_id)}
    }
    if (source_id) {
        where.source_id = {[Op.in]: JSON.parse(source_id)}
    }

    if (key_search) {
        where[Op.or] = {
            email: {[Op.like]: `%${key_search}%`},
            full_name: {[Op.like]: `%${key_search}%`},
            phone: {[Op.like]: `%${key_search}%`}
        }
    }
    const customers = await getListBoV2CustomerMd(where)
    for (let customer of customers) {
        const history_thu_hoi = await getDetailBoV2SaleCustomerCampaignHistoryMd({
            action: "thu_hoi",
            customer_id: customer.id
        }, false, false [['created_at', "desc"]])
        customer.time_recal = history_thu_hoi?.created_at || ""
    }
    c.data = customers
    c.mess = c.MESS.getData
}


/**
 * @param p
 * @param c {Controller}
 */
export const countCustomerRecall = async (p, c) => {
    const {category_id, key_search, source_id, interactive_status, group_customer_id} = p
    const where = {status_allocation: 4}
    if (interactive_status) {
        where.interactive_status = {[Op.in]: JSON.parse(interactive_status)}
    }
    if (category_id) {
        where.category_id = {[Op.in]: JSON.parse(category_id)}
    }
    if (group_customer_id) {
        where.group_customer_id = {[Op.in]: JSON.parse(group_customer_id)}
    }
    if (source_id) {
        where.source_id = {[Op.in]: JSON.parse(source_id)}
    }
    if (key_search) {
        where[Op.or] = {
            email: {[Op.like]: `%${key_search}%`},
            full_name: {[Op.like]: `%${key_search}%`},
            phone: {[Op.like]: `%${key_search}%`}
        }
    }
    c.data = await countBoV2CustomerMd(where)
    c.mess = c.MESS.getData
}

/**
 * @param p {{ids : []}}
 * @param c {Controller}
 */
export const thuHoiKhachHang = async ({ids}, c) => {
    ids = JSON.parse(ids)
    const campaign_ids = []
    for (let id of ids) {
        const customer = await getDetailBoV2CustomerMd({id: id})

        if (customer === null || customer.create_type === 2) {
            continue
        }
        pushNotSame(campaign_ids, customer.campaign_id)
        await updateBoV2CustomerMd({status_allocation: 1, user_id_sale: 0}, {id})
        await addBoV2SaleCustomerCampaignHistoryMd({
            customer_id: customer.id,
            action: "thu_hoi",
            campaign_id: 0,
            user_id_sale: customer.user_id_sale
        })
    }
    for (let campaignId of campaign_ids) {
        await allotmentCustomerQueen.push({id: campaignId})
    }
}
