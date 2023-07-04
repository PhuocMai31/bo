import {
    addBoV2PaymentInfoMd, countBoV2PaymentInfoMd, delBoV2PaymentInfoMd,
    getDetailBoV2PaymentInfoMd,
    getListBoV2PaymentInfoMd,
    updateBoV2PaymentInfoMd
} from "@model/bo_v2_payment_info";
import {Op} from "sequelize";
import {queryLike, seqLike, whereSequelize} from "@util";

/**
 * @param p
 * @param c {Controller}
 */
export const addPaymentInfo = async ({
                                         bank_number,
                                         account_holder,
                                         short_name,
                                         bank_name,
                                         type_payment,
                                     }, c) => {
    c.runValid({account_holder, short_name, type_payment})
    if (c.v())
        return
    c.data = await addBoV2PaymentInfoMd({bank_number, account_holder, short_name, type_payment})
    c.mess = c.MESS.addData
};
/**
 * @param p
 * @param c {Controller}
 */
export const updatePaymentInfo = async ({
                                            bank_number,
                                            account_holder,
                                            bin, status,
                                            type_payment,
                                            id
                                        }, c) => {
    c.data = await updateBoV2PaymentInfoMd({
        bank_number, account_holder,
        status,
        type_payment
    }, {id})
    c.mess = c.MESS.update
};


/**
 * @param p
 * @param c {Controller}
 */
export const getListPaymentInfo = async ({limit, page,  short_name}, c) => {
    c.runValidAlNull({limit, page})
    if (c.v())
        return
    const where =whereSequelize({short_name})
    c.data = await getListBoV2PaymentInfoMd(where, false, limit, page)
    c.mess = c.MESS.getData
};
/**
 * @param p
 * @param c {Controller}
 */
export const countPaymentInfo = async ({ short_name}, c) => {
    const where = {}
    if (short_name) {
        where.short_name = short_name
    }
    c.data = await countBoV2PaymentInfoMd(where)
    c.mess = c.MESS.getData
};

/**
 * @param p
 * @param c {Controller}
 */
export const getDetailPaymentInfo = async ({id}, c) => {
    c.runValidAlNull({id})
    if (c.v())
        return
    c.data = await getDetailBoV2PaymentInfoMd({ id })
    c.mess = c.MESS.getData
};


/**
 * @param p
 * @param c {Controller}
 */
export const delPaymentInfo = async ({id}, c) => {
    c.runValidAlNull({id})
    if (c.v())
        return
    c.data = await delBoV2PaymentInfoMd({id})
    c.mess = c.MESS.delete
};

