import {Controller, sum_minus} from "@lib";
import {dateNowDataBase, excelDateToJSDate} from "@util";
import {REGEX, TYPE_INTERACTIVE_STATUS} from "@constant";
import {getDetailBoV2GroupCustomerMd} from "@model/bo_v2_group_customer";
import {getDetailBoV2SourceMd} from "@model/bo_v2_source";
import {addBoV2CustomerMd, getDetailBoV2CustomerMd} from "@model/bo_v2_customer";
import {getDetailBoV2CampaignMd} from "@model/bo_v2_campaign";
import {getDetailBOCategoryMd} from "@model/b_o_categories";
import {getDetailCityRp, getDetailDistrictsRp, getDetailWardsRp} from "@repository/addressRepo";
import {getDetailBoV2UserMd} from "@model";
import {addBoV2SaleCustomerCampaignHistoryMd} from "@model/bo_v2_sale_customer_campaign_history";

/**
 *
 * @param data {{
 *      stt,
 *      phone,
 *      full_name,
 *      source_id,
 *      group_customer_id,
 *      category_id,
 *      cmt_full_name,
 *      country,
 *      gender,
 *      email,
 *      birthday,
 *      cmt_number,
 *      cmt_date,
 *      cmt_province,
 *      cb_city_id,
 *      cb_district_id,
 *      cb_ward_id,
 *      cb_address,
 *      city_id,
 *      district_id,
 *      ward_id,
 *      address,
 *      interactive_status,
 *      interactive_form,
 *      note,
 *      mess,
 *      status
 * }}
 * @param user_id
 */
export const importCustomerRp = async (data, user_id) => {
    const con = new Controller("VI")
    data.birthday = excelDateToJSDate(data.birthday) ? dateNowDataBase(true, excelDateToJSDate(data.birthday)) : undefined
    data.cmt_date = excelDateToJSDate(data.cmt_date) ? dateNowDataBase(true, excelDateToJSDate(data.cmt_date)) : undefined
    con.valid(
        {v: data.email, f: REGEX.C_EMAIL, n: "Email", c: "AllowUndefined"},
        {v: data.full_name, n: "Họ và tên"},
        {v: data.cmt_full_name, n: "Họ và tên(cmt)", c: "AllowUndefined"},
        {v: data.source_id, n: "Mã nguồn khách hàng"},
        {v: data.category_id, n: "Mã Dự án"},
        {v: data.group_customer_id, n: "Mã nhóm khách hàng"},
        {
            v: data.cmt_number,
            f: REGEX.C_CMT,
            c: "AllowUndefined",
            m: "Số chứng minh thư phải từ 8 - 12 số"
        },
        {v: data.cmt_date, f: REGEX.C_DATE_TIME_ALL, n: "Ngày cấp", c: "AllowUndefined",},
        {v: data.birthday, f: REGEX.C_DATE_TIME_ALL, n: "Ngày sinh", c: "AllowUndefined",},
        {v: data.gender, f: REGEX.C_gender, n: "Giới tính", c: "AllowUndefined",},
        {
            v: data.city_id,
            f: REGEX.C_NUMBER,
            n: "Mã Thành phố tỉnh thành liên hệ",
            c: "AllowUndefined",
        },
        {
            v: data.district_id,
            f: REGEX.C_NUMBER,
            n: "Mã quận huyện tỉnh thành liên hệ",
            c: "AllowUndefined",
        },
        {v: data.ward_id, f: REGEX.C_NUMBER, n: "Mã phường xã liên hệ", c: "AllowUndefined",},
        {v: data.cb_city_id, f: REGEX.C_NUMBER, n: "Mã Thành phố tỉnh thành thường chú", c: "AllowUndefined",},
        {
            v: data.cb_district_id,
            f: REGEX.C_NUMBER,
            n: "Mã quận huyện tỉnh thành thường chú",
            c: "AllowUndefined",
        },
        {v: data.cb_ward_id, f: REGEX.C_NUMBER, n: "Mã phường xã thường chú", c: "AllowUndefined",},
        {v: data.interactive_form, f: REGEX.C_NUMBER, n: "Tình trạng khách hàng", c: "AllowUndefined",},
        {v: data.interactive_status, f: REGEX.C_NUMBER, n: "Trạng thái chăm sóc", c: "AllowUndefined",},
    )
    if(data.country === "nuoc_ngoai"){
        con.valid(  {v: data.phone, n: "Số Điện Thoại",},)
    }else if(data.country === "viet_nam"){
        con.valid(  {v: data.phone,f :REGEX.C_PHONE, n: "Số Điện Thoại",},)
    }

    if (con.v()) {
        data.status = false
        data.mess = con.mess
        return data
    }

    const group = await getDetailBoV2GroupCustomerMd({code: data.group_customer_id})
    if (group === null) {
        data.status = false
        data.mess = "Không tìm thấy mã nhóm khách  hàng"
        return data
    }
    data.group_customer_id = group.id
    if (!(data.country === "viet_nam" || data.country === "nuoc_ngoai" || data.country === undefined)) {
        data.status = false
        data.mess = "Quốc gia không đúng định dạng"
        return data
    }

    if (data.city_id) {
        const city = await getDetailCityRp(data.city_id)
        if (city === null) {
            data.mess = "Không tìm thấy mã tỉnh thành phố"
            data.status = false
            return data
        }

        data.city_id = city.id
    }

    if (data.cb_city_id) {
        const city = await getDetailCityRp(data.cb_city_id)
        if (city === null) {
            data.mess = "Không tìm thấy mã tỉnh thành phố"
            data.status = false
            return
        }
        data.cb_city_id = city.id
    }

    if (data.district_id) {
        const district = await getDetailDistrictsRp(data.district_id)

        if (district === null) {
            data.mess = "Không tìm thấy mã tỉnh Quận huyện"
            data.status = false
            return data
        }
        data.district_id = district.id
    }
    if (data.cb_district_id) {
        const district = await getDetailDistrictsRp(data.cb_district_id)

        if (district === null) {
            data.mess = "Không tìm thấy mã tỉnh Quận huyện"
            data.status = false
            return data
        }
        data.cb_district_id = district.id
    }
    if (data.ward_id) {
        const ward = await getDetailWardsRp(data.ward_id)

        if (ward === null) {
            data.mess = "Không tìm thấy mã  Phường xã"
            data.status = false
            return data
        }
        data.ward_id = ward.id
    }
    if (data.cb_ward_id) {
        const ward = await getDetailWardsRp(data.cb_ward_id)
        if (ward === null) {
            data.mess = "Không tìm thấy mã Phường xã"
            data.status = false
            return data
        }
        data.cb_ward_id = ward.id
    }

    const source = await getDetailBoV2SourceMd({code: data.source_id})
    if (source === null) {
        data.mess = "Không tìm thấy nguồn"
        data.status = false
        return data
    }
    data.source_id = source.id

    const categories = await getDetailBOCategoryMd({cb_code: data.category_id})
    if (categories === null) {
        data.mess = "Không tìm thấy mã dự án"
        data.status = false
        return data
    }
    data.category_id = categories.id

    const customerCheck = await getDetailBoV2CustomerMd({
        phone: data.phone,
        create_type: 1,
        category_id: data.category_id
    })


    if (customerCheck) {
        data.status = false
        data.mess = "Số điện thoại khách hàng đã có trên hệ thống"
        return data
    }
    await addBoV2CustomerMd({
        note: data.note,
        birthday: data.birthday,
        address: data.address,
        category_id: data.category_id,
        cb_address: data.cb_address,
        cmt_number: data.cmt_number,
        cmt_date: data.cmt_date,
        source_id: data.source_id,
        cb_city_id: data.cb_city_id,
        city_id: data.city_id,
        cb_district_id: data.cb_district_id,
        district_id: data.district_id,
        ward_id: data.ward_id,
        cb_ward_id: data.cb_ward_id,
        country: data.country || "viet_nam",
        sex: data.gender,
        email: data.email,
        cmt_full_name: data.cmt_full_name,
        phone: data.phone,
        full_name: data.full_name,
        group_customer_id: data.group_customer_id,
        status_allocation: 1,
        create_by: user_id,
        interactive_form: data.interactive_form,
        interactive_status: data.interactive_status || 1
    })
    const campaign = await getDetailBoV2CampaignMd({
        category_id: data.category_id,
        source_id: data.source_id,
        status: 1
    })

    data.status = true

    return {data, campaign}
}

export const mapCustomer = (id) => {
    switch (id) {
        case 1:
            return TYPE_INTERACTIVE_STATUS.khmoi
        case 2:
            return TYPE_INTERACTIVE_STATUS.dangLienHe
        case 3:
            return TYPE_INTERACTIVE_STATUS.dangChamSoc
        case 4:
            return TYPE_INTERACTIVE_STATUS.tiepCan
        case 5:
            return TYPE_INTERACTIVE_STATUS.tiemNang
        case 6:
            return TYPE_INTERACTIVE_STATUS.khongNhuCau
        case 7:
            return TYPE_INTERACTIVE_STATUS.giaoDich
    }
}
/**
 *
 * @param data {Bo_v2_customer}}
 * @return {Promise<void>}
 */
export const importCustomerV2Rp = async (data) => {

    try {
        data.birthday = excelDateToJSDate(data.birthday) ? dateNowDataBase(true, excelDateToJSDate(data.birthday)) : undefined
        data.final_time_care = excelDateToJSDate(data.final_time_care) ? dateNowDataBase(true, excelDateToJSDate(data.final_time_care)) : undefined
        data.created_at= excelDateToJSDate(data.created_at) ? dateNowDataBase(true, excelDateToJSDate(data.created_at)) : undefined
        if (data.group_customer_id) {
            const group = await getDetailBoV2GroupCustomerMd({code: data.group_customer_id})
            data.group_customer_id = group.id
        }
        if (data.source_id) {
            const source = await getDetailBoV2SourceMd({code: data.source_id})
            data.source_id = source.id
        }
        const sale = await getDetailBoV2UserMd({id: data.user_id_sale})
        const by = await getDetailBoV2UserMd({id: data.create_by})
        if (data.category_id) {
            const categories= await getDetailBOCategoryMd({cb_code: data.category_id.split(",")[0]})
            data.category_id  = categories.id
        }

        if(data.district_id) {
            const dis = await  getDetailDistrictsRp(data.district_id)
            data.district_id = dis.id
        }
        if(data.city_id) {
            const cyti = await  getDetailCityRp(data.city_id)
            data.city_id = cyti.id
        }
  const customer =       await addBoV2CustomerMd({
            customer_code: data.customer_code,
            user_id_sale: sale.id,
            group_customer_id: data.group_customer_id,
            category_id :data.category_id,
            address :data.address,
            source_id : data.source_id,
            note :data.note,
            create_type : data.create_type,
            create_date : data.create_date,
            status_allocation : 3 ,
            sex : data.sex,
            country  : data.country,
            birthday :data.birthday,
            final_time_care : data.final_time_care,
            interactive_status : data.interactive_status,
            full_name : data.full_name,
            email : data.email,
            phone : data.phone,
            created_at : data.created_at,
            city_id : data.city_id,
            district_id : data.district_id
        })
       await addBoV2SaleCustomerCampaignHistoryMd({
           action :"phan_bo",
           created_at : data.created_at,
           note : "importDauKy",
           user_id_sale : customer.user_id_sale,
           customer_id : customer.id,
            interactive_form     :0,
           campaign_id :0,
           interactive_status : 0

        })

       await addBoV2SaleCustomerCampaignHistoryMd({
           action :"phan_bo",
           created_at :sum_minus(60,new Date(data.final_time_care)) ,
           note : "importDauKy",
           user_id_sale : customer.user_id_sale,
           customer_id : customer.id,
           interactive_form     :customer.interactive_form,
           campaign_id :0,
           interactive_status : customer.interactive_status
        })
    } catch (e) {
        console.log(e)
        throw e
    }
}
