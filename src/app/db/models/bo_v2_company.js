import { ModelBase } from "@config/ModelBase";

class Bo_v2_company extends ModelBase {
    id
    name
    desc
    code
    status
    parent_id
    address
    code_in
    code_enterprise
    code_tax
    date_code
    address_code
    hotline
    fax
    email
    website
    created_at
    deleted_at
    updated_at
    user_id_representative
    phone_contact
    avatar
}
Bo_v2_company.init("bo_v2_company", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    name: {type: "varchar(255)"},
    desc: {type: "varchar(255)"},
    code: {type:"varchar"},
    status: {type:"tinyint",default:1},
    parent_id: {type:"int"},
    address: {type:"varchar"},
    code_in: {type:"varchar"},
    code_enterprise: {type:"varchar"},
    code_tax: {type:"varchar"},
    date_code: {type:"DATETIME"},
    address_code: {type:"varchar"},
    hotline: {type:"varchar"},
    fax: {type:"varchar(254)"},
    email: {type:"varchar(254)"},
    website: {type:"varchar(254)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},
    user_id_representative: {type : "int(11)"},
    phone_contact: { type: "varchar(20)"},
    avatar: { type: "varchar(255)"},
},{}, true);

/**
 *
 * @param params {Bo_v2_company|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_company>}
 */
export  const addBoV2CompanyMd = (params, transaction = false)=> {
    return Bo_v2_company.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_company|any}
 * @param where {Bo_v2_company|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_company>}
 */
export  const updateBoV2CompanyMd = (attr , where ,transaction = false)=> {
    return Bo_v2_company.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_company|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_company[]>}
 */
export  const getListBoV2CompanyMd = ( where,transaction,limit,page,order,group,attr)=> {
    return Bo_v2_company.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_company|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_company>}
 */
export  const getDetailBoV2CompanyMd = ( where,transaction =false)=> {
    return Bo_v2_company.findItem( where ,transaction)
}

/**
 *
 * @param where {Bo_v2_user|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user>}
 */
export const countBoV2CompanyMd = (where, transaction = false) => {
    return Bo_v2_company.count({where,transaction}, )
}

/**
 *
 * @param where {Bo_v2_user_info|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user_info>}
 */
export  const deleteBoV2CompanyMd = ( where,transaction =false )=> {
    return Bo_v2_company.del( where ,transaction )
}
export default Bo_v2_company;


