import {ModelBase} from "@config/ModelBase";

class Bo_v2_payment_history extends ModelBase {
    id
    bill_id
    total
    type_payment
    image
    deleted_at
    updated_at
    created_at
}

Bo_v2_payment_history.init("bo_v2_payment_history", {

    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    bill_id: {type: "int"},
    total: {type: "bigint"},
    type_payment: {type: "tinyint(1)"},
    image: {type: "nvarchar(255)"},
    deleted_at: {type: "datetime"},
    updated_at: {type: "datetime"},
    created_at: {type: "datetime"},

});

/**
 *
 * @param params {Bo_v2_payment_history|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_payment_history>}
 */
export const addBoV2PaymentHistoryMd = (params, transaction = false) => {
    return Bo_v2_payment_history.create(params, {transaction})
}


/**
 *
 * @param attr {Bo_v2_payment_history|any}
 * @param where {Bo_v2_payment_history|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_payment_history>}
 */
export const updateBoV2PaymentHistoryMd = (attr, where, transaction = false) => {
    return Bo_v2_payment_history.findOneAndUpdate(attr, where, transaction)
}


/**
 *
 * @param where {Bo_v2_payment_history|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_payment_history[]>}
 */
export const getListBoV2PaymentHistoryMd = (where, transaction = false, limit = false, page = false, order = false, group = false, attr = false) => {
    return Bo_v2_payment_history.findArr(where, transaction, limit, page, order, group, attr)
}


/**
 *
 * @param where {Bo_v2_payment_history|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_payment_history>}
 */
export const getDetailBoV2PaymentHistoryMd = (where, transaction = false, attr = false) => {
    return Bo_v2_payment_history.findItem(where, transaction, attr)
}


/**
 *
 * @param where {Bo_v2_payment_history|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export const countBoV2PaymentHistoryMd = (where, transaction = false) => {
    return Bo_v2_payment_history.del({where, transaction})
}


/**
 *
 * @param where {Bo_v2_payment_history|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_payment_history>}
 */
export const delBoV2PaymentHistoryMd = (where, transaction = false, attr = false) => {
    return Bo_v2_payment_history.findItem(where, transaction, attr)
}

export default Bo_v2_payment_history;
