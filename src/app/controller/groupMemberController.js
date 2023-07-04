import {
    addBoV2GroupMemberMd,
    deleteBoV2GroupMemberMd,
    getDetailBoV2GroupMemberMd, getListBoV2GroupMemberMd,
    updateBoV2GroupMemberMd
} from "@model/bo_v2_group_member";
import {getInfoUserRp} from "@repository";
import {Op} from "sequelize";
import {getDetailBoV2GroupSaleMd, getListBoV2GroupSaleMd} from "@model/bo_v2_group_sale";
import {getDetailBoV2UserInfoMd} from "@model";
import {getDetailGroupSale} from "@controller/groupSaleController";

/**
 * @param p
 * @param c {Controller}
 */
export const addSale = async ({group_sale_id, user_id}, c) => {
    c.runValidOr({
        N_user_id: user_id,
        N_group_sale_id: group_sale_id
    })
    if (c.v()) return
    const groupSale = await getDetailBoV2GroupSaleMd({id: group_sale_id})
    if (groupSale) {
        c.mess = "Không tìm nhóm sale"
        c.status = false
        return
    }

    const sale = await addBoV2GroupMemberMd({
        group_sale_id,
        user_id,
        exchange_id: groupSale.exchange_id,
        company_id: groupSale.company_id
    })
    c.mess = c.MESS.addData
}

/**
 * @param p
 * @param c {Controller}
 */
export const updateSale = async ({group_sale_id, user_id}, c) => {
    const checkMember = await getDetailBoV2GroupMemberMd({id})
    if (checkMember) {
        const memberSale = await updateBoV2GroupMemberMd({group_sale_id, user_id}, {id})
        c.mess = c.MESS.update
    } else {
        c.status = false
        c.mess = "Sale khong ton tai"
    }
}

/**
 * @param p
 * @param c {Controller}
 */
export const deleteSale = async ({id}, c) => {
    const checkMember = await getDetailBoV2GroupMemberMd({id})
    if (!checkMember) {
        c.status = false
        c.mess = "Sale khong ton tai"
    } else {
        const memberSale = await deleteBoV2GroupMemberMd({}, {id})
        c.status = true
        c.mess = c.MESS.delete
    }
}

/**
 *
 * @param p
 * @param c {Controller}
 */
export const getListGroupMember = async ({exchange_id}, c) => {
    const where = {}
    if (exchange_id) {
        const listGroup = await getListBoV2GroupSaleMd({exchange_id})
        where.group_sale_id = {[Op.in]: listGroup.map((value) => value.id)}
    }
    const members = await getListBoV2GroupMemberMd(where)
    for (let member of members) {
        const info = await getDetailBoV2UserInfoMd({user_id: member.user_id})
        member.full_name = info?.full_name || ""
        member.code_staff = info?.code_staff || ""
        member.exchange_id = info?.exchange_id || ""
    }
    c.data = members
    c.mess = c.MESS.getData
}
/**
 *
 * @param p
 * @param c {Controller}
 */
export const getDetailGroupMember = async ({id}, c) => {
    const where = {id}
    c.data = await getDetailBoV2GroupMemberMd({id})

}



