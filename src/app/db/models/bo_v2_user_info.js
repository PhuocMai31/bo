import { ModelBase } from "@config/ModelBase";

class Bo_v2_user_info extends ModelBase {
    id
    user_id
    full_name
    address
    cmt_number
    cmt_date
    cmt_address
    cmt_province
    cmt_image
    avatar
    birthday
    gender
    created_at
    deleted_at
    updated_at
    cmt_status
    phone_contact
    email_contact
    cb_address
    cmt_expiry
    social_insurance_code
    place_birth
    code_staff
    cb_city_id
    cb_ward_id
    district_id
    city_id
    ward_id
    cb_district_id
    company_id
    position
    exchange_id
}
Bo_v2_user_info.init("bo_v2_user_info", {
    id: { type: "int(11)", primaryKey: true, autoIncrement: true },
    user_id: { type: "int(11)" },
    full_name: { type: "varchar(100)" },
    address: { type: "varchar(254)" },
    cb_address: { type: "varchar(254)" },
    cmt_number: { type: "varchar(50)" },
    cmt_date: { type: "DATETIME" },
    cmt_expiry: { type: "DATETIME" },
    cmt_address: { type: "varchar(254)" },
    cmt_province: { type: "varchar(100)" },
    cmt_image: { type: "varchar(254)" },
    avatar: { type: "varchar(254)" },
    birthday: { type: "DATETIME" },
    gender: { type: "tinyint(1)" },
    created_at: { type: "DATETIME" },
    deleted_at: { type: "DATETIME" },
    updated_at: { type: "DATETIME" },
    cmt_status: { type: "tinyint(1)" },
    phone_contact: { type: "varchar(15)" },
    email_contact: { type: "varchar(100)" },
    city_id : {type : "int(3)"},
    ward_id : {type : "int(3)"},
    cb_district_id : {type : "int(3)"},
    district_id : {type : "int(3)"},
    cb_city_id : {type : "int(3)"},
    cb_ward_id : {type : "int(3)"},
    social_insurance_code : {type : "varchar(50)"},
    place_birth : {type : "varchar(254)"},
    code_staff : {type : "varchar(50)"},
    marital_status : {type : "tinyint(1)"},
    company_id : {type : "int(6)"},
    position : {type : "varchar(255)"},
    exchange_id : {type : "int(11)"},
});

/**
 *
 * @param params {Bo_v2_user_info|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user_info>}
 */
export  const addBov2UserInfoMd = (params, transaction = false)=> {
    return Bo_v2_user_info.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_user_info|any}
 * @param where {Bo_v2_user_info|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user_info>}
 */
export  const updateBoV2UserInfoMd = (attr , where ,transaction = false)=> {
    return Bo_v2_user_info.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_user_info|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_user_info[]>}
 */
export  const getListBoV2UserInfoMd = ( where,transaction =false,limit=false,page=false,order=false,group=false,attr=false)=> {
    return Bo_v2_user_info.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_user_info|any}
 * @param transaction {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_user_info>}
 */
export  const getDetailBoV2UserInfoMd = ( where,transaction =false ,attr =false)=> {
    return Bo_v2_user_info.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_user_info|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user_info>}
 */
export  const delBoV2UserInfoMd = ( where,transaction =false )=> {
    return Bo_v2_user_info.findItem( where ,transaction )
}

/**
 *
 * @param where {Bo_v2_user_info|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user_info>}
 */
export  const deleteBoV2UserInfoMd = ( where,transaction =false )=> {
    return Bo_v2_user_info.del( where ,transaction )
}
export default Bo_v2_user_info;

