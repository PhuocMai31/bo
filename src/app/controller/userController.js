import {
    clearToken,
    countUserRp,
    getInfoUserRp,
    getListUserNotInGroupRp,
    getListUserRp,
    importUserRp
} from "@repository";
import {updateFiles, uploadImg} from "@util";
import {
    addBoV2PermissionGroupMemberMd,
    addBov2UserInfoMd,
    addBoV2UserMd, delBoV2PermissionGroupMemberMd, delBoV2SaleViolationMd,
    delBoV2UserMd,
    deleteBoV2UserInfoMd,
    getDetailBoV2UserInfoMd,
    getDetailBoV2UserMd, getListBoV2CustomerMd,
    getListBoV2UserInfoMd, sequelize, updateBoV2CustomerMd,
    updateBoV2UserInfoMd,
    updateBoV2UserMd
} from "@model";
import {
    addBoV2GroupMemberMd,
    deleteBoV2GroupMemberMd,
    getDetailBoV2GroupMemberMd,
    getListBoV2GroupMemberMd
} from "@model/bo_v2_group_member";
import {addLogRp, Controller, getDateName, ModelQuery, readExel2} from "@lib";
import {REGEX} from "@constant";

import bcrypt from "bcrypt";
import {getDetailBoV2GroupSaleMd} from "@model/bo_v2_group_sale";
import {getDetailCityMd} from "@model/city";
import {getDetailDistrictsMd} from "@model/districts";
import {getDetailWardMd} from "@model/ward";
import {Op} from "sequelize";
import {getDetailBoV2CampaignMd, updateBoV2CampaignMd} from "@model/bo_v2_campaign";
import allotmentCustomerQueen from "@cron/allotmentCustomerCron";
import {addBoV2SaleCustomerCampaignHistoryMd} from "@model/bo_v2_sale_customer_campaign_history";
import {getPermissionObjStaffByUser} from "@repository/permissionRepo";


/**
 *
 * @param p
 * @param c {Controller}
 */
export const getInfoUser = async ({user_id}, c) => {
    c.data = await getInfoUserRp(user_id)
    c.mess = c.MESS.getData
}

/**
 *
 * @param p
 * @param c {Controller}
 */
export const getListUserInfo = async ({group_sale_id}, c) => {
    let where = {}
    if (group_sale_id) {
        const groupMember = await getListBoV2GroupMemberMd({group_sale_id})
        let listUserId = []
        for (let i = 0; i < groupMember.length; i++) {
            listUserId.push(groupMember[i].user_id)
        }
        where.user_id = {[Op.in]: listUserId}
    }
    c.data = await getListBoV2UserInfoMd(where)
    c.mess = c.MESS.getData
}

/**
 *
 * @param p
 * @param c {Controller}
 */
export const importUser = async ({file}, c) => {
    if (file) {
        c.valid({v: file.mimetype, n: "file", f: REGEX.F_EXCEL})
        if (c.v()) return;
        const attr = [
            "stt", "code_staff",
            "username", "email", "phone",
            "full_name", "cmt_number",
            "cmt_date",
            "cmt_province", "cmt_expiry",
            "birthday", "place_birth",
            "gender", "company_id", "exchange_id", "group_sale_id",
            "position", "email_contact",
            "city_id", "district_id",
            "ward_id", "address", "cb_city_id",
            "cb_district_id", "cb_ward_id", "cb_address", "social_insurance_code"
        ]
        /**
         *
         * @type {*[]}
         */
        let values = readExel2(file.buffer, attr)
        let data = []
        for (let i = 0; i < values.length; i++) {
            if (values[i].stt !== undefined) data.push(values[i])
        }
        for (let datum of data) {
            await importUserRp(datum)
        }
        data.forEach(value => {
            if (value.status === true) value["Kết quả"] = "thành công"
            else {
                value["Kết quả"] = "Thất bại"
                value["Nguyên Nhân"] = value.mess
            }
            delete value.status
            delete value.mess
        })
        attr.push("Kết quả", "Nguyên Nhân")
        c.data = data
        c.type_return = "FILE_EXEL"
        c.rest = {headers: attr, filename: "user" + getDateName()}
        return
    }
    c.mess = "Bạn gửi thiếu file"
    c.status = false

}


/**
 *
 * @param p
 * @param c {Controller}
 */
export const getListUser = async ({page, limit, status, company_id, exchange_id, group_sale_id, key_search}, c) => {
    let data = []
    if (c.p.master) {
        data = await getListUserRp(company_id, exchange_id, page, limit, key_search, status, false, group_sale_id)

    }else {
        data = await getListUserRp(company_id, exchange_id, page, limit, key_search, status, false, group_sale_id , c.user_id)
    }
    for (let datum of data) {
        if (group_sale_id) {
            datum.group_sale_id = group_sale_id
            continue
        }
        const member = await getDetailBoV2GroupMemberMd({user_id: datum.user_id})
        datum.group_sale_id = member?.group_sale_id

    }
    c.data = data
    c.mess = c.MESS.getData
}


/**
 *
 * @param p
 * @param c {Controller}
 */
export const getListUserV2 = async (p, c) => {
    c.runValid({N_company_id: p.company_id})
    if (!c.status) return
    c.data = await getListUserNotInGroupRp(p.company_id, p.exchange_id,)
    c.mess = c.MESS.getData
}
/**
 *
 * @param p
 * @param c {Controller}
 */
export const getDetailUser = async ({user_id}, c) => {
    const user = await getDetailBoV2UserMd({
        id: user_id,
    }, false, ["id", "username", "email", "status", "created_at", "updated_at", "phone"])
    const user_info = await getDetailBoV2UserInfoMd({user_id})
    const group_member = await getDetailBoV2GroupMemberMd({user_id})
    let group = null
    if (group_member)
        group = await getDetailBoV2GroupSaleMd({id: group_member.group_sale_id})
    c.data = {user_info, user, group}
    c.mess = c.MESS.getData
}


/**
 *
 * @param p
 * @param c {Controller}
 */
export const countUser = async ({status, company_id, exchange_id, group_sale_id, key_search}, c) => {
    const where = {}
    if (status) {
        where.status = status
    }
    const d = await countUserRp(company_id, exchange_id, key_search, status, group_sale_id)
    c.data = d.count
}


/**
 * @param p
 * @param c {Controller}
 */
export const addUser = async ({
                                  group_sale_id,
                                  code_staff,
                                  email,
                                  pword,
                                  status,
                                  phone,
                                  username,
                                  calling_code,
                                  phone_status,
                                  email_status,
                                  file,
                                  full_name,
                                  address,
                                  cmt_number,
                                  cmt_date,
                                  cmt_address,
                                  cmt_province,
                                  cmt_image,
                                  birthday,
                                  gender,
                                  cmt_status,
                                  phone_contact,
                                  email_contact,
                                  social_insurance_code,
                                  place_birth,
                                  cmt_expiry,
                                  city_id,
                                  district_id,
                                  ward_id,
                                  cb_city_id,
                                  cb_district_id,
                                  cb_ward,
                                  position,
                                  company_id,
                                  marital_status,
                                  cb_address,
                                  cb_ward_id, exchange_id
                              }, c) => {
    addLogRp("addUser", {
        group_sale_id,
        code_staff,
        email,
        pword,
        status,
        phone,
        username,
        calling_code,
        phone_status,
        email_status,
        full_name,
        address,
        cmt_number,
        cmt_date,
        cmt_address,
        cmt_province,
        cmt_image,
        birthday,
        gender,
        cmt_status,
        phone_contact,
        email_contact,
        social_insurance_code,
        place_birth,
        cmt_expiry,
        city_id,
        district_id,
        ward_id,
        cb_city_id,
        cb_district_id,
        cb_ward,
        cb_address,
        cb_ward_id,
        position,
        company_id,
        marital_status, exchange_id
    })
    c.runValid({
        N0_city_id: city_id,
        N0_district_id: district_id,
        N0_ward_id: ward_id,
        N0_cb_city_id: cb_city_id,
        N0_cb_district_id: cb_district_id,
        N0_cb_ward: cb_ward,
        N0_group_sale_id: group_sale_id,
        N0_marital_status: marital_status,
        N_company_id: company_id,
        email: email,
        S_pword: pword,
        S_full_name: full_name,
        S_username: username,
        S_code_staff: code_staff,
        N_exchange_id: exchange_id

    })

    c.runValidAlNull({
        phone
    })
    if (c.v()) return
    let avatar = []
    if (file) {
        const res = await uploadImg(file)
        avatar.push(res.data.origin)
    }
    pword = await bcrypt.hash(pword, 10)
    const checkEmail = await getDetailBoV2UserMd({email})
    const checkUsername = await getDetailBoV2UserMd({username})
    const checkCodeStaff = await getDetailBoV2UserInfoMd({code_staff})
    if (checkUsername) {
        c.status = false
        c.mess = "Ten dang nhap da bi trung"
        return
    }
    if (checkEmail) {
        c.status = false
        c.mess = "Email da bi trung"
        return
    }
    if (checkCodeStaff) {
        c.status = false
        c.mess = "Ma nhan vien da bi trung"
        return
    }
    if (cmt_number) {
        const checkCmt = await getDetailBoV2UserInfoMd({cmt_number})
        if (checkCmt) {
            c.status = false
            c.mess = "So chung minh thu bi trung"
            return
        }
    }
    const user = await addBoV2UserMd({
        email,
        pword,
        status,
        phone,
        username,
        calling_code,
        phone_status,
        email_status,
    })
    let user_id = await user.id
    const userInfo = await addBov2UserInfoMd({
        user_id,
        full_name,
        address,
        cmt_number,
        cmt_date,
        cmt_address,
        cmt_province,
        cmt_image,
        avatar: JSON.stringify(avatar),
        birthday,
        gender,
        cmt_status,
        phone_contact,
        email_contact,
        social_insurance_code,
        place_birth,
        cmt_expiry,
        city_id,
        district_id,
        ward_id,
        cb_city_id,
        cb_district_id,
        cb_ward,
        position,
        code_staff,
        cb_address,
        cb_ward_id,
        marital_status, company_id, exchange_id
    })

    await addBoV2PermissionGroupMemberMd({
        user_id: user.id,
        company_id: company_id,
        exchange_id: exchange_id,
        staff_object_id: "nhanvienbanhang"
    })

    group_sale_id && await addBoV2GroupMemberMd({group_sale_id, user_id, exchange_id, company_id})
    c.data = {}
    c.mess = c.MESS.addData
}

/**
 * @param p
 * @param c {Controller}
 */
export const updateUser = async ({
                                     id,
                                     file,
                                     phone,
                                     pword,
                                     email,
                                     full_name,
                                     address,
                                     cmt_number,
                                     cmt_date,
                                     cmt_address,
                                     cmt_province,
                                     cmt_image,
                                     birthday,
                                     gender,
                                     cmt_status,
                                     phone_contact,
                                     email_contact,
                                     social_insurance_code,
                                     place_birth,
                                     cmt_expiry,
                                     city_id,
                                     district_id,
                                     cb_address,
                                     cb_ward_id,
                                     ward_id,
                                     cb_city_id,
                                     cb_district_id,
                                     cb_ward,
                                     position,
                                     code_staff,
                                     group_sale_id, avatar
                                     , exchange_id,
                                     status, company_id, marital_status
                                 }, c) => {
    addLogRp("updateUser", {
        id,
        phone,
        pword,
        email,
        full_name,
        address,
        cmt_number,
        cmt_date,
        cmt_address,
        cmt_province,
        cmt_image,
        birthday,
        gender,
        cmt_status,
        phone_contact,
        email_contact,
        social_insurance_code,
        place_birth,
        cmt_expiry,
        city_id,
        district_id,
        ward_id,
    })
    c.runValid({
        D0_cmt_date: cmt_date,
        D0_birthday: birthday
    })
    c.runValidAlNull({phone, email})
    if (c.v()) return
    if (file) {
        const res = await updateFiles(file)
        avatar = JSON.stringify([res])
    }
    const checkUser = await getDetailBoV2UserMd({id})
    if (checkUser) {
        pword = pword && await bcrypt.hash(pword, 10)
        const user = await updateBoV2UserMd({phone, pword, email, status}, {id})
        let user_id = user.item.id
        const userInfo = await updateBoV2UserInfoMd({
            full_name,
            address,
            cmt_number,
            cmt_date,
            cmt_address,
            cmt_province,
            cmt_image,
            avatar: avatar === undefined ? undefined : avatar,
            birthday,
            gender,
            cmt_status,
            phone_contact,
            email_contact,
            social_insurance_code,
            place_birth,
            cmt_expiry,
            city_id,
            district_id,
            ward_id,
            cb_ward_id,
            cb_address,
            cb_city_id,
            cb_district_id,
            cb_ward,
            position,
            code_staff,
            exchange_id,
            company_id,
            marital_status
        }, {user_id})
        await clearToken(id, pword || status == 0 ? true : false)
        const checkGroupMember = await getDetailBoV2GroupMemberMd({user_id})

        if (group_sale_id && checkGroupMember) {
            await deleteBoV2GroupMemberMd({user_id})
            const groupSale = await getDetailBoV2GroupSaleMd({id :group_sale_id })
            await addBoV2GroupMemberMd({user_id, group_sale_id, exchange_id : groupSale.exchange_id, company_id : groupSale.company_id})
            c.mess = c.MESS.update
        } else if (exchange_id && checkGroupMember) {
            await deleteBoV2GroupMemberMd({user_id})
        }
        if (group_sale_id && !checkGroupMember) {
            await addBoV2GroupMemberMd({group_sale_id, user_id, exchange_id, company_id})
        }
        c.status = true
        c.mess = c.MESS.update
    } else {
        c.status = false
        c.mess = "user không tồn tại"
    }


}
/**
 * @param p
 * @param c {Controller}
 */
export const deleteUser = async ({id}, c) => {
    let user_id = id
    const checkUser = await getDetailBoV2UserMd({id})
    if (!checkUser) {
        c.status = false
        c.mess = "Nguoi dung khong ton tai"
        return
    }

    const deleteUser = await delBoV2UserMd({id})
    const deleteUserInfo = await deleteBoV2UserInfoMd({user_id})
    const deleteGroupMember = await deleteBoV2GroupMemberMd({user_id})
    const listCustomer = await getListBoV2CustomerMd({status_allocation: 2, create_type: 1})
    /**
     *
     * @type {Bo_v2_campaign[]}
     */
    const listCampaign = []
    for (let boV2Customer of listCustomer) {
        await updateBoV2CustomerMd({user_id_sale: 0}, {id: boV2Customer.id})
        const campaign = await getDetailBoV2CampaignMd({
            category_id: boV2Customer.category_id,
            source_id: boV2Customer.source_id
        })
        if (campaign) {

            /**
             *
             * @type {[]}
             */
            let user_id_manager = JSON.parse(campaign.user_id_manager)
            /**
             *
             * @type {[]}
             */

            let user_sale_ids = JSON.parse(campaign.user_sale_ids)
            user_id_manager = user_id_manager.filter(value => value !== Number(id))
            user_sale_ids = user_sale_ids.filter(value => value !== Number(id))
            await updateBoV2CampaignMd({
                user_id_manager: JSON.stringify(user_id_manager),
                user_sale_ids: JSON.stringify(user_sale_ids)
            }, {id: campaign.id})
            if (listCampaign.find((value) => value.id === campaign.id) === undefined) {
                listCampaign.push(campaign)
            }
        }

    }
    for (let boV2Campaign of listCampaign) {
        await allotmentCustomerQueen.push({id: boV2Campaign.id})
    }
    await delBoV2SaleViolationMd({user_id_sale: id})
    c.mess = c.MESS.delete
}


/**
 *
 * @param p
 * @param c {Controller}
 */
export const expListUser = async ({page, limit, status, company_id, exchange_id, key_search}, c) => {
    /**
     *
     * @type {Bo_v2_user_info[]}
     */
    const users = await getListUserRp(company_id, exchange_id, page, limit, key_search, status, ["a.phone", "a.email", "a.username", "b.*"])
    const attr = ["STT", "Mã nhân viên", "Tài khoản", "Email đăng ký", "Số điện thoại", "Họ và tên", "CMND/CCCD", "Ngày cấp CMND", "Nơi cấp CMND"
        , "Hạn CMND/CCCD", "Ngày sinh", "Nơi sinh", "Giới tính", "Chức vụ", "	Email cá nhân", "Mã tỉnh thành phố thường trú",
        "Mã Quận huyện thường trú", "Mã phường xã thường trú", "Địa chỉ thường trú",
        "Mã tỉnh thành phố cư trú", "Mã quận huyện cư trú", "Mã phường xã cư trú",
        "Địa chỉ cư trú", "Bảo hiểm xã hội"]
    console.log(users)
    let i = 1
    const list = []
    for (const user of users) {
        const item = {}
        item[attr[0]] = i
        item[attr[1]] = user.code_staff;
        item[attr[2]] = user.username
        item[attr[3]] = user.email
        item[attr[4]] = user.phone
        item[attr[5]] = user.full_name
        item[attr[6]] = user.cmt_number
        item[attr[7]] = user.cmt_date === "00:00:00 00:00:00"
        item[attr[8]] = user.cmt_address
        item[attr[9]] = user.cmt_expiry
        item[attr[10]] = user.birthday
        item[attr[11]] = user.place_birth
        item[attr[12]] = user.gender === 1 ? "Nam" : "Nữ"
        item[attr[13]] = user.position
        item[attr[14]] = user.email_contact
        if (user.city_id) {
            const cyti = await getDetailCityMd({id: user.city_id})
            if (cyti)
                item[attr[15]] = cyti.name
        }
        if (user.district_id) {
            const cyti = await getDetailDistrictsMd({id: user.district_id})
            if (cyti)
                item[attr[16]] = cyti.name
        }
        if (user.ward_id) {
            const cyti = await getDetailWardMd({id: user.ward_id})
            if (cyti)
                item[attr[17]] = cyti.name
        }
        item[attr[18]] = user.address

        if (user.cb_city_id) {
            const cyti = await getDetailCityMd({id: user.cb_city_id})
            if (cyti)
                item[attr[19]] = cyti.name
        }
        if (user.cb_district_id) {
            const cyti = await getDetailDistrictsMd({id: user.cb_district_id})
            if (cyti)
                item[attr[20]] = cyti.name
        }
        if (user.cb_ward_id) {
            const cyti = await getDetailWardMd({id: user.cb_ward_id})
            if (cyti)
                item[attr[21]] = cyti.name
        }
        item[attr[22]] = user.cb_address
        item[attr[23]] = user.social_insurance_code
        i++
        list.push(item)
    }
    c.type_return = "FILE_EXEL"
    c.rest.filename = "user.xlsx"
    c.rest.headers = attr
    c.data = list
}

/**
 * @param p
 * @param c {Controller}
 */
export const getListCustomerBeforeDel = async ({user_id_sale}, c) => {
    const query = new ModelQuery("bo_v2_customer")
    query.condition_1 = "user_id_sale = " + user_id_sale
    query.condition_2 = "!( status_allocation = 2 and create_type = 1 )"
    query.condition_3 = "deleted_at is null"
    c.data = await query.exe()
    c.mess = c.MESS.getData
}
/**
 *
 * @param recalls {[]|""}
 * @param transfers  {[]|""}
 * @param user_id_sale
 * @param c  {Controller}
 * @returns {Promise<void>}
 */
export const recallCustomer = async ({recalls, transfers, user_id_sale}, c) => {
    recalls = JSON.parse(recalls)
    transfers = JSON.parse(transfers)
    const transaction = await sequelize.transaction()
    try {
        for (let recall of recalls) {
            await updateBoV2CustomerMd({user_id_sale: 0, status_allocation: 4}, {id: recall})
            await addBoV2SaleCustomerCampaignHistoryMd({
                user_id_sale: 0,
                action: "thu_hoi",
                customer_id: recall
            })
        }
        for (let transfer of transfers) {
            await updateBoV2CustomerMd({user_id_sale: user_id_sale, transfer, status_allocation: 3}, {id: transfer})
        }
        await transaction.commit()
        c.mess = c.MESS.update
    } catch (e) {
        await transaction.rollback()
        throw  e
    }
}





