import Bo_v2_group_sale, {
    addBoV2GroupSaleMd, countBoV2GroupSaleMd,
    deleteBoV2GroupSaleMd,
    getDetailBoV2GroupSaleMd, getListBoV2GroupSaleMd,
    updateBoV2GroupSaleMd
} from "@model/bo_v2_group_sale";
import {Op} from "sequelize";
import {addBoV2GroupMemberMd,deleteBoV2GroupMemberMd, getListBoV2GroupMemberMd} from "@model/bo_v2_group_member";
import {validNumber} from "@util";

/**
 * @param p
 * @param c {Controller}
 */
export const getListGroupSale = async ({company_id, exchange_id, status,name}, c) => {
    const where = {}
    if (company_id) where.company_id = company_id
    if (validNumber(status)) where.status = status
    if (exchange_id) where.exchange_id = exchange_id
    if (name) where.name = {[Op.like]: `%${name}%`};
    c.data = await getListBoV2GroupSaleMd(where)
    c.mess = c.MESS.getData
}

/**
 * @param p
 * @param c {Controller}
 */
export const getDetailGroupSale = async ({id},c)=>{
    let user= []
    const groupSale = await getDetailBoV2GroupSaleMd({id})
    let group_sale_id = groupSale.id
    const member = await getListBoV2GroupMemberMd({group_sale_id})
    for (let i = 0; i < member.length; i++) {
        user.push(member[i].user_id)
    }
    c.data = {groupSale,user}
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const addGroupSale = async ({name,desc,company_id,exchange_id,user , code,status},c)=>{
    c.runValid({
        S_name:name,
        N_company_id:company_id,
        N_exchange_id:exchange_id,
        code,
        user
    })
    if(c.v()) return
    user = JSON.parse(user)
    const checkName = await getDetailBoV2GroupSaleMd({name})
    if (checkName){
        c.status = false
        c.mess = "Ten Group da ton tai"
        return
    }
    const checkCode = await getDetailBoV2GroupSaleMd({code})
    if (checkCode){
        c.status = false
        c.mess = "Ma nhom da ton tai"
        return
    }
    const group = await addBoV2GroupSaleMd({name,desc,company_id,exchange_id ,code ,status})
    let group_sale_id = group.id
    for (let i = 0; i < user.length; i++) {
        let user_id =user[i]
        const member = await addBoV2GroupMemberMd({group_sale_id,user_id , company_id , exchange_id})
    }
    c.mess = c.MESS.addData
}

/**
 * @param p
 * @param c {Controller}
 */
export const updateGroupSale = async ({id,name,desc,delete_user,add_user ,code ,status},c)=>{
    const checkGroup = await getDetailBoV2GroupSaleMd({id})
    if(!checkGroup){
        c.status = false
        c.mess="Group khong ton tai"
        return
    }
    if(name){
        let where_name = {id:{[Op.ne]:id},name:name}
        const checkName = await getDetailBoV2GroupSaleMd(where_name)
        if(checkName){
            c.status = false
            c.mess = "Ten Group da ton tai"
            return
        }
    }
    const updateGroup = await updateBoV2GroupSaleMd({name,desc,status},{id})
    let group_sale_id = id
    if (delete_user) {
        delete_user = JSON.parse(delete_user)
        if (delete_user.length > 0) {
            for (let i = 0; i < delete_user[i]; i++) {
                let where_delete = {group_sale_id, user_id: delete_user[i]}
                const deleteMember = await deleteBoV2GroupMemberMd(where_delete  )
            }
        }
    }
    if (add_user) {
        add_user = JSON.parse(add_user)
        if (add_user.length > 0) {
            for (let i = 0; i < add_user.length; i++) {
                let user_id = add_user[i]
                const addMember = await addBoV2GroupMemberMd({group_sale_id, user_id , exchange_id : checkGroup.exchange_id , company_id : checkGroup.company_id})
            }
        }
    }
    c.mess = c.MESS.update
}

/**
 * @param p
 * @param c {Controller}
 */
export const deleteGroupSale = async ({id},c)=>{
    const checkGroup = await getDetailBoV2GroupSaleMd({id})
    if(!checkGroup){
        c.status = false
        c.mess = "Nhom khong ton tai"
        return
    }
    const deleteGroup = await deleteBoV2GroupSaleMd({id})
    let group_sale_id=checkGroup.id
    const deleteMember = await deleteBoV2GroupMemberMd({group_sale_id})
    c.mess = c.MESS.delete
}

/**
 * @param p
 * @param c {Controller}
 */
export  const countGroupSale =async ({company_id, exchange_id, name} , c)=> {
    const where = {}
    if (company_id) where.company_id = company_id
    if (exchange_id) where.exchange_id = exchange_id
    if (name) where.name = {[Op.like]: `%${name}%`};
    c.data = await countBoV2GroupSaleMd(where)
}


