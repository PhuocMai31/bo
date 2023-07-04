import {ModelBase} from "@config/ModelBase";

class City extends ModelBase{
    id
    code
    name
    type
    created_at
    updated_at
    deleted_at
}
City.init("cities",{
    id: {type:"int(11)", primaryKey:true, autoIncrement:true},
    code: {type: "varchar(20)"},
    name: {type:"varchar(191)"},
    type: {type:"varchar(191)"},
    created_at: { type: "DATETIME" },
    updated_at: { type: "DATETIME" },
    deleted_at:{ type: "DATETIME" }
})


/**
 *
 * @param params {City|any}
 * @param transaction {any}
 * @return {Promise<City>}
 */
export  const addCityMd = (params, transaction = false)=> {
    return City.create(params, {transaction})
}





/**
 *
 * @param attr {City|any}
 * @param where {City|any}
 * @param transaction {any}
 * @return {Promise<City>}
 */
export  const updateCityMd = (attr , where ,transaction = false)=> {
    return City.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {City|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<City[]>}
 */
export  const getListCityMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return City.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {City|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<City>}
 */
export  const getDetailCityMd = ( where,transaction =false , attr =false)=> {
    return City.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {City|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countCityMd = ( where,transaction =false )=> {
    return City.count( {where,transaction} )
}


export default City;
