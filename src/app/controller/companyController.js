import Bo_v2_company, {
    addBoV2CompanyMd, countBoV2CompanyMd,
    deleteBoV2CompanyMd,
    getDetailBoV2CompanyMd,
    getListBoV2CompanyMd,
    updateBoV2CompanyMd
} from "@model/bo_v2_company";
import {Op, where} from "sequelize";
import {addLogRp} from "@lib";
import {updateFiles, uploadImg, validNumber} from "@util";


/**
 * @param p
 * @param c {Controller}
 */
export const getListCompany = async ({name, status, page, limit}, c) => {
    let where = {}
    if (name) {
        where = {name: {[Op.like]: `%${name}%`}}
    }
    if (validNumber(status)) {
        where.status = status
    }
    c.data = await getListBoV2CompanyMd(where ,false, limit,page)
}

/**
 * @param p
 * @param c {Controller}
 */
export const getDetailCompany = async ({id}, c) => {
    c.data = await getDetailBoV2CompanyMd({id})
    c.mess = c.MESS.getData
}

/**
 * @param p
 * @param c {Controller}
 */
export const countCompany = async ({name}, c) => {
    let where = {}
    if (name) {
        where.name = {[Op.like]: `%${name}%`}
    }
    c.data = await countBoV2CompanyMd(where)
    c.mess = c.MESS.getData
}

/**
 * @param p
 * @param c {Controller}
 */
export const addCompany = async ({
                                     name,
                                     desc,
                                     code,
                                     status,
                                     parent_id,
                                     address,
                                     code_in,
                                     code_enterprise,
                                     code_tax,
                                     date_code,
                                     file,
                                     address_code,
                                     hotline,
                                     fax,
                                     email,
                                     website,
                                     user_id_representative,
                                     phone_contact
                                 }, c) => {
    addLogRp("addCompany", {
        name,
        desc,
        code,
        status,
        parent_id,
        address,
        code_in,
        code_enterprise,
        code_tax,
        file,
        date_code,
        address_code,
        hotline,
        fax,
        email,
        website, user_id_representative, phone_contact
    })
    c.runValid({
        S_name: name,
        S_code: code,
        S_address: address,
    })
    c.runValidAlNull({phone: phone_contact})
    if (c.v()) return

    let avatar = undefined
    if (file) {
            avatar = await updateFiles(file)
    }
    const checkName = await getDetailBoV2CompanyMd({name});
    const checkCode = await getDetailBoV2CompanyMd({code});


    if (checkName) {
        c.status = false
        c.mess = "Cong ty da ton tai"
        return
    }
    if (checkCode) {
        c.status = false
        c.mess = "Ma cong ty da ton tai"
        return
    }
    if (code_enterprise) {
        const checkCodeEnterprise = await getDetailBoV2CompanyMd({code_enterprise});
        if (checkCodeEnterprise) {
            c.status = false
            c.mess = "Ma doanh nghiep da ton tai"
            return
        }

    }
    if (code_tax) {
        const checkCodeTax = await getDetailBoV2CompanyMd({code_tax});
        if (checkCodeTax) {
            c.status = false
            c.mess = "MA so thue da ton tai"
            return
        }
    }
    c.data = await addBoV2CompanyMd({
        name,
        desc,
        code,
        status,
        parent_id,
        address,
        code_in,
        code_enterprise,
        code_tax,
        avatar,
        date_code,
        address_code,
        hotline,
        fax,
        email,
        website, user_id_representative, phone_contact
    })
    c.mess = c.MESS.addData
}

/**
 * @param p
 * @param c {Controller}
 */
export const updateCompany = async ({
                                        id, name,
                                        desc,
                                        code,
                                        status,
                                        parent_id,
                                        address,
                                        code_in,
                                        file,
                                        code_enterprise,
                                        code_tax,
                                        date_code,
                                        address_code,
                                        hotline,
                                        fax,
                                        email,
                                        website,
                                        user_id_representative, phone_contact
                                    }, c) => {
    addLogRp("updateCompany", {
        id, name,
        desc,
        code,
        status,
        parent_id,
        address,
        code_in,
        file,
        code_enterprise,
        code_tax,
        date_code,
        address_code,
        hotline,
        fax,
        email,
        website, user_id_representative, phone_contact
    })
    c.runValidAlNull({phone: phone_contact})
    if (c.v()) return
    const checkCompany = await getDetailBoV2CompanyMd({id})
    if (checkCompany) {
        let where_name = {id: {[Op.ne]: checkCompany.id}}
        let where_code = {id: {[Op.ne]: checkCompany.id}}
        let where_code_enterprise = {id: {[Op.ne]: checkCompany.id}}
        let where_code_tax = {id: {[Op.ne]: checkCompany.id}}
        if (name) {
            where_name.name = name
            const checkName = await getDetailBoV2CompanyMd({name});
            if (checkName) {
                c.status = false
                c.mess = "Ten cong ty da ton tai"
                return
            }
        }
        if (code) {
            where_code.code = code
            const checkCode = await getDetailBoV2CompanyMd({code});
            if (checkCode) {
                c.status = false
                c.mess = "Ten cong ty da ton tai"
                return
            }
        }
        if (code_enterprise) {
            where_code_enterprise.code_enterprise = code_enterprise
            const checkCodeEnterprise = await getDetailBoV2CompanyMd({code_enterprise});
            if (checkCodeEnterprise) {
                c.status = false
                c.mess = "Ma doanh nghiep da ton tai"
                return
            }
        }
        if (code_tax) {
            where_code_tax.code_tax = code_tax
            const checkCodeTax = await getDetailBoV2CompanyMd({code_tax});
            if (checkCodeTax) {
                c.status = false
                c.mess = "MA so thue da ton tai"
                return
            }
        }
        let avatar = checkCompany.avatar;
        if (file) {
            if (file) {
                avatar = await updateFiles(file)
            }
        }
        await updateBoV2CompanyMd({
            id, name,
            desc,
            code,
            status,
            parent_id,
            address,
            code_in,
            code_enterprise,
            code_tax,
            avatar,
            date_code,
            address_code,
            hotline,
            fax,
            email,
            website,
            user_id_representative, phone_contact
        }, {id})
        c.mess = c.MESS.update
    } else {
        c.status = false
        c.mess = "Cong ty khong ton tai"
    }
}

/**
 * @param p
 * @param c {Controller}
 */
export const deleteCompany = async ({id}, c) => {
    const checkCompany = await getDetailBoV2CompanyMd({id})
    if (!checkCompany) {
        c.status = false
        c.mess = "Cong ty khong ton tai"
        return
    }
    const companyDelete = await deleteBoV2CompanyMd({id})
    c.status = true
    c.mess = c.MESS.delete
}
