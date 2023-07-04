import {addBoV2SalePolicyMd, getDetailBoV2SalePolicyMd, updateBoV2SalePolicyMd} from "@model/bo_v2_sale_policy";
import {
    addBoV2PaymentProgressMd,
    delBoV2PaymentProgressMd,
    getDetailBoV2PaymentProgressMd,
    getListBoV2PaymentProgressMd,
    updateBoV2PaymentProgressMd
} from "@model/bo_v2_payment_progress";
import {
    addBoV2PaymentProgressDetailMd,
    delBoV2PaymentProgressDetailMd,
    getListBoV2PaymentProgressDetailMd,
    updateBoV2PaymentProgressDetailMd
} from "@model/bo_v2_payment_progress_detail";
import {generateNumber, res} from "@util";
import {sequelize} from "@config/main";

/**
 *
 * @param salePolicy {Bo_v2_sale_policy}
 * @param processPayments {Bo_v2_payment_progress[] }
 * @param incentives : Bo_v2_payment_progress_detail[]
 * @param user_id
 */
export const addSalePolicyRp = async (salePolicy, processPayments, incentives, user_id) => {
    console.log(salePolicy, processPayments, incentives)
    const transaction = await sequelize.transaction()
    try {
        const data = await addBoV2SalePolicyMd({
            title: salePolicy.title,
            code: "CSUD_" + generateNumber(5),
            building_id: salePolicy.building_id,
            category_id: salePolicy.category_id,
            create_by: user_id,
            status: 1,
            from_date: salePolicy.from_date,
            to_date: salePolicy.to_date

        }, transaction)
        for (let processPayment of processPayments) {

            const paymentProgress = await addBoV2PaymentProgressMd({
                code: "PTTT_" + generateNumber(5),
                sale_policy_id: data.id,
                type_bonus: processPayment.type_bonus,
                bonus: processPayment.bonus,
                title: processPayment.title
            }, transaction)

            /**
             * @type {Bo_v2_payment_progress_detail[]}
             */
            const payment_progress_details = processPayment.payment_progress_details
            console.log(payment_progress_details)
            for (let paymentProgressDetail of payment_progress_details) {
                await addBoV2PaymentProgressDetailMd({
                    payment_progress_id: paymentProgress.id,
                    sale_policy_id: data.id,
                    expired_time_paid: paymentProgressDetail.expired_time_paid,
                    desc: paymentProgressDetail.desc,
                    type_payment: paymentProgressDetail.type_payment,
                    total: paymentProgressDetail.total,
                    type: 1,
                    note: paymentProgressDetail.note,
                    from_type: paymentProgressDetail.from_type
                }, transaction)
            }
        }

        for (let incentive of incentives) {
            await addBoV2PaymentProgressDetailMd({
                sale_policy_id: data.id,
                desc: incentive.desc,
                type_payment: incentive.type_payment,
                total: incentive.total,
                title: incentive.title,
                type: 2,
            }, transaction)
        }
        await transaction.commit()
        return res("", true, data)
    } catch (e) {
        await transaction.rollback()
        throw  e
    }

}
/**
 *
 * @param salePolicy {Bo_v2_sale_policy}
 * @param processPayments {Bo_v2_payment_progress[] }
 * @param incentives : Bo_v2_payment_progress_detail[]
 * @param user_id
 */
export const updateSalePolicyRp = async (salePolicy, processPayments, incentives, user_id) => {
    const transaction = await sequelize.transaction()
    try {

        const data = await updateBoV2SalePolicyMd({
            title: salePolicy.title,
            code: salePolicy.code,
            building_id: salePolicy.building_id,
            category_id: salePolicy.category_id,
            status: salePolicy.status,
            from_date: salePolicy.from_date,
            to_date: salePolicy.to_date
        }, {id: salePolicy.id})
        for (let processPayment of processPayments) {

            if (processPayment.id) {
                if (processPayment.deleted_at === 1) {
                    await delBoV2PaymentProgressMd({id: processPayment.id, sale_policy_id: salePolicy.id}, transaction)
                    continue
                }
                if (processPayment.code) {
                    const checkCodeV2 = await getDetailBoV2PaymentProgressMd({code: processPayment.code,}, transaction)
                    if (checkCodeV2) {
                        await transaction.rollback()
                        return res("Trùng mã code phương thức thanh toán")
                    }
                }

                const paymentProgress = await updateBoV2PaymentProgressMd({
                    code: processPayment.code,
                    type_bonus: processPayment.type_bonus,
                    bonus: processPayment.bonus,
                    title: processPayment.title,
                }, {id: processPayment.id, sale_policy_id: salePolicy.id}, transaction)

                const payment_progress_details = processPayment.payment_progress_details
                if (payment_progress_details) {
                    for (let paymentProgressDetail of payment_progress_details) {
                        if (paymentProgressDetail.id && paymentProgressDetail.deleted_at === 1) {
                            await delBoV2PaymentProgressDetailMd({
                                id: paymentProgressDetail.id,
                                sale_policy_id: salePolicy.id
                            }, transaction)
                            continue
                        }
                        if (paymentProgressDetail.id) {
                            await updateBoV2PaymentProgressDetailMd({
                                expired_time_paid: paymentProgressDetail.expired_time_paid,
                                desc: paymentProgressDetail.desc,
                                type_payment: paymentProgressDetail.type_payment,
                                total: paymentProgressDetail.total,
                                note: paymentProgressDetail.note,
                                from_type: paymentProgressDetail.from_type
                            }, {id: paymentProgressDetail.id, sale_policy_id: salePolicy.id}, transaction)
                            continue
                        }
                        await addBoV2PaymentProgressDetailMd({
                            payment_progress_id: paymentProgress.id,
                            sale_policy_id: salePolicy.id,
                            expired_time_paid: paymentProgressDetail.expired_time_paid,
                            desc: paymentProgressDetail.desc,
                            type_payment: paymentProgressDetail.type_payment,
                            total: paymentProgressDetail.total,
                            type: 1,
                            note: paymentProgressDetail.note,
                            from_type: paymentProgressDetail.from_type
                        }, transaction)

                    }
                }


                continue
            }
            const checkCodeV2 = await getDetailBoV2PaymentProgressMd({code: processPayment.code,}, transaction)
            if (checkCodeV2) {
                await transaction.commit()
                return res("Trùng mã code phương thức thanh toán")
            }
            const paymentProgress = await addBoV2PaymentProgressMd({
                code: "PTTT_" + generateNumber(5),
                sale_policy_id: salePolicy.id,
                type_bonus: processPayment.type_bonus,
                bonus: processPayment.bonus,
                title: processPayment.title
            }, transaction)

            /**
             * @type {Bo_v2_payment_progress_detail[]}
             */
            const payment_progress_details = processPayment.payment_progress_details
            for (let paymentProgressDetail of payment_progress_details) {
                await addBoV2PaymentProgressDetailMd({
                    payment_progress_id: paymentProgress.id,
                    sale_policy_id: salePolicy.id,
                    expired_time_paid: paymentProgressDetail.expired_time_paid,
                    desc: paymentProgressDetail.desc,
                    type_payment: paymentProgressDetail.type_payment,
                    total: paymentProgressDetail.total,
                    note: paymentProgressDetail.note,
                    from_type: paymentProgressDetail.from_type
                }, transaction)
            }
        }

        for (let incentive of incentives) {

            if (incentive.id && incentive.deleted_at === 1) {
                await delBoV2PaymentProgressDetailMd({id: incentive.id, sale_policy_id: salePolicy.id,}, transaction)
                continue
            }
            if (incentive.id) {
                await updateBoV2PaymentProgressDetailMd({
                    desc: incentive.desc,
                    type_payment: incentive.type_payment,
                    total: incentive.total,
                    title: incentive.title,
                }, {
                    id: incentive.id,
                    sale_policy_id: salePolicy.id,
                }, transaction)
                continue
            }
            await addBoV2PaymentProgressDetailMd({
                sale_policy_id: salePolicy.id,
                desc: incentive.desc,
                type_payment: incentive.type_payment,
                total: incentive.total,
                title: incentive.title,
            }, transaction)
        }
        await transaction.commit()
        return res("", true, data)
    } catch (e) {
        await transaction.rollback()
        throw  e
    }

}
export const getDetailSalePolicyRp = async (id) => {
    const salePolicy = await getDetailBoV2SalePolicyMd({id})
    const tien_trinh_thanh_toan = await getListBoV2PaymentProgressMd({sale_policy_id: salePolicy.id})
    for (let boV2PaymentProgress of tien_trinh_thanh_toan) {
        boV2PaymentProgress.payment_progress_details = await getListBoV2PaymentProgressDetailMd({payment_progress_id: boV2PaymentProgress.id}, false, false, false, [["id", "asc"]])
    }
    salePolicy.process_payment = tien_trinh_thanh_toan
    salePolicy.incentives = await getListBoV2PaymentProgressDetailMd({
        sale_policy_id: salePolicy.id,
        payment_progress_id: 0
    }, false, false, false, [["id", "asc"]])
    return salePolicy
}
export const getDetailSalePolicyByCategoryRp = async (category_id , building_id) => {
    const salePolicy = await getDetailBoV2SalePolicyMd({category_id , building_id})
    if(salePolicy === null)  return salePolicy
    const tien_trinh_thanh_toan = await getListBoV2PaymentProgressMd({sale_policy_id: salePolicy.id})
    for (let boV2PaymentProgress of tien_trinh_thanh_toan) {
        boV2PaymentProgress.payment_progress_details = await getListBoV2PaymentProgressDetailMd({payment_progress_id: boV2PaymentProgress.id}, false, false, false, [["id", "asc"]])
    }
    salePolicy.process_payment = tien_trinh_thanh_toan
    salePolicy.incentives = await getListBoV2PaymentProgressDetailMd({
        sale_policy_id: salePolicy.id,
        payment_progress_id: 0
    }, false, false, false, [["id", "asc"]])
    return salePolicy
}
