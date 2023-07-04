import {Op, where} from "sequelize";
import {updateFiles, uploadImg} from "@util";
import {
    addBOCategoryMd,
    countBOCategoryMd,
    getDetailBOCategoryMd,
    getListBOCategoryMd,
    updateBOCategoryMd
} from "@model/b_o_categories";
import {aLog1Rp} from "@lib";
import {countBoV2ProductMd} from "@model/bo_v2_product";

/**
 *
 * @param p
 * @param c {Controller}
 */
export const getListCategories = async ({
                                            parent_id,
                                            row_table_style,
                                            lock,
                                            assemble,
                                            publication_time,
                                            city_id,
                                            district_id,
                                            from, to,
                                            apartment_grid,
                                            price_from, price_to,
                                            cb_status, cb_title, cb_level, stage, type_project, limit, page
                                        }, c) => {

    let where = {cb_level: 1}
    if (cb_level) {
        where.cb_level = cb_level
    }
    if (stage) {
        where.stage = stage
    }
    if (type_project) {
        where.type_project = type_project
    }
    if (parent_id) {
        where.parent_id = parent_id
    }
    if (row_table_style) {
        where.row_table_style = row_table_style
    }
    if (lock) {
        where.lock = lock
    }
    if (assemble) {
        where.assemble = assemble
    }
    if (publication_time) {
        where.publication_time = publication_time
    }
    if (from && to) {
        where.handover_documents = {[Op.between]: [from, to]}
    }
    if (cb_status) {
        where.cb_status = cb_status
    }
    if (cb_title) {
        where.cb_title = {[Op.like]: `%${cb_title}%`}
    }
    if (city_id) {
        where.city_id = city_id
    }
    if (district_id) {
        where.district_id = district_id
    }
    if (type_project) {
        where.type_project = type_project
    }
    if (apartment_grid) {
        where.apartment_grid = apartment_grid
    }
    if (price_from){
        where.price_from = {[Op.gt]:price_from}
    }
    if (price_to){
        where.price_to = {[Op.lt]:price_to}
    }
    const data = await getListBOCategoryMd(where, false, limit, page, [['created_at', "desc"]])
    for (const datum of data) {
        datum.total_product = await countBoV2ProductMd({category_id: datum.id, status: 1})
    }
    c.data = data
    c.mess = c.MESS.getData
}

/**
 *
 * @param p
 * @param c {Controller}
 */
export const countCategories = async ({
                                          parent_id,
                                          row_table_style,
                                          lock,
                                          assemble,
                                          publication_time,
                                          from, to,
                                          cb_status, cb_title, cb_level, stage, type_project, limit, page
                                      }, c) => {
    let where = {}
    if (cb_level) {
        where.cb_level = cb_level
    }
    if (stage) {
        where.stage = stage
    }
    if (type_project) {
        where.type_project = type_project
    }
    if (parent_id) {
        where.parent_id = parent_id
    }
    if (row_table_style) {
        where.row_table_style = row_table_style
    }
    if (lock) {
        where.lock = lock
    }
    if (assemble) {
        where.assemble = assemble
    }
    if (publication_time) {
        where.publication_time = publication_time
    }
    if (from && to) {
        where.handover_documents = {[Op.between]: [from, to]}
    }
    if (cb_status) {
        where.cb_status = cb_status
    }
    if (cb_title) {
        where.cb_title = {[Op.like]: `%${cb_title}%`}
    }
    c.data = await countBOCategoryMd(where)
    c.mess = c.MESS.getData
}

/**
 *
 * @param p
 * @param c {Controller}
 */
export const addCategories = async ({
                                        cb_id,
                                        cb_status,
                                        parent_id,
                                        cb_code,
                                        reference_code,
                                        cb_title,
                                        alias,
                                        cb_description,
                                        extra_ids,
                                        updated_user_id,
                                        investor_id,
                                        ub_updated_time,
                                        created_user_id,
                                        ub_created_time,
                                        cb_level,
                                        last_sync_tvc,
                                        type,
                                        apartment_grid,
                                        active_booking,
                                        enable_list_price,
                                        send_mail,
                                        dxmb_project_id,
                                        files,
                                        price_from,
                                        price_to,
                                        city_id,
                                        district_id,
                                        pj_description,
                                        address,
                                        stage,
                                        hidden_cat,
                                        order,
                                        company_id,
                                        staff_lock,
                                        ward_id,
                                        staff_assemble,
                                        active_assemble,
                                        total_progress,
                                        type_project,
                                        segment,
                                        type_product,
                                        juridical,
                                        keeping_time
                                    }, c) => {
    c.runValid({
        N_city_id: city_id,
        N_district_id: district_id,
        S_cb_title: cb_title,
        S_address: address,
        S_cb_code: cb_code
    })
    if (c.v()) return
    cb_id = new Date().getTime().toString()
    cb_id = parseInt(cb_id.substring(0, 10))
    let image = undefined
    let images = undefined;
    let galleries = []
    console.log(files, "image")
    if (files.avatar) {
        image = await updateFiles(files.avatar[0])
    }
    if (files.gallery) {
        for (let i = 0; i < files.gallery.length; i++) {
            let gallery = await updateFiles(files.gallery[i])
            galleries.push(gallery)
        }
        images = JSON.stringify(galleries)
    }
    const checkName = await getDetailBOCategoryMd({cb_title})
    if (checkName) {
        c.status = false
        c.mess = "Ten du an da ton tai"
        return
    }
    console.log(images)
    c.data = await addBOCategoryMd({
        cb_id,
        cb_status,
        parent_id,
        cb_code,
        reference_code,
        cb_title,
        alias,
        cb_description,
        extra_ids,
        updated_user_id,
        investor_id,
        ub_updated_time,
        created_user_id,
        ub_created_time,
        cb_level,
        last_sync_tvc,
        type,
        apartment_grid,
        active_booking,
        enable_list_price,
        send_mail,
        dxmb_project_id,
        image,
        images,
        price_from,
        price_to,
        city_id,
        district_id,
        pj_description,
        address,
        stage,
        hidden_cat,
        order,
        company_id,
        staff_lock,
        ward_id,
        staff_assemble,
        active_assemble,
        total_progress,
        type_project,
        keeping_time
    })
    c.mess = c.MESS.addData
}

/**
 *
 * @param p
 * @param c {Controller}
 */
export const addBuilding = async ({
                                      cb_id,
                                      cb_code,
                                      cb_title,
                                      parent_id,
                                      row_table_style,
                                      lock,
                                      assemble,
                                      publication_time,
                                      handover_documents,
                                      cb_status
                                  }, c) => {
    c.runValid({
        S_cb_code: cb_code,
        S_cb_title: cb_title,
        N_parent_id: parent_id,
        N_row_table_style: row_table_style,
        N_lock: lock,
        N_assemble: assemble
    })
    if (c.v()) return
    const checkCode = await getDetailBOCategoryMd({cb_code})
    if (checkCode) {
        c.status = false
        c.mess = "Ma toa nha da ton tai"
        return
    }
    const checkTitle = await getDetailBOCategoryMd({cb_title})
    if (checkTitle) {
        c.status = false
        c.mess = "Ten toa nha da ton tai"
        return
    }
    cb_id = new Date().getTime().toString()
    cb_id = parseInt(cb_id.substring(0, 10))
    let cb_level = 2
    c.data = await addBOCategoryMd({
        cb_id,
        cb_code,
        cb_title,
        cb_level,
        parent_id,
        row_table_style,
        lock,
        assemble,
        publication_time,
        handover_documents,
        cb_status
    })
    c.mess = c.MESS.addData
}
/**
 *
 * @param p
 * @param c {Controller}
 */
export const updateBuilding = async ({
                                         id,
                                         cb_code,
                                         cb_title,
                                         parent_id,
                                         row_table_style,
                                         lock,
                                         assemble,
                                         publication_time,
                                         handover_documents,
                                         cb_status
                                     }, c) => {
    const checkBuilding = await getDetailBOCategoryMd({id})
    if (!checkBuilding) {
        c.status = false
        c.mess = "Toa nha khong ton tai"
        return
    }
    if (cb_code) {
        const checkCode = await getDetailBOCategoryMd({cb_code})
        if (checkCode) {
            c.status = false
            c.mess = "Ma toa nha da ton tai"
            return
        }
    }
    if (cb_title) {
        const checkTitle = await getDetailBOCategoryMd({cb_title})
        if (checkTitle) {
            c.status = false
            c.mess = "Ten toa nha da ton tai"
            return
        }
    }
    c.data = await updateBOCategoryMd({
        cb_code,
        cb_title,
        parent_id,
        row_table_style,
        lock,
        assemble,
        publication_time,
        handover_documents,
        cb_status
    }, {id})
    c.mess = c.MESS.update
}

/**
 *
 * @param p
 * @param c {Controller}
 */
export const getListBuilding = async ({
                                          cb_code,
                                          parent_id,
                                          row_table_style,
                                          lock,
                                          assemble,
                                          publication_time,
                                          from, to,
                                          cb_status, key_search,
                                          limit, page
                                      }, c) => {
    c.runValid({
        limit,
        page
    })
    if (c.v()) return
    let where = {cb_level: 2}
    if (parent_id) where.parent_id = parent_id
    if (row_table_style) where.row_table_style = row_table_style
    if (lock) where.lock = lock
    if (assemble) where.assemble = assemble
    if (publication_time) where.publication_time = publication_time
    if (from && to) where.handover_documents = {[Op.between]: [from, to]}
    if (cb_status) where.cb_status = cb_status
    if (key_search) {
        where[Op.or] = [
            {cb_title: {[Op.like]: `%${key_search}%`}},
            {cb_code: {[Op.like]: `%${key_search}%`}}
        ]
    }
    c.data = await getListBOCategoryMd(where, false, limit, page, [['updated_at', "desc"]])
    c.mess = c.MESS.getData
}
/**
 *
 * @param p
 * @param c {Controller}
 */
export const updateCategories = async ({
                                           id, cb_id,
                                           cb_status,
                                           parent_id,
                                           cb_code,
                                           reference_code,
                                           cb_title,
                                           alias,
                                           cb_description,
                                           extra_ids,
                                           updated_user_id,
                                           investor_id,
                                           ub_updated_time,
                                           created_user_id,
                                           ub_created_time,
                                           cb_level,
                                           last_sync_tvc,
                                           type,
                                           apartment_grid,
                                           active_booking,
                                           enable_list_price,
                                           send_mail,
                                           dxmb_project_id,
                                           files,
                                           images,
                                           price_from,
                                           price_to,
                                           city_id,
                                           district_id,
                                           pj_description,
                                           address,
                                           stage,
                                           hidden_cat,
                                           order,
                                           company_id,
                                           staff_lock,
                                           ward_id,
                                           staff_assemble,
                                           active_assemble,
                                           total_progress,
                                           type_project,
                                           segment,
                                           type_product,
                                           juridical,
                                           keeping_time
                                       }, c) => {
    let where_code = {id: {[Op.ne]: id}}
    let where_title = {id: {[Op.ne]: id}}

    const category = await getDetailBOCategoryMd({id})
    if (!category) {
        c.status = false
        c.mess = "Du an khong ton tai"
        return
    }
    if (cb_code) {
        where_code.cb_code = cb_code
        const checkCode = await getDetailBOCategoryMd(where_code)
        if (checkCode) {
            c.status = false
            c.mess = "Ma du an da ton tai"
            return
        }
    }
    if (cb_title) {
        where_title.cb_title = cb_title
        const checkTitle = await getDetailBOCategoryMd(where_title)
        if (checkTitle) {
            c.status = false
            c.mess = "Ten du an da ton tai"
            return
        }
    }
    let image = category.image;
    images = images ? JSON.parse(images) : JSON.parse(category.images)
    console.log(files.gallery)
    let galleries = []
    if (files.avatar) {
        image = await updateFiles(files.avatar[0])
    }
    if (files.gallery) {
        for (let i = 0; i < files.gallery.length; i++) {
            let gallery = await updateFiles(files.gallery[i])
            images.push(gallery)
        }
    }
    images = JSON.stringify(images)
    const update = await updateBOCategoryMd({
        cb_id,
        cb_status,
        parent_id,
        cb_code,
        reference_code,
        cb_title,
        alias,
        cb_description,
        extra_ids,
        updated_user_id,
        investor_id,
        ub_updated_time,
        created_user_id,
        ub_created_time,
        cb_level,
        last_sync_tvc,
        type,
        apartment_grid,
        active_booking,
        enable_list_price,
        send_mail,
        dxmb_project_id,
        image,
        images,
        price_from,
        city_id,
        district_id,
        pj_description,
        address,
        stage,
        price_to,
        ward_id,
        hidden_cat,
        order,
        company_id,
        staff_lock,
        staff_assemble,
        active_assemble,
        total_progress,
        type_project,
        segment,
        type_product,
        juridical,
        keeping_time
    }, {id})
    c.mess = c.MESS.update
}

/**
 * @param p
 * @param c {Controller}
 */
export const getDetailCategories = async ({id}, c) => {
    c.data = await getDetailBOCategoryMd({id})
    c.mess = c.MESS.getData
};

