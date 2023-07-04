import {REGEX} from "@constant";
import {readExel2} from "@lib";
import {importProductRp, updateImportProductRp, updateProductRp} from "@repository/boProductRepo";
import {
    countBoV2ProductMd,
    getDetailBoV2ProductMd,
    getListBoV2ProductMd,
    updateBoV2ProductMd
} from "@model/bo_v2_product";
import {endHiddenCallStack} from "@babel/core/lib/errors/rewrite-stack-trace";
import {getListBoV2CartMemberMd} from "@model/bo_v2_cart_member";
import {Op} from "sequelize";
import {
    getDetailBOCategoryMd,
    getDetailBoV2CompanyMd,
    getListBOCategoryMd,
    getListBoV2PermissionGroupMemberMd
} from "@model";
import {getDetailBoV2CartMd, getListBoV2CartMd} from "@model/bo_v2_cart";
import {addBoV2CartHistoryMd, updateBoV2CartHistoryMd} from "@model/bo_v2_cart_history";
import {getListBoV2GroupMemberMd} from "@model/bo_v2_group_member";
import {getListBoV2CampaignMd} from "@model/bo_v2_campaign";
import {getPermissionObjStaffByUser} from "@repository/permissionRepo";
import {addBoV2LogDataMd, getListBoV2LogDataMd} from "@model/bo_v2_log_data";

/**
 * @param p
 * @param c {Controller}
 */
export const importProduct = async ({file}, c) => {
    if (file) {
        console.log(c.user_id)
        c.valid({v: file.mimetype, n: "file", f: REGEX.F_EXCEL})
        if (c.v()) return
        let attr = ["stt", "code_bds", "cdt_code", "company", "p_status", "type", "status", "location",
            "lot_number", "road", "bedroom", "toilet", "direction", "balcony_direction", "view", "corner_unit",
            "dt_thong_thuy", "dt_tim_tuong", "dt_san_vuon", "gia_thong_thuy", "gia_tim_tuong", "gia_san",
            "gia_tran", "gia_niem_yet", "gi_chu_niem_yet", "gia_ban_chua_vat", "don_gia_co_vat", "don_gia_chua_vat",
            "thue_vat", "maintain_price", "service_price", "stage", "loai_dat_cho", "total", "lock_member", "open_sale", "code", "note"]
        let values = readExel2(file.buffer, attr)
        let data = []
        for (let i = 0; i < values.length; i++) {
            if (values[i].stt !== undefined) data.push(values[i])
        }
        for (let dataImport of data) {
            const checkProduct = await getDetailBoV2ProductMd({code: dataImport.code_bds})
            if (checkProduct === null) {
                await importProductRp(dataImport)
            } else {
                dataImport.user_id=c.user_id
                await updateProductRp(dataImport)
            }
        }
        let listError = []
        let success = 0
        let fail = 0
        for (const datum of data) {
            if (datum.status_after === true) {
                if (datum.mess) listError.push(datum.mess)
                success += 1
            }
            if (datum.status_after === false) {
                fail += 1
                listError.push(datum.mess)
            }
        }
        c.data = {listError: listError, success: success, fail: fail}
        c.mess = "Ket qua Import"
    } else {
        c.mess = "Bạn gửi thiếu file"
        c.status = false
    }
}
/**
 * @param p
 * @param c {Controller}
 */
export const updateProduct = async ({
                                        id,
                                        code_bds,
                                        cdt_code,
                                        company,
                                        p_status,
                                        type,
                                        status,
                                        floor,
                                        lot_number,
                                        road,
                                        bedroom,
                                        toilet,
                                        direction,
                                        balcony_direction,
                                        view,
                                        corner_unit,
                                        dt_thong_thuy,
                                        dt_tim_duong,
                                        dt_san_vuon,
                                        gia_thong_thuy,
                                        gia_tim_duong,
                                        gia_san,
                                        gia_tim_tuong,
                                        gia_tran,
                                        dt_tim_tuong,
                                        gia_niem_yet,
                                        gi_chu_niem_yet,
                                        gia_ban_chua_vat,
                                        don_gia_co_vat,
                                        don_gia_chua_vat,
                                        thue_vat,
                                        maintain_price,
                                        stage,
                                        loai_dat_cho,
                                        total,
                                        lock_member,
                                        open_sale,
                                        code,
                                        note
                                    }, c) => {

    const checkProduct = await getDetailBoV2ProductMd({id: id})
    if (!checkProduct) {
        c.status=false
        c.mess = `Can ho khong ton tai`
        return
    }
    let category_id = checkProduct.category_id
    let building_id = checkProduct.building_id
    const checkCode = await getDetailBoV2ProductMd({code:code_bds})
    if (checkCode){
        c.status=false
        c.mess="Ma BDS da ton tai"
        return
    }
    if (code_bds) {
        const checkCategory = await getDetailBOCategoryMd({cb_code: code_bds.slice(0, 3)})
        if (!checkCategory) {
            c.status=false
            c.mess = `Ma du an khong ton tai`
            return
        }
        category_id = checkCategory.id
        const checkBuilding = await getDetailBOCategoryMd({cb_code: code_bds.slice(0, 6)})
        if (!checkBuilding) {
            c.status=false
            c.mess = `Ma toa nha khong ton tai`
            return
        }
        building_id = checkBuilding.id
    }
    let company_id = checkProduct.company_id
    if (company) {
        const checkCompany = await getDetailBoV2CompanyMd({code: company})
        if (!checkCompany) {
            c.status=false
            c.mess = `Cong ty khong ton tai`
            return
        }
        company_id = checkCompany.id
    }
    if (p_status) {
        let listStatus = ["MBA", "CHLOCK", "LOCKED", "ADD_CUSTOMER", "CUSTOMER_CONFIRM", "DCH", "CDDCO", "DCO", "HDO", "HUY", "PAYMENT"]
        if (!listStatus.includes(p_status)) {
            c.status=false
            c.mess = `Tinh trang san pham khong hop le`
            c.status = false
            return
        }
    }
    let cart_id = checkProduct.cart_id
    if (code) {
        const checkCart = await getDetailBoV2CartMd({code: code})
        if (!checkCart) {
            c.status=false
            c.mess = `Ma gio hang khong ton tai`
            return
        }
        cart_id = checkCart.id
    }
    const updateProduct = await updateBoV2ProductMd({
        code: code_bds,
        cdt_code: cdt_code,
        company_id: company_id,
        p_status: p_status,
        type: type,
        floor: floor,
        lot_number: lot_number,
        road: road,
        bedroom: bedroom,
        toilet: toilet,
        direction: direction,
        balcony_direction: balcony_direction,
        view: view,
        corner_unit: corner_unit,
        dt_thong_thuy: dt_thong_thuy,
        dt_tim_tuong: dt_tim_tuong,
        dt_san_vuon: dt_san_vuon,
        gia_thong_thuy: gia_thong_thuy,
        gia_tim_tuong: gia_tim_tuong,
        gia_san: gia_san,
        gia_tran: gia_tran,
        gia_niem_yet: gia_niem_yet,
        gi_chu_niem_yet: gi_chu_niem_yet,
        gia_ban_chua_vat: gia_ban_chua_vat,
        don_gia_co_vat: don_gia_co_vat,
        don_gia_chua_vat: don_gia_chua_vat,
        thue_vat: thue_vat,
        maintain_price: maintain_price,
        stage: stage,
        loai_dat_cho: loai_dat_cho,
        total: total,
        lock_member: lock_member,
        open_sale: open_sale,
        cart_id: cart_id,
        note: note,
        building_id: building_id,
        category_id: category_id
    }, {id})
    if (code) {
        const addCartHistory = await addBoV2CartHistoryMd({cart_id: cart_id,product_id: checkProduct.id,action:"phancan"})
    }
    let data = JSON.stringify(updateProduct)
    const addLog = await addBoV2LogDataMd({user_id:c.user_id,data:data,code:code_bds})
    c.mess = c.MESS.update

}
/**
 * @param p
 * @param c {Controller}
 */
export const getListProduct = async ({cart_id, building_id, category_id, user_id}, c) => {
    let where = {}
    if (c.p.master){
        where={}
    }else {
        let listCart = []
        const permission = await getPermissionObjStaffByUser(c.user_id)
        if (permission.category.length>0){
            const cart = await getListBoV2CartMd({category_id:{[Op.in]:permission.category}})
            for (const boV2Cart of cart) {
                listCart.push(boV2Cart.id)
            }
        }
        if (permission.cart.length>0){
            listCart=listCart.concat(permission.cart)
        }
        if (listCart.length===0){
            const cartMember = await getListBoV2CartMemberMd({user_id:c.user_id})
            for (const boV2CartMember of cartMember) {
                listCart.push(boV2CartMember.cart_id)
            }
        }
        if (listCart.length===0){
            c.data=[]
            c.mess=c.MESS.getData
            return
        }
        listCart = [...new Set(listCart)]
        where.cart_id={[Op.in]:listCart}
    }
    if (cart_id) where.cart_id = cart_id
    if (building_id) where.building_id = building_id
    if (category_id) where.category_id = category_id
    c.data = await getListBoV2ProductMd(where)
    c.mess=c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const getListBuilding = async ({category_id}, c) => {
    let where = {cb_level: 2, cb_status: 1}
    if (category_id) where.parent_id = category_id
    c.data = await getListBOCategoryMd(where)
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const getListApartment = async ({building_id}, c) => {
    c.data = await getListBoV2ProductMd({building_id})
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const countProduct = async ({cart_id, building_id, category_id, user_id}, c) => {
    let where = {}
    if (c.p.master){
        where={}
    }else {
        let listCart = []
        const permission = await getPermissionObjStaffByUser(c.user_id)
        if (permission.category.length>0){
            const cart = await getListBoV2CartMd({category_id:{[Op.in]:permission.category}})
            for (const boV2Cart of cart) {
                listCart.push(boV2Cart.id)
            }
        }
        if (permission.cart.length>0){
            listCart=listCart.concat(permission.cart)
        }
        if (listCart.length===0){
            const cartMember = await getListBoV2CartMemberMd({user_id:c.user_id})
            for (const boV2CartMember of cartMember) {
                listCart.push(boV2CartMember.cart_id)
            }
        }
        if (listCart.length===0){
            c.data=0
            c.mess=c.MESS.getData
            return
        }
        listCart = [...new Set(listCart)]
        where.cart_id={[Op.in]:listCart}
    }
    if (cart_id) where.cart_id = cart_id
    if (building_id) where.building_id = building_id
    if (category_id) where.category_id = category_id
    c.data = await countBoV2ProductMd(where)
    c.mess=c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const getDetailProduct = async ({id}, c) => {
    console.log(c.user_id)
    c.runValid({
        N_id: id
    })
    if (c.v()) return
    let listPermission = []
    const permission = await getListBoV2PermissionGroupMemberMd({user_id: c.user_id})
    for (const boV2PermissionGroupMember of permission) {
        if (boV2PermissionGroupMember.staff_object_id !== null)
            listPermission.push(boV2PermissionGroupMember.staff_object_id)
    }
    listPermission = [...new Set(listPermission)]
    let type = []
    let data = await getDetailBoV2ProductMd({id})
    if (listPermission.includes("giamdocsan")) data.scope_type = "department"
    if (listPermission.includes("quanlydohang")) data.scope_type = "cart"
    if (listPermission.includes("dieuphoikinhdoanh")) data.scope_type = "category"
    if (c.p.master) data.scope_type = "admin"
    c.data = data
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const getListHistoryProduct = async ({code},c)=>{
    if (!c.p.master){
        c.status=false
        c.mess="Ban khong co quyen"
        return
    }
    c.runValid({
        S_code:code
    })
    if (c.v()) return
    const history = await getListBoV2LogDataMd({code:code})
    for (const boV2LogDatum of history) {
        boV2LogDatum.data=JSON.parse(boV2LogDatum.data)
    }
    c.data = history
    c.mess=c.MESS.getData
}