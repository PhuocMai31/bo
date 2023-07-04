import { ModelBase } from "@config/ModelBase";

class Bo_v2_group_customer extends ModelBase {
    id
    name
    status
    created_at
    deleted_at
    updated_at
    code
}
Bo_v2_group_customer.init("bo_v2_group_customer", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    name: {type: "nvarchar(255)"},
    status: {type: "tinyint(1)"},
    created_at: {type: "datetime"},
    deleted_at: {type: "datetime"},
    updated_at: {type: "datetime"},
    code: {type: "varchar(50)"},
});

/**
 *
 * @param params {Bo_v2_group_customer|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_customer>}
 */
export  const addBoV2GroupCustomerMd = (params, transaction = false)=> {
    return Bo_v2_group_customer.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_group_customer|any}
 * @param where {Bo_v2_group_customer|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_customer>}
 */
export  const updateBoV2GroupCustomerMd = (attr , where ,transaction = false)=> {
    return Bo_v2_group_customer.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_group_customer|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_group_customer[]>}
 */
export  const getListBoV2GroupCustomerMd = ( where,transaction,limit,page,order,group,attr)=> {
    return Bo_v2_group_customer.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_group_customer|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_customer>}
 */
export  const getDetailBoV2GroupCustomerMd = ( where,transaction =false)=> {
    return Bo_v2_group_customer.findItem( where ,transaction)
}/**
 *
 * @param where {Bo_v2_group_customer|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_customer>}
 */
export  const delBoV2GroupCustomerMd = ( where,transaction =false)=> {
    return Bo_v2_group_customer.del( where ,transaction)
}
/**
 *
 * @param where {Bo_v2_group_customer|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_group_customer>}
 */
export  const countBoV2GroupCustomerMd = ( where,transaction =false)=> {
    return Bo_v2_group_customer.count({where, transaction})
}

export default Bo_v2_group_customer;
