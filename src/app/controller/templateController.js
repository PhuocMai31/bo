import {
    addBoV2TemplateMd,
    countBoV2TemplateMd,
    getDetailBoV2TemplateMd,
    getListBoV2TemplateMd, updateBoV2TemplateMd
} from "@model/bo_v2_template";
import {whereSequelize} from "@util";

/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const addTemplate = async ({
                                      type,
                                      type_product,
                                      code,
                                      title,
                                      category_id,
                                      stage,
                                      type_pattern,
                                      data, email_term
                                  }, c) => {
    c.runValid(type, type_product, code,
        title,
        stage,
        type_pattern,
        data
    )
    if (c.v()) return
    if (category_id) {
        const check = await getDetailBoV2TemplateMd({
            type, type_product, category_id, stage,
            type_pattern
        })
        if (check) {
            c.mess = "mẫu template đã có cho dự án này"
            c.status = false
            return
        }

    }
    const check2 = await getDetailBoV2TemplateMd({
        code
    })
    if (check2) {
        c.mess = "Mã code này đã được thiết lập"
        c.status = false
        return
    }
    c.data = addBoV2TemplateMd({
        type,
        type_product,
        code,
        title,
        category_id,
        stage,
        type_pattern,
        data,
        email_term
    })
    c.mess = c.MESS.addData
}

/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const getListTemplate = async ({title, category_id, limit, page}, c) => {
    c.runValid({limit, page})
    if (c.v()) return
    c.data = await getListBoV2TemplateMd(whereSequelize({title, category_id}), false, limit, page)
    c.mess = c.MESS.getData
}
/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const countTemplate = async ({title, category_id}, c) => {
    c.data = await countBoV2TemplateMd(whereSequelize({title, category_id}))
    c.mess = c.MESS.getData
}
/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const getDetailTemplate = async ({id}, c) => {
    c.runValid({id})
    if (c.v()) return
    c.data = await getDetailBoV2TemplateMd({id})
    c.mess = c.MESS.getData
}


/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const updateTemplate = async ({
                                         type,
                                         type_product,
                                         code,
                                         title,
                                         category_id,
                                         stage,
                                         type_pattern,
                                         data,
                                         status, email_term,
                                         id,
                                     }, c) => {

    if (code) {
        const check2 = await getDetailBoV2TemplateMd({
            code,
        })
        if (check2) {
            c.mess = "Mã code này đã được thiết lập"
            c.status = false
            return
        }
    }

    c.data = updateBoV2TemplateMd({
        type,
        type_product,
        code,
        title,
        category_id,
        stage,
        type_pattern,
        data,
        status,
        email_term
    }, {id})
    c.mess = c.MESS.update
}