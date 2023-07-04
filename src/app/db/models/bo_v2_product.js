import {ModelBase} from "@config/ModelBase";

class Bo_v2_product extends ModelBase {
    id
    code
    cdt_code
    company_id
    p_status
    type
    status
    floor
    location
    apartment_number
    lot_number
    road
    bedroom
    toilet
    direction
    balcony_direction
    view
    corner_unit
    dt_thong_thuy
    dt_tim_tuong
    dt_san_vuon
    gia_thong_thuy
    gia_tim_tuong
    gia_san
    gia_tran
    service_price
    gia_niem_yet
    gi_chu_niem_yet
    gia_ban_chua_vat
    don_gia_co_vat
    don_gia_chua_vat
    thue_vat
    maintain_price
    stage
    loai_dat_cho
    total
    lock_member
    open_sale
    note
    building_id
    category_id
    cart_id
    updated_at
    created_at
    deleted_at
}

Bo_v2_product.init("bo_v2_product", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    code: {type: "varchar"},
    cdt_code: {type: "varchar"},
    company_id: {type: "int"},
    p_status: {type: "nvarchar(20)"},
    type: {type: "nvarchar"},
    status: {type: "int"},
    floor: {type: "int"},
    location:{type:"varchar(255)"},
    apartment_number:{type:"int"},
    lot_number: {type: "int"},
    road: {type: "float(11,2)"},
    bedroom: {type: "int"},
    toilet: {type: "int"},
    direction: {type: "nvarchar(40)"},
    balcony_direction: {type: "nvarchar(40)"},
    view: {type: "nvarchar(255)"},
    corner_unit: {type: "int"},
    dt_thong_thuy: {type: "float(11,2)"},
    dt_tim_tuong: {type: "float(11,2)"},
    dt_san_vuon: {type: "float(11,2)"},
    gia_thong_thuy: {type: "bigint"},
    gia_tim_tuong: {type: "bigint"},
    gia_san: {type: "bigint"},
    gia_tran: {type: "bigint"},
    service_price:{type:"bigint"},
    gia_niem_yet: {type: "bigint"},
    gi_chu_niem_yet: {type: "nvarchar(255)"},
    gia_ban_chua_vat: {type: "bigint"},
    don_gia_co_vat: {type: "bigint"},
    don_gia_chua_vat: {type: "bigint"},
    thue_vat: {type: "bigint"},
    maintain_price: {type: "bigint"},
    stage: {type: "tinyint"},
    loai_dat_cho: {type: "tinyint"},
    total: {type: "bigint"},
    lock_member: {type: "tinyint"},
    open_sale: {type: "tinyint"},
    note: {type: "text"},
    building_id: {type: "int"},
    category_id: {type: "int"},
    cart_id:{type:"int"},
    updated_at: {type: "datetime"},
    created_at: {type: "datetime"},
    deleted_at: {type: "datetime"}

});

/**
 *
 * @param params {Bo_v2_product|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_product>}
 */
export const addBoV2ProductMd = (params, transaction = false) => {
    return Bo_v2_product.create(params, {transaction})
}


/**
 *
 * @param attr {Bo_v2_product|any}
 * @param where {Bo_v2_product|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_product>}
 */
export const updateBoV2ProductMd = (attr, where, transaction = false) => {
    return Bo_v2_product.findOneAndUpdate(attr, where, transaction)
}


/**
 *
 * @param where {Bo_v2_product|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_product[]>}
 */
export const getListBoV2ProductMd = (where, transaction = false, limit = false, page = false, order = false, group = false, attr = false) => {
    return Bo_v2_product.findArr(where, transaction, limit, page, order, group, attr)
}


/**
 *
 * @param where {Bo_v2_product|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_product>}
 */
export const getDetailBoV2ProductMd = (where, transaction = false, attr = false) => {
    return Bo_v2_product.findItem(where, transaction, attr)
}


/**
 *
 * @param where {Bo_v2_product|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export const countBoV2ProductMd = (where, transaction = false) => {
    return Bo_v2_product.count({where, transaction})
}

export default Bo_v2_product;
