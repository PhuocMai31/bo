import { ModelBase } from "@config/ModelBase";

class Bo_v2_payment_info extends ModelBase {
    id
    bank_number
    account_holder
    short_name
    bin
    bank_name
    status
    type_payment
    deleted_at
    updated_at
    created_at
}
Bo_v2_payment_info.init("bo_v2_payment_info", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    bank_number :{type :"varchar(100)"},
    account_holder :{type :"varchar(255)"},
    short_name :{type :"varchar(50)"},
    bin :{type :"varchar(50)"},
    bank_name :{type :"varchar(255)"},
    status : { type : "tinyint"  ,defaultValue : 1},
    type_payment : { type : "nvarchar(10)"  },
    deleted_at :{type :"datetime"},
    updated_at :{type :"datetime"},
    created_at :{type :"datetime"},

});

/**
 *
 * @param params {Bo_v2_payment_info|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_payment_info>}
 */
export  const addBoV2PaymentInfoMd = (params, transaction = false)=> {
    return Bo_v2_payment_info.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_payment_info|any}
 * @param where {Bo_v2_payment_info|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_payment_info>}
 */
export  const updateBoV2PaymentInfoMd = (attr , where ,transaction = false)=> {
    return Bo_v2_payment_info.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_payment_info|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_payment_info[]>}
 */
export  const getListBoV2PaymentInfoMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_payment_info.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_payment_info|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_payment_info>}
 */
export  const getDetailBoV2PaymentInfoMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_payment_info.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_payment_info|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2PaymentInfoMd = ( where,transaction =false )=> {
    return Bo_v2_payment_info.count( {where,transaction} )
}



/**
 *
 * @param where {Bo_v2_payment_info|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_payment_info>}
 */
export  const delBoV2PaymentInfoMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_payment_info.findItem( where ,transaction ,attr)
}

export default Bo_v2_payment_info;

