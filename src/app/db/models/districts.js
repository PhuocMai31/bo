import {ModelBase} from "@config/ModelBase";

class Districts extends ModelBase{
    id
    name
    gso_id
    province_id
    created_at
    updated_at
    deleted_at
}
Districts.init("districts",{
    id: {type:"int(11)", primaryKey:true, autoIncrement:true},
    name: {type: "varchar(255)"},
    gso_id: {type:"varchar(255)"},
    province_id: {type:"int"},
    created_at: { type: "DATETIME" },
    deleted_at: { type: "DATETIME" },
    updated_at: { type: "DATETIME" },
});

/**
 *
 * @param params {Districts|any}
 * @param transaction {any}
 * @return {Promise<Districts>}
 */
export  const addDistrictsMd = (params, transaction = false)=> {
    return Districts.create(params, {transaction})
}





/**
 *
 * @param attr {Districts|any}
 * @param where {Districts|any}
 * @param transaction {any}
 * @return {Promise<Districts>}
 */
export  const updateDistrictsMd = (attr , where ,transaction = false)=> {
    return Districts.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Districts|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Districts[]>}
 */
export  const getListDistrictsMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Districts.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Districts|any}
 * @param transaction {any}
 * @param attr {[], any}
 * @return {Promise<Districts>}
 */
export  const getDetailDistrictsMd = ( where,transaction =false,attr= false)=> {
    return Districts.findItem( where ,transaction,attr)
}

export default Districts;
