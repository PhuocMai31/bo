import Bo_v2_exchange, {
    addBoV2ExchangeMd, countBoV2ExchangeMd,
    deleteBoV2ExchangeMd,
    getDetailBoV2ExchangeMd, getListBoV2ExchangeMd,
    updateBoV2ExchangeMd
} from "@model/bo_v2_exchange";
import {Op, where} from "sequelize";

import {
    addBoV2PermissionGroupMemberMd,
    getListBoV2PermissionGroupMemberMd,
    updateBoV2PermissionGroupMemberMd
} from "@model/bo_v2_permission_group_member";
import {addLogRp} from "@lib";
import {validNumber} from "@util";
import {countBoV2GroupSaleMd, getListBoV2GroupSaleMd} from "@model/bo_v2_group_sale";
import {getListBoV2GroupMemberMd} from "@model/bo_v2_group_member";

/**
 * @param p
 * @param c {Controller}
 */
export const getListExchange = async ({status, company_id, name, limit, page}, c) => {
    console.log(c.user_id)
    let where = {}
    if (company_id) {
        where.company_id = company_id
    }
    if (name) {
        where.name = {[Op.like]: `%${name}%`}
    }
    if (validNumber(status)) {
        where.status = status
    }
    c.data = await getListBoV2ExchangeMd(where, false, limit, page)
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const getListExchangeOrGroup = async ({}, c) => {
    let listExchangeId = []
    let listGroupId = []
    const groupMember = await getListBoV2PermissionGroupMemberMd({user_id: c.user_id})
    for (const boV2GroupMember of groupMember) {
        switch (boV2GroupMember.staff_object_id) {
            case "giamdocsan" || "truongphong":
                listExchangeId.push(boV2GroupMember.scope_id)
                break;
            case "truongnhom":
                listGroupId.push(boV2GroupMember.scope_id)
                break;
            default:
                break;
        }
    }
    if (listExchangeId.length>0){
        c.data = await getListBoV2ExchangeMd({id:{[Op.in]:listExchangeId}})
        c.mess=c.MESS.getData
        return
    }
    if (listGroupId.length>0){
        c.data = await getListBoV2GroupSaleMd({id:{[Op.in]:listGroupId}})
        c.mess=c.MESS.getData
    }
}
/**
 * @param p
 * @param c {Controller}
 */
export const countExchange = async ({company_id, name}, c) => {
    let where = {}
    if (company_id) where.company_id = company_id;
    if (name) {
        where.name = {[Op.like]: `%${name}%`}
    }
    c.data = await countBoV2ExchangeMd(where)
    c.mess = c.MESS.getData
}

/**
 * @param p
 * @param c {Controller}
 */
export const getDetailExchange = async ({id}, c) => {
    c.data = await getDetailBoV2ExchangeMd({id})
    c.mess = c.MESS.getData
}

/**
 * @param p
 * @param c {Controller}
 */
export const addExchange = async ({
                                      name,
                                      desc,
                                      company_id,
                                      code,
                                      address,
                                      parent_id,
                                      status,
                                      date_inactive,
                                      date_active,
                                      user_id_representative,
                                      phone_contact
                                  }, c) => {
    addLogRp("addExchange", {
        name,
        desc,
        company_id,
        code,
        address,
        parent_id,
        status
    });
    c.runValid({
        S_name: name, code,
        N_company_id: company_id,
        D0_date_inactive: date_inactive,
        D0_date_active: date_active,
    })
    c.runValidAlNull({phone: phone_contact})
    if (c.v()) return
    const checkExchange = await getDetailBoV2ExchangeMd({name})
    const checkCode = await getDetailBoV2ExchangeMd({code})
    if (checkExchange) {
        c.status = false
        c.mess = "San da ton tai"
        return
    }
    if (checkCode) {
        c.status = false
        c.mess = "Ma phong da ton tai"
        return
    }
    const addExchange = await addBoV2ExchangeMd({
        name,
        desc,
        company_id,
        code,
        address,
        parent_id,
        user_id_representative,
        date_active,
        date_inactive,
        phone_contact
    })
    let exchange_id = addExchange.id
    if (user_id_representative) {
        const addPermissionGroupMember = await addBoV2PermissionGroupMemberMd({
            user_id: user_id_representative,
            status: 1,
            company_id,
            exchange_id,
            staff_object_id: "truongphong"
        })
    }
    c.data = addExchange
    c.mess = c.MESS.addData
}

/**
 * @param p
 * @param c {Controller}
 */
export const updateExchange = async ({
                                         id, name, desc, company_id, code, address, parent_id,
                                         date_inactive,
                                         date_active,
                                         user_id_representative,
                                         phone_contact, status

                                     }, c) => {
    addLogRp("updateExchange", {
        id, name, desc, company_id, code, address, parent_id, date_inactive,
        date_active
    })
    c.runValid({
        D0_date_inactive: date_inactive,
        D0_date_active: date_active,
    })
    if (c.v()) return
    const checkExchange = await getDetailBoV2ExchangeMd({id})
    if (checkExchange) {
        const countGroup = await countBoV2GroupSaleMd({exchange_id: checkExchange.id,})
        if (countGroup > 0 && company_id) {
            c.mess = "Phòng ban đã có dữ liệu nhóm không thể cập nhập lại công ty"
            c.status = false
            return
        }
        let where_name = {company_id: checkExchange.company_id}
        let where_code = {company_id: checkExchange.company_id}
        if (name) {
            where_name.name = name
            const checkName = await getDetailBoV2ExchangeMd(where_name)
            if (checkName) {
                c.status = false
                c.mess = "san da ton tai"
                return
            }
        }
        if (code) {
            where_code.code = code
            const checkCode = await getDetailBoV2ExchangeMd(where_code)
            if (checkCode) {
                c.status = false
                c.mess = "Ma phong da ton tai"
                return
            }
        }


        await updateBoV2ExchangeMd({
            name,
            company_id,
            desc,
            code,
            address,
            parent_id,
            date_inactive,
            date_active,
            user_id_representative,
            phone_contact, status
        }, {id})
        if (user_id_representative) {
            if (checkExchange.user_id_representative)
                await updateBoV2PermissionGroupMemberMd({user_id: user_id_representative, company_id}, {
                    exchange_id: id,
                    user_id: checkExchange.user_id_representative
                })
            else {
                await addBoV2PermissionGroupMemberMd({
                    user_id: user_id_representative,
                    status: 1,
                    company_id,
                    exchange_id: id,
                    staff_object_id: "truongphong"
                })
            }
        }
        c.mess = c.MESS.update
    } else {
        c.status = false
        c.mess = "San khong ton tai"
    }
}

/**
 * @param p
 * @param c {Controller}
 */
export const deleteExchange = async ({id}, c) => {
    const checkExchange = await getDetailBoV2ExchangeMd({id})
    if (!checkExchange) {
        c.status = false
        c.mess = "San khong ton tai"
    } else {
        const exchangeDelete = await deleteBoV2ExchangeMd({id})
        c.status = true
        c.mess = c.MESS.delete
    }
}
