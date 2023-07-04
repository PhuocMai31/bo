import {
    addBoV2InvestorMd,
    countBoV2InvestorMd,
    getDetailBoV2InvestorMd,
    getListBoV2InvestorMd, updateBoV2InvestorMd,
  delBoV2InvestorMd
} from "@model/bo_v2_investor";
import {seqLike} from "@util";

/**
 * @param p
 * @param c {Controller}
 */
export const getListInvestor = async ({limit, page, name}, c) => {
    c.runValidAlNull({limit, page})
    if (c.v()) return
    const where = {}
    if (name) {
        where.name = seqLike(name)
    }
    c.data = await getListBoV2InvestorMd(where, false, limit, page)
    c.mess = c.MESS.getData
};
/**
 * @param p
 * @param c {Controller}
 */
export const countInvestor = async ({name}, c) => {
    const where = {}
    if (name) {
        where.name = seqLike(name)
    }
    c.data = await countBoV2InvestorMd(where)
    c.mess = c.MESS.getData
};


// export  const getDetailInvestor =

/**
 * @param p
 * @param c {Controller}
 */
export const getDetailInvestor = async ({id}, c) => {
    c.data = await getDetailBoV2InvestorMd({id})
    c.mess = c.MESS.getData
};


export const addInvestor = async ({
                                      code,
                                      name
                                  }, c) => {
    const checkCode = await getDetailBoV2InvestorMd({code})
    if (checkCode) {
        c.status = false
        c.mess = "Trùng mã code với chủ đầu tư khác"
        return
    }
    c.data = await addBoV2InvestorMd({code, name})
    c.mess = c.MESS.addData
};


export const updateInvestor = async ({
                                         code,
                                         name, id , status
                                     }, c) => {
    const checkCode = await getDetailBoV2InvestorMd({code})
    if (checkCode) {
        c.status = false
        c.mess = "Trùng mã code với chủ đầu tư khác"
        return
    }
    c.data = await updateBoV2InvestorMd({code, name ,status} , {id})
    c.mess = c.MESS.update
};

export const deleteInvestor = async ({id}, c) => {
    const checkId = await getDetailBoV2InvestorMd({id})
    if (checkId === null) {
        c.status = false
        c.mess = "Không tìm thấy chủ đầu tư"
        return
    }
    c.data = await delBoV2InvestorMd({id})
    c.mess = c.MESS.delete
};

