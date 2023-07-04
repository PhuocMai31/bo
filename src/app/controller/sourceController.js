import Bo_v2_source, {
    addBoV2SourceMd,
    countBoV2SourceMd,
    getDetailBoV2SourceMd,
    updateBoV2SourceMd,
    delBoV2SourceMd
} from "@model/bo_v2_source";
import {validNumber} from "@util";
import {getListBoV2CustomerMd} from "@model";

/**
 * @param p
 * @param c {Controller}
 */
export const getListSource = async (p, c) => {
    const where = {}
    if(validNumber(p.status)){
        where.status = p.status
    }
    c.data = await Bo_v2_source.findArr(where)
}

export const countSource = async (p, c) => {
    c.data = await countBoV2SourceMd({})
}
/**
 * @param p
 * @param c {Controller}
 */
export const updateSource = async ({name, code, id, status}, c) => {
    if (code) {
        const checkCode = await getDetailBoV2SourceMd({code})
        if (checkCode) {
            c.status = false
            c.mess = "Mã nhóm khách hàng đã tồn tại"
            return
        }
    }
    const checkId = await getDetailBoV2SourceMd({id})
    if (checkId === null) {
        c.status = false
        c.mess = "Mã khách hàng đã tồn tại"
        return

    }
    c.data = await updateBoV2SourceMd({
        name,
        code,
        status
    }, {id})
    c.mess = c.MESS.update
}
/**
 * @param p
 * @param c {Controller}
 */
export const deleteSource = async ({id}, c) => {
    const checkId = await getDetailBoV2SourceMd({id})
    if (checkId === null) {
        c.status = false
        c.mess = "Mã nguồn khách hàng không tồn tại"
        return
    } else {
        const listCustomer = await getListBoV2CustomerMd({ source_id: id })
        if (listCustomer && listCustomer[0]) {
            c.status = false
            c.mess = "Nguồn đã có khách hàng không thể xóa"
            return
        }
    }
    c.data = await delBoV2SourceMd({id})
    c.mess = c.MESS.delete
}
/**
 * @param p
 * @param c {Controller}
 */
export const addSource = async ({name, code, status}, c) => {
    c.runValid({name, code})
    c.data = await addBoV2SourceMd({
        code, name, status: 1
    })
    c.mess = c.MESS.addData
}

/**
 * @param p
 * @param c {Controller}
 */
export  const getDetailSource = async  ({id}, c)=> {
   c.runValid( {id})
    if(c.v())return
    c.data= await  getDetailBoV2SourceMd({id})
    c.mess = c.MESS.getData
}