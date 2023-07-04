import { ModelBase } from "@config/ModelBase";

class Bo_v2_investor extends ModelBase {
    id
    code
    name
    status
    created_at
    updated_at
    deleted_at
}
Bo_v2_investor.init("bo_v2_investor", {
    id: {type: "int(11)", primaryKey: true, autoIncrement: true},
    code : {type : "varchar(50)"},
    name : {type : "varchar(255)"},
    status : {type : "tinyint" , defaultValue : 1},
    created_at : {type : "datetime"},
    updated_at : {type : "datetime"},
    deleted_at : {type : "datetime"},

});

/**
 *
 * @param params {Bo_v2_investor|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_investor>}
 */
export  const addBoV2InvestorMd = (params, transaction = false)=> {
    return Bo_v2_investor.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_investor|any}
 * @param where {Bo_v2_investor|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_investor>}
 */
export  const updateBoV2InvestorMd = (attr , where ,transaction = false)=> {
    return Bo_v2_investor.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_investor|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_investor[]>}
 */
export  const getListBoV2InvestorMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Bo_v2_investor.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_investor|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_investor>}
 */
export  const getDetailBoV2InvestorMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_investor.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {Bo_v2_investor|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countBoV2InvestorMd = ( where,transaction =false )=> {
    return Bo_v2_investor.count( {where,transaction} )
}



/**
 *
 * @param where {Bo_v2_investor|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Bo_v2_investor>}
 */
export  const delBoV2InvestorMd = ( where,transaction =false , attr =false)=> {
    return Bo_v2_investor.del(where ,transaction ,attr)
}

export default Bo_v2_investor;
