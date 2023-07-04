import User, {addBoV2UserMd, getDetailBoV2UserMd} from "@model/bo_v2_user";
import {Op} from "sequelize";
import {dateNowDataBase, excelDateToJSDate, mapPermission, res, seqIn} from "@util";
import bcrypt from "bcrypt";
import {$, aLog1Rp, Controller, genTokenById, ModelQuery, rdSet} from "@lib";
import {
    addBoV2UserTokenMd,
    getDetailBoV2UserTokenMd,
    updateBoV2UserTokenMd,
} from "@model/bo_v2_user_token";
import {REGEX, STAFF, STATUS} from "@constant";
import {addBov2UserInfoMd, getDetailBoV2UserInfoMd} from "@model/bo_v2_user_info";
import {sequelize} from "@config/main";
import {addBoV2GroupMemberMd, getDetailBoV2GroupMemberMd, getListBoV2GroupMemberMd} from "@model/bo_v2_group_member";
import {getDetailCityRp, getDetailDistrictsRp, getDetailWardsRp} from "@repository/addressRepo";
import {getDetailBoV2ExchangeMd} from "@model/bo_v2_exchange";
import {getListGroupSale} from "@controller/groupSaleController";
import {getDetailBoV2GroupSaleMd, getListBoV2GroupSaleMd} from "@model/bo_v2_group_sale";
import {getListBoV2PermissionGroupMemberMd} from "@model/bo_v2_permission_group_member";
import {getDetailBoV2CompanyMd} from "@model/bo_v2_company";
import {addBoV2WorkGroupMd} from "@model/bo_v2_work_group";
import {getPermissionObjStaffByUser} from "@repository/permissionRepo";
import {zip} from "lodash/array";

export const addUserLoginRp = async (phone, password, username, client_id) => {
    const checkUser = await getDetailBoV2UserMd({
        [Op.or]: [{phone}, {username}],
    });
    if (checkUser) {
        if (checkUser.phone === phone)
            return res(
                "số điện thoại đã được đăng ký vui lòng nhập số điện thoại khác"
            );
        if (checkUser.username === username)
            return res(
                "tên tài khoản đã được đăng ký vui lòng nhập số điện thoại khác"
            );
    }

    password = await bcrypt.hash(password, 10);
    const user = await addBoV2UserMd({phone, password, username, status: 1});
    const {token, userDetail} = await genToken(user, client_id);
    return res("", true, {userDetail, token});
};
/**
 *
 * @param user {Bo_v2_user}
 * @param info  {{client_id : string,build : string,device_name ,js_ver,native_ver,os,os_ver,bundle_id,type}}
 * @return {Promise<{userInfo: Bo_v2_user_info, token}|{userInfo: Bo_v2_user_info, token: string}>}
 */
export const genToken = async (user, info) => {
    const timeExpire = $.timeExpire();
    const userInfo = await getDetailBoV2UserInfoMd({user_id: user.id})
    const checkToken = await getDetailBoV2UserTokenMd({
        client_id: info.client_id,
        user_id: user.id,
    });
    if (
        checkToken &&
        new Date(checkToken.time_expired * 1000).getTime() > new Date().getTime()
    ) {
        const token_update = await updateBoV2UserTokenMd(
            {time_expired: timeExpire, last_login: new Date()},
            {id: checkToken.id}
        );
        rdSet(checkToken.token, userInfo, timeExpire);
        return {token: checkToken.token, userInfo};
    }
    const token = genTokenById(user.id, User.table_name);
    const userToken = await addBoV2UserTokenMd({
        token,
        client_id: info.client_id,
        last_login: new Date(),
        time_expired: timeExpire,
        user_id: user.id,
        bundle_id: info.bundle_id,
        device_name: info.device_name
    });

    rdSet(token, userInfo, timeExpire);
    return {token, userInfo};
};
/**
 *
 * @param email
 * @param username
 * @param password
 * @param info  {{client_id : string,build : string,device_name ,js_ver,native_ver,os,os_ver,bundle_id,type}}
 */
export const loginUserRp = async (email, username, password, info) => {
    const where = {status: STATUS.ON};
    if (email) where.email = email;
    else where.username = username;
    const user = await getDetailBoV2UserMd(where);
    if (user && user.pword && await bcrypt.compare(password, user.pword))
        return res("Đăng nhập thành công ", true, await genToken(user, info));
    return res("Tên tài khoản hoặc mật khẩu không chính xác");
};

export const checkToken = async (token, client_id) => {
    const userToken = await getDetailBoV2UserTokenMd({
        token,
        client_id,
    });
    if (
        userToken &&
        new Date(userToken.time_expired * 1000).getTime() > new Date().getTime()
    ) {
        const timeExpire = $.timeExpire();
        const user = await getDetailBoV2UserMd({id: userToken.user_id});
        const userInfo = await getDetailBoV2UserInfoMd({user_id: user.id})
        await updateBoV2UserTokenMd(
            {time_expired: timeExpire, last_login: new Date()},
            {id: userToken.id}
        );
        rdSet(userToken.token, userInfo, timeExpire);
        aLog1Rp("u", user)
        userInfo.username = user?.username
        return res("", true, {token: userToken.token, userInfo});
    } else if (userToken) {
        return res("token-expired", false,);
    }
    return res("bạn không có quyền truy cập");
};


export const getInfoUserRp = (user_id) => {
    return getDetailBoV2UserInfoMd({
        user_id,
        deleted_at: false
    }, false, ["full_name", "user_id", "code_staff", 'company_id', "exchange_id"])
}
/**
 *
 * @param datum {{
 *      stt                         ,
 *      username                        ,
 *      full_name                       ,
 *      cmt_date                        ,
 *      cmt_province                    ,
 *      birthday                        ,
 *      gender                          ,
 *      position                        ,
 *      city_id                         ,
 *      ward_id                         ,
 *      cb_district_id                  ,
 *      code_staff                      ,
 *      email                           ,
 *      cmt_number                      ,
 *      cmt_expiry                      ,
 *      place_birth                     ,
 *      group_sale_id                   ,
 *      email_contact                   ,
 *      district_id                     ,
 *      cb_city_id                      ,
 *      cb_ward_id                      ,
 *      mess                            ,
 *      status                          ,
 *      phone                          ,
 *      address                          ,
 *      social_insurance_code                          ,
 *      cb_address                          ,
 *      company_id,
 *      exchange_id
 * }}
 * @return {Promise<{cmt_number}|*|{group_sale_id}>}
 */

export const importUserRp = async (datum) => {
    console.log("run")
    const t = await sequelize.transaction()
    const con = new Controller("VI")
    try {
        datum.birthday = excelDateToJSDate(datum.birthday) ? dateNowDataBase(true, excelDateToJSDate(datum.birthday)) : undefined
        datum.cmt_expiry = excelDateToJSDate(datum.cmt_expiry) ? dateNowDataBase(true, excelDateToJSDate(datum.cmt_expiry)) : undefined
        datum.cmt_date = excelDateToJSDate(datum.cmt_date) ? dateNowDataBase(true, excelDateToJSDate(datum.cmt_date)) : undefined
        con.valid(
            {
                v: datum.username,
                f: REGEX.C_USERNAME,
                m: "username đăng nhập phải từ 6 - 30 ký tự và @ _  không chứa ký tự đặc biệt khác"
            },
            {v: datum.phone, f: REGEX.C_PHONE, n: "Số Điện Thoại", c: "AllowUndefined"},
            {v: datum.email, f: REGEX.C_EMAIL, n: "Email đăng ký"},
            {v: datum.code_staff, n: "Mã nhân viên", m: "Mã nhân viên không được bỏ trống"},
            {v: datum.full_name, n: "Họ và tên"},
            {
                v: datum.cmt_number,
                f: REGEX.C_CMT,
                c: "AllowUndefined",
                m: "Số chứng minh thư phải từ 8 - 12 số"
            },
            {v: datum.cmt_date, f: REGEX.C_DATE_TIME, n: "Ngày cấp", c: "AllowUndefined",},
            {v: datum.cmt_expiry, f: REGEX.C_DATE_TIME, n: "Ngày hết hạn cmt", c: "AllowUndefined",},
            {v: datum.cmt_date, f: REGEX.C_DATE_TIME, n: "Ngày cấp cmt", c: "AllowUndefined",},
            {v: datum.birthday, f: REGEX.C_DATE_TIME_ALL, n: "Ngày sinh", c: "AllowUndefined",},
            {v: datum.gender, f: REGEX.C_gender, n: "Giới tính", c: "AllowUndefined",},
            {v: datum.company_id, n: "Mã công ty"},
            {v: datum.email_contact, f: REGEX.C_EMAIL, n: "email cá nhân", c: "AllowUndefined",},
            {
                v: datum.city_id,
                f: REGEX.C_NUMBER,
                n: "Mã Thành phố tỉnh thành thường chú",
                c: "AllowUndefined",
            },
            {
                v: datum.district_id,
                f: REGEX.C_NUMBER,
                n: "Mã quận huyện tỉnh thành thường chú",
                c: "AllowUndefined",
            },
            {v: datum.ward_id, f: REGEX.C_NUMBER, n: "Mã phường xã thường chú", c: "AllowUndefined",},
            {v: datum.cb_city_id, f: REGEX.C_NUMBER, n: "Mã Thành phố tỉnh thành cư chú", c: "AllowUndefined",},
            {
                v: datum.cb_district_id,
                f: REGEX.C_NUMBER,
                n: "Mã quận huyện tỉnh thành cư chú",
                c: "AllowUndefined",
            },
            {v: datum.cb_ward_id, f: REGEX.C_NUMBER, n: "Mã phường xã cư chú", c: "AllowUndefined",},
        )
        if (con.v()) {
            datum.mess = con.mess
            datum.status = con.status
            await t.commit()
            return datum
        }
        const checkUser = await getDetailBoV2UserMd({
            [Op.or]: [{username: datum.username}, {email: datum.email}],
        })
        if (checkUser) {
            datum.mess = "Tài khoản hoặc email đăng ký  đã tồn tại"
            datum.status = false
            await t.commit()
            return datum
        }
        if (datum.cmt_number) {
            const checkCmt = await getDetailBoV2UserInfoMd({cmt_number: datum.cmt_number})
            if (checkCmt) {
                datum.mess = "Số chứng minh thư đã được sử dụng"
                datum.status = false
                await t.commit()
                return datum
            }
        }
        const exchange = await getDetailBoV2ExchangeMd({status: STATUS.ON, code: datum.exchange_id,})
        if (exchange === null) {
            datum.mess = "Không tìm thấy mã phòng ban"
            datum.status = false
            await t.commit();
            return datum
        }
        datum.exchange_id = exchange.id
        if (datum.group_sale_id) {
            const checkGroup = await getDetailBoV2GroupSaleMd({
                id: datum.group_sale_id,
                exchange_id: datum.exchange_id,
            })
            if (checkGroup === null) {
                datum.mess = "Không tìm thấy mã nhóm sale"
                datum.status = false
                await t.commit()
                return datum
            }
        }

        const checkStaff = await getDetailBoV2UserInfoMd({code_staff: datum.code_staff})

        if (checkStaff) {
            datum.mess = "Mã nhân viên đã tồn tại"
            datum.status = false
            await t.commit()
            return datum
        }
        const company = await getDetailBoV2CompanyMd({status: STATUS.ON, code: datum.company_id})
        if (company === null) {
            datum.mess = "Không tìm thấy mã công ty"
            datum.status = false
            await t.commit();
            return datum
        }
        datum.company_id = company.id
        if (datum.city_id) {
            const city = await getDetailCityRp(datum.city_id)
            if (city === null) {
                datum.mess = "Không tìm thấy mã tỉnh thành phố"
                datum.status = false
                await t.commit()
                return
            }
            datum.city_id = city.id
        }

        if (datum.cb_city_id) {
            const city = await getDetailCityRp(datum.cb_city_id)
            if (city === null) {
                datum.mess = "Không tìm thấy mã tỉnh thành phố"
                datum.status = false
                await t.commit()
                return
            }
            datum.cb_city_id = city.id
        }

        if (datum.district_id) {
            const district = await getDetailDistrictsRp(datum.district_id)

            if (district === null) {
                datum.mess = "Không tìm thấy mã tỉnh Quận huyện"
                datum.status = false
                await t.commit()
                return
            }
            datum.district_id = district.id
        }
        if (datum.cb_district_id) {
            const district = await getDetailDistrictsRp(datum.cb_district_id)

            if (district === null) {
                datum.mess = "Không tìm thấy mã tỉnh Quận huyện"
                datum.status = false
                await t.commit()
                return
            }
            datum.cb_district_id = district.id
        }
        if (datum.ward_id) {
            const ward = await getDetailWardsRp(datum.ward_id)

            if (ward === null) {
                datum.mess = "Không tìm thấy mã  Phường xã"
                datum.status = false
                await t.commit()
                return
            }
            datum.ward_id = ward.id
        }
        if (datum.cb_ward_id) {
            const ward = await getDetailWardsRp(datum.cb_ward_id)
            if (ward === null) {
                datum.mess = "Không tìm thấy mã Phường xã"
                datum.status = false
                await t.commit()
                return
            }
            datum.cb_ward_id = ward.id
        }

        const user = await addBoV2UserMd({
            username: datum.username,
            phone: datum.phone,
            email: datum.email, status: 1,
        }, t)

        const user_info = await addBov2UserInfoMd({
            user_id: user.id,
            address: datum.address,
            cmt_number: datum.cmt_number,
            cmt_date: datum.cmt_date,
            cmt_province: datum.cmt_province,
            cmt_expiry: datum.cmt_expiry,
            place_birth: datum.place_birth,
            birthday: datum.birthday,
            code_staff: datum.code_staff,
            social_insurance_code: datum.social_insurance_code,
            phone_contact: datum.phone,
            full_name: datum.full_name,
            cb_address: datum.cb_address,
            city_id: datum.city_id,
            district_id: datum.district_id,
            cb_city_id: datum.cb_city_id,
            cb_district_id: datum.cb_district_id,
            cb_ward_id: datum.cb_ward_id,
            ward_id: datum.ward_id,
            company_id: datum.company_id,
            exchange_id: datum.exchange_id,
            gender: datum.gender,
            position: datum.position
        }, t)
        datum.group_sale_id && await addBoV2GroupMemberMd({
            user_id: user.id,
            group_sale_id: datum.group_sale_id
        }, t)
        datum.status = true
        await t.commit()
        return datum
    } catch (e) {
        console.log(e)
        await t.rollback()
        datum.status = false
        datum.mess = "Có lỗi"
        return datum
    }
}

/**
 *
 * @param exchange_id
 * @return {Promise<Bo_v2_group_member[]>}
 */
export const getListUserByExchangeRp = async (exchange_id) => {
    const listGroup = await getListBoV2GroupSaleMd({exchange_id})
    return getListBoV2GroupMemberMd({group_sale_id: {[Op.in]: listGroup.map((v) => v.id)}})
}

export const getDetailGroupByUser = async (user_id) => {
    const data = await getDetailBoV2GroupMemberMd({user_id})
    if (data === null) return data
    return getDetailBoV2GroupSaleMd({id: data.group_sale_id})
}

/**
 *
 * @param company_id
 * @param exchange_id
 * @param page
 * @param limit
 * @param key_search
 * @param status
 * @param attr
 * @param group_sale_id
 * @param user_id
 * @return {Promise<object[]>}
 */
export const getListUserRp = async (company_id, exchange_id, page, limit, key_search, status, attr = false, group_sale_id, user_id) => {
    const query = new ModelQuery("bo_v2_user a,bo_v2_user_info b")
    let user_ids = []
    //  truong nhom truong phong


    if (group_sale_id) {
        const members = await getListBoV2GroupMemberMd({group_sale_id})
        user_ids = members.map(value => value.user_id)
    }

    if (user_id) {
        const map = await getPermissionObjStaffByUser(user_id, false, [STAFF.truongnhom, STAFF.truongphong])
        if (map.exchange.length || map.group.length) {
            let user_ids2 = []
            if (map.group.length) {
                const members = await getListBoV2GroupMemberMd({group_sale_id: seqIn(map.group)})
                user_ids2 = members.map(value => value.user_id)
            }
            query.condition_5 = `(  ${map.exchange.length ?`b.exchange_id in (${map.exchange})` : '' } ${  map.exchange.length && user_ids2.length ? "or":"" }    ${user_ids2.length ? `   a.id  in (${user_ids2}) ` : ""} )`
        } else
            return []
    }
    query.condition_1 = `a.id = b.user_id`
    query.condition_2 = `a.deleted_at is null`
    query.condition_3 = `b.deleted_at is null`
    if (company_id) {
        query.condition_4 = `b.company_id=${company_id} `
    }
    if (exchange_id) {
        query.condition_7 = `b.exchange_id=${exchange_id} `
    }
    if (key_search) {
        query.condition_6 = `(a.username like '%${key_search}%' or b.full_name like '%${key_search}%' or a.email like '%${key_search}%' )`
    }
    if (status) {
        query.condition_8 = `a.status = ${status}`
    }
    if (group_sale_id) {
        query.condition_9 = `a.id  in (${user_ids})`
    }
    if (!attr)
        query.attr = ["a.id user_id ", "a.id ", "a.username", "a.status", "a.created_at", "a.updated_at", "a.email", "b.full_name", "b.code_staff", "a.phone", "b.company_id", "b.exchange_id"]
    else query.attr = attr
    query.order = [["created_at", "desc"], ["a.id", "desc"]]
    query.page = page;
    query.limit = limit
    return query.exe()
}
export const countUserRp = async (company_id, exchange_id, key_search, status, group_sale_id) => {
    const query = new ModelQuery("bo_v2_user a,bo_v2_user_info b")
    let user_ids = []
    if (group_sale_id) {
        const members = await getListBoV2GroupMemberMd({group_sale_id})
        user_ids = members.map(value => value.user_id)
    }
    query.condition_1 = `a.id = b.user_id`
    query.condition_2 = `a.deleted_at is null`
    query.condition_3 = `b.deleted_at is null`
    if (company_id) {
        query.condition_4 = `b.company_id=${company_id} `
    }
    if (exchange_id) {
        query.condition_7 = `b.exchange_id=${exchange_id} `
    }

    if (key_search) {
        query.condition_6 = `(a.username like '%${key_search}%' or b.full_name like '%${key_search}%' or a.email like '%${key_search}%' )`
    }
    if (status) {
        query.condition_6 = `a.status = ${status}`
    }
    if (group_sale_id) {
        query.condition_9 = `a.id  in (${user_ids})`
    }
    query.attr = ["count(*) count"]
    query.order = []
    query.plain = true
    return query.exe()
}


export const getListUserNotInGroupRp = async (company_id, exchange_id, key_search) => {
    const query = new ModelQuery("bo_v2_user_info   ")
    query.condition_3 = `deleted_at is null`
    query.condition_4 = `company_id=${company_id} `
    query.condition_6 = `exchange_id=${exchange_id} `
    query.condition_5 = `user_id not in (select user_id from bo_v2_group_member where bo_v2_group_member.deleted_at is null and bo_v2_group_member.user_id is not  null )`
    if (key_search) {
        query.condition_6 = `(b.username like '%${key_search}%' or b.full_name like '%${key_search}%' )`
    }
    query.attr = ["user_id id"]
    query.order = []
    return query.exe()
}

