import {
    updateUser,
    getListCityUsers,
    getDetailUserMd, countUsersMd,
    addUser, addUserMd, findUserMd, upDateUserMd
} from '../../db/modelsP/usersModel'
import {findDataWithFieldandBetween} from "@controller/controllerP/function";


export const addUserP = async function (req, res, next) {
    try {
        const user = await addUserMd(req.body)
        res.send("hi")
    } catch (error) {
        console.log(error)
    }
}

export const findUserP = async function (req, res, next) {
    try {
        console.log(req.body)
        const user = await findUserMd(req.body)
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const cacheIDp = async function (req, res, next) {
    try {
        const user = await getDetailUserMd()
        res.json(user)
    } catch (error) {
        console.log(error)
    }
}

export const updateIDp = async function(req,res){
    try {
        const userUpdate = await upDateUserMd(req.body)
        res.send("update")
    } catch (error){
        console.log(error)
    }
}

// export const updateUser = async function(req,res){
//     try {
//         const userUpdate = await updateUser(req.body)
//         res.send("update")
//     } catch (error){
//         console.log(error)
//     }
// }