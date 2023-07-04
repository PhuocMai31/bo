import {themHopDongTuVanRp} from "@repository/billRepo";
import {mapPermission, seqIn, seqOr, whereSequelize} from "@util";
import {getPermissionObjStaffByUser} from "@repository/permissionRepo";
import {OBJ_STAFF_ID, TYPE_BILL} from "@constant";
import {getListBoV2GroupMemberMd} from "@model/bo_v2_group_member";
import {getDetailBoV2BillMd, getListBoV2BillMd} from "@model/bo_v2_bill";
import {addWardMd} from "@model/ward";
import {getDetailCategories} from "@controller/categoryController";
import {getDetailBOCategoryMd} from "@model";
import {getDetailBoV2TemplateMd} from "@model/bo_v2_template";

/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const themHopDongTuVan = async ({
                                           customer_id,
                                           building_id,
                                           category_id,
                                           campaign_sale_id,
                                           wish,
                                           note,
                                           phone,
                                           birthday,
                                           email,
                                           sex,
                                           cmt_number,
                                           cmt_date,
                                           cmt_address,
                                           cb_city_id,
                                           cb_district_id,
                                           cb_ward_id,
                                           cb_address,
                                           city_id,
                                           district_id,
                                           ward_id,
                                           address,
                                           cmt_img_before,
                                           cmt_img_after,
                                           source_id,
                                           country,
                                           will_pay
                                       }, c) => {
    c.runValid({customer_id, building_id, category_id, wish})
    const valid = {
        N_city_id: city_id,
        N_district_id: district_id,
        N_ward_id: ward_id,
        N_cb_city_id: cb_city_id,
        N_cb_district_id: cb_district_id,
        N_cb_ward_id: cb_ward_id,
        N_sex: sex,
        N_source_id: source_id,
        D_cmt_date: cmt_date,
        N_will_pay : will_pay
    }
    if (country !== "nuoc_ngoai") valid.phone = phone
    if (country === "nuoc_ngoai") valid.S_phone = phone
    c.runValid(valid)
    if (c.v()) return
    const info_customer = {
        phone,
        birthday,
        email,
        sex,
        cmt_number,
        cmt_date,
        cmt_address,
        cb_city_id,
        cb_district_id,
        cb_ward_id,
        cb_address,
        city_id,
        district_id,
        ward_id,
        address,
        cmt_img_before,
        cmt_img_after,
        source_id,
        country,
        will_pay
    }
    c.data = await themHopDongTuVanRp(c.user_id, note, customer_id, campaign_sale_id, category_id, building_id, wish ,JSON.stringify(info_customer))
    c.mess = c.MESS.addData
}
/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const getListBill = async (p, c) => {
    c.runValid({page : p.page  , limit : p.limit})
    if(c.v()) return
    const permission = await getPermissionObjStaffByUser(c.user_id, false, seqOr([OBJ_STAFF_ID.dieuphoikinhdoanh, OBJ_STAFF_ID.giamdocsan, OBJ_STAFF_ID.thukydonvi, OBJ_STAFF_ID.thukydonvi]))
    const or = [{user_sale_id: c.user_id},]
    if (permission.category.length) {
        or.push({category_id: seqIn(permission.category)})
    }
    if (permission.exchange.length) {
        const user_sale = await getListBoV2GroupMemberMd({exchange_id: seqIn(permission.exchange)})
        user_sale.length && or.push({user_sale_id: seqIn(user_sale.map(value => value.user_id))})
    }
    const where = seqOr(or)
    if(p.status !== undefined) {
        where.status = p.status
    }
    c.data = await getListBoV2BillMd(where , false, p.limit , p.page)
    c.mess = c.MESS.getData
}

/**
 *
 * @param p
 * @param c
 * @returns {Promise<void>}
 */
export const getDetailBill = async ({id}, c) => {

}


/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export  const mauHopDong =async ({code} ,c )=> {
     const hopdong  =await getDetailBoV2BillMd({code })
     const category = await getDetailBOCategoryMd({id : hopdong.category_id})
    let template = await getDetailBoV2TemplateMd({type_product : category.type_product , stage: hopdong.type , category_id : category.id})
    if(template === null){
         template = await getDetailBoV2TemplateMd({type_product : category.type_product, stage: hopdong.type , type_pattern : 1})
    }
    c.data   ={hopdong , category , template}
    c.mess = c.MESS.getData
}