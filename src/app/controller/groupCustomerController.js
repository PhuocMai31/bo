import Bo_v2_group_customer, {
    addBoV2GroupCustomerMd,
    countBoV2GroupCustomerMd,
    getDetailBoV2GroupCustomerMd,
    updateBoV2GroupCustomerMd,
    delBoV2GroupCustomerMd
} from "@model/bo_v2_group_customer";
import {validNumber} from "@util";
import {getListBoV2CustomerMd} from "@model";

/**
 * @param p
 * @param c {Controller}
 */
export const getListGroupCustomer = async (p, c) => {
    const where = {}
    if(validNumber(p.status)) {
        where.status = p.status
    }
    c.data = await Bo_v2_group_customer.findArr(where)
}
/**
 * @param p
 * @param c {Controller}
 */

export const countGroupCustomer = async (p, c) => {
    c.data = await countBoV2GroupCustomerMd({})
    c.mess = ""
}

/**
 * @param p
 * @param c {Controller}
 */

export const updateGroupCustomer = async ({
                                              code,
                                              name,
                                              status, id
                                          }, c) => {
    if (code) {
        const checkCode = await getDetailBoV2GroupCustomerMd({code})
        if (checkCode) {
            c.status = false
            c.mess = "Mã nhóm khách hàng đã tồn tại"
            return
        }
    }
    const checkId = await getDetailBoV2GroupCustomerMd({id})
    if (checkId === null) {
        c.status = false
        c.mess = "Mã khách hàng không tồn tại"
        return

    }
    c.data = await updateBoV2GroupCustomerMd({
        code,
        name,
        status
    }, {id})
    c.mess = c.MESS.update
}


/**
 * @param p
 * @param c {Controller}
 */

export const deleteGroupCustomer = async ({id }, c) => {
    const checkId = await getDetailBoV2GroupCustomerMd({id})
    if (checkId === null) {
        c.status = false
        c.mess = "Mã nhóm khách hàng không tồn tại"
        return
    } else {
        const listCustomer = await getListBoV2CustomerMd({ group_customer_id: id })
        if (listCustomer && listCustomer[0]) {
            c.status = false
            c.mess = "Nhóm đã có khách hàng không thể xóa"
            return
        }
    }
    c.data = await delBoV2GroupCustomerMd({id})
    c.mess = c.MESS.delete
}


/**
 * @param p
 * @param c {Controller}
 */

export const addGroupCustomer = async ({name,code}, c) => {
    c.runValid({name , code})
    c.data = await addBoV2GroupCustomerMd({
        name,
        status : 1,
        code
    })
    c.mess = c.MESS.addData
}


/**
 * @param p
 * @param c {Controller}
 */

export const getDetailGroupCustomer = async ({id}, c) => {
    if(!id){
        c.mess = c.MESS.getData
        c.status =false
        return
    }
    c.data = await getDetailBoV2GroupCustomerMd({
        id
    })
    c.mess = c.MESS.addData
}


