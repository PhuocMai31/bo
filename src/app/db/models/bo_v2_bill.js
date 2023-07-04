import { ModelBase } from "@config/ModelBase";

class Bo_v2_bill extends ModelBase {
    id
    parent_id
    status
    title
    code
    user_sale_id
    note
    type
    deleted_at
    updated_at
    created_at
    customer_id
    product_id
    campaign_sale_id
    category_id
    building_id
    file
    opt
    wish
    info_customer
}
Bo_v2_bill.init("bo_v2_bill", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    parent_id : {type : "int" ,defaultValue : 0},
    status : {type : "tinyint(1)" , defaultValue:  1},
    title : {type : "nvarchar(255)"},
    code : {type : "nvarchar(50)"},
    user_sale_id : {type : "int"},
    note : {type : "text"},
    type : {type : "tinyint"},
    deleted_at : {type : "datetime"},
    updated_at : {type : "datetime"},
    created_at : {type : "datetime"},
    customer_id : {type : "int"},
    product_id : {type : "int"},
    campaign_sale_id : {type : "int"},
    category_id : {type : "int"},
    building_id : {type : "int"},
    file : {type : "nvarchar(255)"},
    opt : {type : "nvarchar(20)"},
    wish : {type : "nvarchar(255)"},
    info_customer : {type : "longtext"}
});

/**
 *
 * @param params {Bo_v2_bill|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_bill>}
 */
export  const addBoV2BillMd = (params, transaction = false)=> {
    return Bo_v2_bill.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_bill|any}
 * @param where {Bo_v2_bill|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_bill>}
 */
export  const updateBoV2BillMd = (attr , where ,transaction = false)=> {
    return Bo_v2_bill.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_bill|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_bill[]>}
 */
export  const getListBoV2BillMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_bill.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_bill|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_bill>}
 */
export  const getDetailBoV2BillMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_bill.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_bill|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2BillMd = ( where,transaction =false )=> {
    return Bo_v2_bill.count( {where,transaction} )
}



/**
 *
 * @param where {Bo_v2_bill|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_bill>}
 */
export  const delBoV2BillMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_bill.findItem( where ,transaction ,attr)
}

export default Bo_v2_bill;
