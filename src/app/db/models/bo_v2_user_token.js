
import { ModelBase } from "@config/ModelBase";

class Bo_v2_user_token extends ModelBase {
    id
    client_id
    bundle_id
    user_id
    token
    created_at
    deleted_at
    updated_at
    time_expired
    last_login
    device_name
    location
}
Bo_v2_user_token.init("bo_v2_user_token", {
    id: { type: "int(11)", primaryKey: true, autoIncrement: true },
    client_id: { type: "varchar(150)" },
    bundle_id: { type: "varchar(100)" },
    user_id: { type: "int(11)" },
    token: { type: "varchar(254)", unique: true },
    created_at: { type: "DATETIME" },
    deleted_at: { type: "DATETIME" },
    updated_at: { type: "DATETIME" },
    time_expired: { type: "int(11)" },
    last_login: { type: "DATETIME" },
    device_name: { type: "varchar(254)" },
    location: { type: "varchar(100)" },

});

/**
 *
 * @param params {Bo_v2_user_token|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user_token>}
 */
export  const addBoV2UserTokenMd = (params, transaction = false)=> {
    return Bo_v2_user_token.create(params, {transaction})
}





/**
 *
 * @param attr {Bo_v2_user_token|any}
 * @param where {Bo_v2_user_token|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user_token>}
 */
export  const updateBoV2UserTokenMd = (attr , where ,transaction = false)=> {
    return Bo_v2_user_token.findOneAndUpdate(attr , where,transaction)
}





/**
 *
 * @param where {Bo_v2_user_token|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Bo_v2_user_token[]>}
 */
export  const getListBoV2UserTokenMd = ( where,transaction =false,limit=false,page=false,order=false,group=false,attr=false)=> {
    return Bo_v2_user_token.findArr( where ,transaction,limit,page,order,group,attr)
}



/**
 *
 * @param where {Bo_v2_user_token|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user_token>}
 */
export  const getDetailBoV2UserTokenMd = ( where,transaction =false)=> {
    return Bo_v2_user_token.findItem( where ,transaction)
}



/**
 *
 * @param where {Bo_v2_user_token|any}
 * @param transaction {any}
 * @return {Promise<Bo_v2_user_token>}
 */
export  const delBoV2UserTokenMd = ( where,transaction =false)=> {
    return Bo_v2_user_token.findItem( where ,transaction)
}

export default Bo_v2_user_token;

