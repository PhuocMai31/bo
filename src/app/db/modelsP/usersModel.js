import {ModelBase} from "@config/ModelBase";
import {
    findDataWithFieldandBetween,
    findDataWithTime,
    transformConditionToQuery
} from "@controller/controllerP/function";
import req from "express/lib/request";
import {Op} from "sequelize";
import Bo_v2_work_group from "@model/bo_v2_work_group";
import Bo_v2_user_info from "@model/bo_v2_user_info";

class UsersModel extends ModelBase{
    id
    name
    age
    address
    created_at
    updated_at
    deleted_at
}
UsersModel.init("users",{
    id: {type:"int(11)", primaryKey:true, autoIncrement:true},
    name: {type:"varchar(191)"},
    age: {type:"number(11)"},
    address: {type:"varchar(191)"},
    created_at: { type: "DATETIME" },
    updated_at: { type: "DATETIME" },
    deleted_at:{ type: "DATETIME" }
})


// int
// varchar
// datetime to_ ${ten column} ,  from_ ${ten column}
/**
 *
 * @param params {City|any}
 * @param transaction {any}
 * @return {Promise<City>}
 */
export  const addUserMd = (params, transaction = false)=> {
    // console.log(params)
    return UsersModel.create(params, {transaction})
}

// export  const findUserMd = (body)=> {
//     return  findDataWithFieldandBetween(UsersModel, body.field, body.valueStartOfField, body.valueEndOfField);
// }
// const where = { $to_age : 10 , $end_age : 20 ,$to_birday : "2022-01-02 00:00:00" ,  $like_name : "nam"}

export  const findUserMd = (body)=> {
    // const where1 = [{ $to_age: 20, $end_age: 23}, {$to_created_at: "2023-07-03 00:00:00", $end_created_at: "2023-07-04 00:00:00" }];
    const where1 = { $to_age : 21 , $end_age : 23 ,$to_created_at: "2023-07-03", $end_created_at: "2023-07-05T12:34:56.789Z"  }
    const where2 ={
        age: 22,
        $end_created_at: "2023-07-05T12:34:56.789Z"
    }
    const where3 ={
        age: 22,
        id: { [Op.between]: [ 1, 2 ] }
    }
    const where4 = {
        age: [21, 22],
        id: { [Op.between]: [ 1, 2 ] }
    }
    const where5 = {
        $to_age : 21 ,$to_created_at: "2023-07-03", $end_created_at: "2023-07-05T12:34:56.789Z"
    }
    const where6 ={
        age: [21, 22],
        $to_created_at: "2023-07-05T12:34:56.789Z"
    }
    const whereT = {
        age: {
            [Op.gte]: 21
        },
        id: { [Op.between]: [ 1, 2 ] }
    }
    const where = transformConditionToQuery(where6)
    console.log(where,777)
    return UsersModel.findArr(where)
}

export  const findUser = (body)=> {
    return UsersModel.findOneAndUpdate(attr , where,transaction)
}





// export function parseWhere(where){
//     let condition = {}
//     Object.keys(where).forEach(value=> {
//         condition.(value.split("_"))
//     })
// }

export function parseWhere(where){
    const extractedValues = {};

    for (const key in where) {
        if (key.startsWith("$to_") || key.startsWith("$like_")) {
            const value = where[key];
            const extractedValue = value.substring(4); // Lấy phần tử sau 4 kí tự đầu tiên
            extractedValues[key] = extractedValue;
        }
    }
    return extractedValues
}
// export  const getDetailBoV2WorkGroupMd = ( where,transaction =false)=> {
//     const where2 = {age :{[Op.and] : [{[Op.gt] : 1 }, {[Op.lt] : 20 }]}}
//     return Bo_v2_work_group.findItem( where2 ,transaction)
// }
// getDetailBoV2WorkGroupMd([{$to_age :1 , $end_age : 20}])



/**
 *
 * @param attr {City|any}
 * @param where {City|any}
 * @param transaction {any}
 * @return {Promise<City>}
 */
export  const updateUser = (attr , where ,transaction = false)=> {
    return UsersModel.findOneAndUpdate(attr , where,transaction)
}





// /**
//  *
//  * @param where {City|any}
//  * @param transaction {any}
//  * @param limit {any}
//  * @param page {any}
//  * @param order {any}
//  * @param group {any}
//  * @param attr {any}
//  * @return {Promise<City[]>}
//  */

export  const getListUser = ( where,transaction=false,limit=false,page=false,order=false,group=false,attr =false)=> {
    return UsersModel.findArr( where ,transaction,limit,page,order,group,attr)
}





/**
 *
 * @param where {City|any}
 * @param transaction {any}
 * @param attr {[]|any}
 * @return {Promise<City>}
 */
export  const getDetailUserMd = ( where,transaction =false , attr =false)=> {
    return UsersModel.findItem( where ,transaction ,attr)
}



/**
 *
 * @param where {City|any}
 * @param transaction {any}
 * @return {Promise<Number>}
 */
export  const countUsersMd = ( where,transaction =false )=> {
    return UsersModel.count( {where,transaction} )
}


export default UsersModel;
