import {
    addSalePolicyRp,
    getDetailSalePolicyByCategoryRp,
    getDetailSalePolicyRp,
    updateSalePolicyRp
} from "@repository/salePolicyRepo";
import {countBoV2SalePolicyMd, getDetailBoV2SalePolicyMd, getListBoV2SalePolicyMd} from "@model/bo_v2_sale_policy";
import {Op} from "sequelize";
import {validNumber} from "@util";
import {aLog1Rp} from "@lib";


/**
 *
 * @param p {{
 * title,
 * code,
 * building_id,
 * category_id,
 * create_date,
 * from_date,
 * to_date,
 *
 *  incentives :{
 *     desc ,
 *     type_payment,
 *     total,
 *     title,
 *  }[],
 *  process_payment  : ({
 *          code,
 *          type_bonus,
 *          bonus,
 *          title,
 *
 *          payment_progress_details :  [{
 *              expired_time_paid,
 *              desc,
 *              type_payment,
 *              total,
 *              note,
 *              from_type
 *         }]
 *  }[])
 * }}
 * @param c {Controller}
 */
export const addSalePolicy = async (p, c) => {
    aLog1Rp("addSalePolicy", p)
    c.runValid({
        title: p.title,
        category_id: p.category_id,
        D_from_date: p.from_date,
        D_to_date: p.to_date,
    })
    p.process_payment = JSON.parse(p.process_payment)
    p.incentives = JSON.parse(p.incentives)
    for (let processPaymentElement of p.process_payment) {
        c.runValid({
            bonus: processPaymentElement.bonus,
            N_type_bonus: processPaymentElement.type_bonus,

        })
        for (let paymentProgressDetail of processPaymentElement.payment_progress_details) {
            c.runValid({
                N_expired_time_paid: paymentProgressDetail.expired_time_paid,
                N_type_payment: paymentProgressDetail.type_payment,
                N_total: paymentProgressDetail.total
            })
        }
    }
    for (let incentive of p.incentives) {
        c.runValid({
            N_total: incentive.total,
            N_type_payment: incentive.type_payment,
        })
    }
    if (c.v()) return

    const data = await addSalePolicyRp(
        {
            code: p.code,
            category_id: p.category_id,
            title: p.title,
            create_date: p.create_date,
            from_date: p.from_date,
            to_date: p.to_date,
            building_id : p.building_id
        }, p.process_payment, p.incentives, c.user_id
    )
    c.apply_resp(data)

}


/**
 *
 * @param p {{
 * title,
 * code,
 * building_id,
 * category_id,
 * create_date,
 * from_date,
 * to_date,
 * id,
 *  incentives :{
 *     desc ,
 *     type_payment,
 *     total,
 *     title,
 *  }[],
 *  process_payment  : ({
 *          code,
 *          type_bonus,
 *          bonus,
 *          title,
 *
 *          payment_progress_details :  [{
 *              expired_time_paid,
 *              desc,
 *              type_payment,
 *              total,
 *              note,
 *              from_type
 *         }]
 *  }[])
 * }}
 * @param c {Controller}
 */
export const updateSalePolicy = async (p, c) => {
    aLog1Rp("updateSalePolicy", p)
    c.runValid({
        N0_category_id: p.category_id,
        D0_from_date: p.from_date,
        D0_to_date: p.to_date,
        id: p.id
    })
    p.process_payment = JSON.parse(p.process_payment)
    p.incentives = JSON.parse(p.incentives)
    for (let processPaymentElement of p.process_payment) {
        c.runValid({
            N0_bonus: processPaymentElement.bonus,
            N0_type_bonus: processPaymentElement.type_bonus,
        })
        if (processPaymentElement.payment_progress_details) {
            for (let paymentProgressDetail of processPaymentElement.payment_progress_details) {
                c.runValid({
                    N0_expired_time_paid: paymentProgressDetail.expired_time_paid,
                    N0_type_payment: paymentProgressDetail.type_payment,
                    N0_total: paymentProgressDetail.total
                })
            }
        }

    }
    for (let incentive of p.incentives) {
        c.runValid({
            N0_total: incentive.total,
            N0_type_payment: incentive.type_payment,
        })
    }
    if (c.v()) return
    const data = await updateSalePolicyRp(
        {
            id: p.id,
            code: p.code,
            category_id: p.category_id,
            title: p.title,
            create_date: p.create_date,
            from_date: p.from_date,
            to_date: p.to_date,
            building_id: p.building_id,
        }, p.process_payment, p.incentives, c.user_id
    )
    c.apply_resp(data)

}
/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const getListSalePolicy = async (p, c) => {
    c.runValid({page: p.page, limit: p.limit})
    if (c.v()) return
    const where = {}
    if (p.title) {
        where.title = {[Op.like]: p.title}
    }
    if (p.building_id) {
        where.building_id = p.building_id
    }
    if (p.category_id) {
        where.category_id = p.category_id
    }
    if (validNumber(p.status)) {
        where.status = p.status
    }
    c.data = await getListBoV2SalePolicyMd(
        where, false, p.limit, p.page
    )
}

/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */

export const getDetailSalePolicy = async (p, c) => {
    c.runValid({id: p.id})
    if (c.v()) return
    c.data = await getDetailSalePolicyRp(p.id)
}

/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const countSalePolicy = async (p, c) => {
    const where = {}
    if (p.title) {
        where.title = {[Op.like]: p.title}
    }
    if (p.building_id) {
        where.building_id = p.building_id
    }
    if (p.category_id) {
        where.category_id = p.category_id
    }
    if (validNumber(p.status)) {
        where.status = p.status
    }
    c.data = await countBoV2SalePolicyMd(
        where, false
    )
}


/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */

export  const getDetailSalePolicyV2 =  async ({category_id , building_id},c)=> {
    c.runValid({N_category_id : category_id ,N_building_id : building_id})
    if(c.v()) return
    c.data =await getDetailSalePolicyByCategoryRp(category_id ,building_id)
    c.mess = c.MESS.getData
}


