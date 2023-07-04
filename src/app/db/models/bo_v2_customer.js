import { ModelBase } from "@config/ModelBase";

class Bo_v2_customer extends ModelBase {
    id
    category_id
    user_id_sale
    city_id
    district_id
    ward_id
    cb_city_id
    cb_district_id
    cb_ward_id
    country
    code_area
    birthday
    sex
    customer_code
    cmt_full_name
    full_name
    phone
    email
    note
    create_date
    create_by
    address
    cb_address
    interactive_status
    create_type
    /**
     * @type {1,2,3} 1 chư phân bổ , 2 đã phân bổ , 3 đã chăm sóc , 4 đã thu hồi
     */
    status_allocation
    cmt_number
    source_id
    group_customer_id
    created_at
    deleted_at
    updated_at
    cmt_date
    cmt_address
    interactive_form
    images
    final_time_care
    campaign_id
}
Bo_v2_customer.init("bo_v2_customer", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    category_id: {type: "int(11)"},
    user_id_sale: {type: "int(11)"},
    city_id: {type: "int(11)"},
    district_id: {type: "int(11)"},
    ward_id: {type: "int(11)"},
    cb_city_id: {type: "int(11)"},
    cb_district_id: {type: "int(11)"},
    cb_ward_id: {type: "int(11)"},
    country: {type: "varchar(100)", defaultValue : "viet_nam"},
    code_area: {type: "varchar(4)"},
    birthday: {type: "datetime"},
    sex: {type: "tinyint(1)"},
    customer_code: {type: "nvarchar(20)"},
    cmt_full_name: {type: "nvarchar(255)"},
    full_name: {type: "nvarchar(255)"},
    phone: {type: "nvarchar(20)"},
    email: {type: "nvarchar(255)"},
    note: {type: "text"},
    create_date: {type: "datetime"},
    create_by: {type: "int(11)"},
    address: {type: "nvarchar(255)"},
    cb_address: {type: "nvarchar(255)"},
    interactive_status: {type: "tinyint(1)"},
    interactive_form: {type: "tinyint(1)"},
    create_type: {type: "tinyint(1)" , defaultValue : 1},
    status_allocation: {type: "tinyint(1)"},
    cmt_number: {type: "nvarchar(50)"},
    source_id: {type: "int(11)"},
    campaign_id: {type: "int(11)"},
    group_customer_id: {type: "int(11)"},
    created_at: {type: "datetime"},
    deleted_at: {type: "datetime"},
    updated_at: {type: "datetime"},
    images : {type: "text"},
    cmt_date : {type: "datetime"},
    cmt_address : {type: "nvarchar(255)"},
    final_time_care : {type: "datetime"},
});

/**
 *
 * @param params {Bo_v2_customer|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_customer>}
 */
export  const addBoV2CustomerMd = (params, transaction = false)=> {
    return Bo_v2_customer.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_customer|any}
 * @param where {Bo_v2_customer|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_customer>}
 */
export  const updateBoV2CustomerMd = (attr , where ,transaction = false)=> {
    return Bo_v2_customer.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_customer|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_customer[]>}
 */
export  const getListBoV2CustomerMd = ( where,transaction =false,limit  =false,page  =false,order  =false,group  =false,attr =false)=> {
    return Bo_v2_customer.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_customer|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_customer>}
 */
export  const getDetailBoV2CustomerMd = ( where,transaction =false)=> {
    return Bo_v2_customer.findItem( where ,transaction)
}


/**
 *
 * @param where {Bo_v2_customer|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_customer>}
 */
export  const countBoV2CustomerMd = ( where,transaction =false)=> {
    return Bo_v2_customer.count({ where ,transaction} ,)
}

/**
 *
 * @param where {Bo_v2_user|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user>}
 */
export const deleteBoV2CustomerMd = (where, transaction = false) => {
    return Bo_v2_customer.del(where, transaction)
}
export default Bo_v2_customer;
