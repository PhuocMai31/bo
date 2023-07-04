import {
    updateUser,
    getListCityUsers,
    getDetailUserMd, countUsersMd,
    addUser, addUserMd, findUserMd
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