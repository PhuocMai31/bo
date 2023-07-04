import {ModelBase} from "@config/ModelBase";

class Bo_v2_user extends ModelBase {
    id
    email
    pword
    status
    phone
    username
    calling_code
    phone_status
    email_status
    created_at
    deleted_at
    updated_at
}

Bo_v2_user.init("bo_v2_user", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    email: {type: "varchar(100)"},
    pword: {type: "varchar(254)"},
    status: {type: "tinyint(1)" , defaultValue : 1} ,
    phone: {type: "varchar(15)"},
    username: {type: "varchar(254)"},
    calling_code: {type: "varchar(5)"},
    phone_status: {type: "tinyint(1)"},
    email_status: {type: "tinyint(1)"},
    created_at: {type: "DATETIME"},
    deleted_at: {type: "DATETIME"},
    updated_at: {type: "DATETIME"},

});

/**
 *
 * @param params {Bo_v2_user|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user>}
 */
export const addBoV2UserMd = (params, transaction = false) => {
    return Bo_v2_user.create(params, {transaction})
}


/**
 *
 * @param attr {Bo_v2_user|any}
 * @param where {Bo_v2_user|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user>}
 */
export const updateBoV2UserMd = (attr, where, transaction = false) => {
    return Bo_v2_user.findOneAndUpdate(attr, where, transaction)
}


/**
 *
 * @param where {Bo_v2_user|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_user[]>}
 */
export const getListBoV2UserMd = (where, transaction = false, limit = false, page = false, order = false, group = false, attr = false) => {
    return Bo_v2_user.findArr(where, transaction, limit, page, order, group, attr)
}


/**
 *
 /**
 *
 * @param where {Bo_v2_user|any}
 * @param transaction {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_user>}
 */
export const getDetailBoV2UserMd = (where, transaction = false, attr = false) => {
    return Bo_v2_user.findItem(where, transaction, attr)
}


/**
 *
 * @param where {Bo_v2_user|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user>}
 */
export const delBoV2UserMd = (where, transaction = false) => {
    return Bo_v2_user.del(where, transaction)
}


/**
 *
 * @param where {Bo_v2_user|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user>}
 */
export const countBoV2UserMd = (where, transaction = false) => {
    return Bo_v2_user.count({where,transaction}, )
}


export default Bo_v2_user;

