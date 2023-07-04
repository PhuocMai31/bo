import {ModelBase} from "@config/ModelBase";

class Ward extends ModelBase{
    id
    name
    gso_id
    district_id
    created_at
    updated_at
    deleted_at
}
Ward.init("wards",{
    id: {type:"int(11)", primaryKey:true, autoIncrement:true},
    name: {type: "varchar(255)"},
    district_id: {type:"int"},
    gso_id: {type:"varchar(255)"},
    created_at: { type: "DATETIME" },
    deleted_at: { type: "DATETIME" },
    updated_at: { type: "DATETIME" },
});

/**
 *
 * @param params {Ward|any}
 * @param transaction {any}
 * @return {Promise<Ward>}
 */
export  const addWardMd = (params, transaction = false)=> {
    return Ward.create(params, {transaction})
}





/**
 *
 * @param attr {Ward|any}
 * @param where {Ward|any}
 * @param transaction {any}
 * @return {Promise<Ward>}
 */
export  const updateWardMd = (attr , where ,transaction = false)=> {
    return Ward.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Ward|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Ward[]>}
 */
export  const getListWardMd = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return Ward.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Ward|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<Ward>}
 */
export  const getDetailWardMd = ( where,transaction =false,attr=false)=> {
    return Ward.findItem( where ,transaction,attr)
}

export default Ward;
