import {ModelBase} from "@config/ModelBase";

class B_o_categories extends ModelBase {
    id
    cb_id
    cb_status
    parent_id
    cb_code
    reference_code
    cb_title
    alias
    cb_description
    extra_ids
    updated_user_id
    investor_id
    ub_updated_time
    created_user_id
    ub_created_time
    cb_level
    last_sync_tvc
    type
    apartment_grid
    active_booking
    enable_list_price
    send_mail
    dxmb_project_id
    image
    images
    price_from
    city_id
    district_id
    pj_description
    address
    stage
    hidden_cat
    order
    company_id
    staff_lock
    staff_assemble
    active_assemble
    total_progress
    type_project
    row_table_style
    lock
    assemble
    publication_time
    handover_documents
    type_product
    keeping_time
}

B_o_categories.init("b_o_categories", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    cb_id: {type: "int(11)"},
    cb_status: {type: "tinyint(3)"},
    parent_id: {type: "int(11)"},
    ward_id: {type: "int(11)"},
    cb_code: {type: "varchar(255)"},
    reference_code: {type: "varchar(255)"},
    cb_title: {type: "varchar(255)"},
    alias: {type: "varchar(255)"},
    cb_description: {type: "text"},
    extra_ids: {type: "longtext"},
    updated_user_id: {type: "int(11)"},
    investor_id: {type: "int(11)"},
    ub_updated_time: {type: "timestamp"},
    created_user_id: {type: "int(11)"},
    ub_created_time: {type: "timestamp"},
    cb_level: {type: "tinyint(3)"},
    last_sync_tvc: {type: "timestamp"},
    type: {type: "varchar(255)"},
    apartment_grid: {type: "tinyint(3)"},
    active_booking: {type: "tinyint(3)"},
    enable_list_price: {type: "int(11)"},
    send_mail: {type: "tinyint(3)"},
    dxmb_project_id: {type: "varchar(255)"},
    image: {type: "varchar(255)"},
    images: {type: "longtext"},
    price_from: {type: "varchar(255)"},
    price_to: {type: "varchar(255)"},
    city_id: {type: "int(11)"},
    district_id: {type: "int(11)"},
    pj_description: {type: "longtext"},
    address: {type: "varchar()"},
    stage: {type: "int(11)"},
    hidden_cat: {type: "int(11)"},
    order: {type: "int(11)"},
    company_id: {type: "int(11)"},
    staff_lock: {type: "longtext"},
    staff_assemble: {type: "longtext"},
    active_assemble: {type: "tinyint(3)"},
    total_progress: {type: "int(11)"},
    type_project: {type: "tinyint(3)"},
    row_table_style: {type: "tinyint(11"},
    lock: {type: "tinyint(11)"},
    assemble :{type:"tinyint(11)"},
    publication_time:{type:"datetime"},
    handover_documents:{type:"text"},
    created_at: {type: "datetime"},
    deleted_at: {type: "datetime"},
    updated_at: {type: "datetime"},
    segment : {type : "tinyint(1)"  }	,
    type_product : {type : "tinyint(1)"  }	,
    juridical : {type : "tinyint(1)"  }	,
    keeping_time : {type : "int"  }	,
});

/**
 *
 * @param params {B_o_categories|any}
 * @param transaction {any}
 * @return {Promise<B_o_categories>}
 */
export const addBOCategoryMd = (params, transaction = false) => {
    return B_o_categories.create(params, {transaction})
}


/**
 *
 * @param attr {B_o_categories|any}
 * @param where {B_o_categories|any}
 * @param transaction {any}
 * @return {Promise<B_o_categories>}
 */
export const updateBOCategoryMd = (attr, where, transaction = false) => {
    return B_o_categories.findOneAndUpdate(attr, where, transaction)
}


/**
 *
 * @param where {B_o_categories|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<B_o_categories[]>}
 */
export const getListBOCategoryMd = (where, transaction = false, limit = false, page = false, order = false, group = false, attr = false) => {
    return B_o_categories.findArr(where, transaction, limit, page, order, group, attr)
}


/**
 *
 * @param where {B_o_categories|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<B_o_categories>}
 */
export const   getDetailBOCategoryMd = (where, transaction = false, attr = false) => {
    return B_o_categories.findItem(where, transaction, attr)
}


/**
 *
 * @param where {B_o_categories|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export const countBOCategoryMd = (where, transaction = false) => {
    return B_o_categories.count({where, transaction})
}

export default B_o_categories;
