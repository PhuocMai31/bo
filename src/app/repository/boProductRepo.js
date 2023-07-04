import {sequelize} from "@config/main";
import {addBoV2LogCampaignMd, getDetailBOCategoryMd, getDetailBoV2CompanyMd} from "@model";
import {getListGroupSale} from "@controller/groupSaleController";
import {Controller} from "@lib";
import {addBoV2ProductMd, getDetailBoV2ProductMd, updateBoV2ProductMd} from "@model/bo_v2_product";
import {getDetailBoV2CartMd} from "@model/bo_v2_cart";
import {addBoV2CartHistoryMd} from "@model/bo_v2_cart_history";
import {addBoV2LogDataMd} from "@model/bo_v2_log_data";

export const importProductRp = async (dataImport) => {
    const c = new Controller("VI")
    const transaction = await sequelize.transaction()
    try {
        c.runValid({
            S_code_bds: dataImport.code_bds,
            S_cdt_code: dataImport.cdt_code,
            S_company: dataImport.company,
            S_p_status: dataImport.p_status,
            S_type: dataImport.type,
            N_status: dataImport.status,
            N_gia_niem_yet: dataImport.gia_niem_yet,
            S_gi_chu_niem_yet: dataImport.gi_chu_niem_yet,
            N_stage: dataImport.stage,
            N_total: dataImport.total,
            N_lock_member: dataImport.lock_member
        })
        if (c.v()) {
            dataImport.mess = `Ban ghi so ${dataImport.stt}, co ma ${dataImport.code_bds}: ${c.mess}`
            dataImport.status_after = false
            await transaction.commit()
            return
        }
        const checkProduct = await getDetailBoV2ProductMd({code: dataImport.code_bds})
        if (checkProduct) {
            dataImport.mess = `Ban ghi so ${dataImport.stt}, co ma ${dataImport.code_bds}: Ma BDS da ton tai`
            dataImport.status_after = false
            await transaction.commit()
            return
        }
        const checkCategory = await getDetailBOCategoryMd({cb_code: dataImport.code_bds.slice(0, 3)})
        if (!checkCategory) {
            dataImport.mess = `Ban ghi so ${dataImport.stt}, co ma ${dataImport.code_bds}: khong tim thay ma du an`
            dataImport.status_after = false
            await transaction.commit()
            return
        }
        const checkBuilding = await getDetailBOCategoryMd({cb_code: dataImport.code_bds.slice(0, 6)})
        console.log(dataImport.code_bds.slice(0, 6))
        if (!checkBuilding) {
            dataImport.mess = `Ban ghi so ${dataImport.stt}, co ma ${dataImport.code_bds}: khong tim thay ma can ho`
            dataImport.status_after = false
            await transaction.commit()
            return
        }
        let building_id = checkBuilding.id
        let category_id = checkCategory.id

        const checkCompany = await getDetailBoV2CompanyMd({code: dataImport.company})
        if (!checkCompany) {
            dataImport.mess = `Ban ghi so ${dataImport.stt}, co ma ${dataImport.code_bds}: Cong ty khong ton tai`
            dataImport.status_after = false
            await transaction.commit()
            return
        }
        let listStatus = ["MBA", "CBA", "CHLOCK", "LOCKED", "ADD_CUSTOMER", "CUSTOMER_CONFIRM", "DCH", "CDDCO", "DCO", "HDO", "HUY", "PAYMENT"]
        if (!listStatus.includes(dataImport.p_status)) {
            dataImport.mess = `Ban ghi so ${dataImport.stt}, co ma ${dataImport.code_bds}:Tinh trang san pham khong hop le`
            dataImport.status_after = false
            await transaction.commit()
            return
        }
        let floor = dataImport.code_bds.slice(6, 9)
        let apartment_number = dataImport.code_bds.slice(9, 12)
        let company_id = checkCompany.id

        if (dataImport.code) {
            const checkCart = await getDetailBoV2CartMd({code: dataImport.code})
            if (!checkCart) {
                dataImport.mess = `Ban ghi so ${dataImport.stt}, co ma ${dataImport.code_bds}: Ma gio hang khong ton tai`
                dataImport.status_after = false
                await transaction.commit()
                return
            }
            dataImport.cart_id = checkCart.id
        } else {
            dataImport.cart_id = null
        }
        const addProduct = await addBoV2ProductMd({
            code: dataImport.code_bds,
            cdt_code: dataImport.cdt_code,
            company_id: company_id,
            p_status: dataImport.p_status,
            status: dataImport.status,
            type: dataImport.type,
            floor: floor,
            apartment_number: apartment_number,
            location: dataImport.location,
            lot_number: dataImport.lot_number,
            road: dataImport.road,
            bedroom: dataImport.bedroom,
            toilet: dataImport.toilet,
            direction: dataImport.direction,
            balcony_direction: dataImport.balcony_direction,
            view: dataImport.view,
            corner_unit: dataImport.corner_unit,
            dt_thong_thuy: dataImport.dt_thong_thuy,
            dt_tim_tuong: dataImport.dt_tim_tuong,
            dt_san_vuon: dataImport.dt_san_vuon,
            gia_thong_thuy: dataImport.gia_thong_thuy,
            gia_tim_tuong: dataImport.gia_tim_tuong,
            gia_san: dataImport.gia_san,
            gia_tran: dataImport.gia_tran,
            gia_niem_yet: dataImport.gia_niem_yet,
            gi_chu_niem_yet: dataImport.gi_chu_niem_yet,
            gia_ban_chua_vat: dataImport.gia_ban_chua_vat,
            don_gia_co_vat: dataImport.don_gia_co_vat,
            don_gia_chua_vat: dataImport.don_gia_chua_vat,
            thue_vat: dataImport.thue_vat,
            maintain_price: dataImport.maintain_price,
            service_price: dataImport.service_price,
            stage: dataImport.stage,
            loai_dat_cho: dataImport.loai_dat_cho,
            total: dataImport.total,
            lock_member: dataImport.lock_member,
            open_sale: dataImport.open_sale,
            cart_id: dataImport.cart_id,
            note: dataImport.note,
            building_id: building_id,
            category_id: category_id
        })
        if (dataImport.cart_id !== null) {
            const addCartHistory = await addBoV2CartHistoryMd({
                cart_id: dataImport.cart_id,
                product_id: addProduct.id,
                action: "phan_can"
            })
        }
        dataImport.status_after = true
        await transaction.commit()
        return dataImport
    } catch (e) {
        console.log(e)
        await transaction.rollback()
        dataImport.status_after = false
        dataImport.mess = "Có lỗi"
        return dataImport
    }
}
export const updateProductRp = async (dataImport) => {
    const c = new Controller("VI")
    const transaction = await sequelize.transaction()
    try {
        const product = await getDetailBoV2ProductMd({code: dataImport.code_bds})
        let company_id = product.company_id
        if (dataImport.company) {
            const checkCompany = await getDetailBoV2CompanyMd({code: dataImport.company})
            if (!checkCompany) {
                c.mess = `Update: Ban ghi so ${dataImport.stt}, co ma ${dataImport.code_bds}: Ma cong ty khong ton tai`
                dataImport.status_after = false
                await transaction.commit()
                return
            }
            company_id = checkCompany.id
        }
        if (dataImport.p_status) {
            let listStatus = ["MBA", "CBA", "CHLOCK", "LOCKED", "ADD_CUSTOMER", "CUSTOMER_CONFIRM", "DCH", "CDDCO", "DCO", "HDO", "HUY", "PAYMENT"]
            if (!listStatus.includes(dataImport.p_status)) {
                dataImport.mess = `Update: Ban ghi so ${dataImport.stt}, co ma ${dataImport.code_bds}:Tinh trang san pham khong hop le`
                dataImport.status_after = false
                await transaction.commit()
                return
            }
        }
        let cart_id = product.cart_id
        if (dataImport.code) {
            const checkCart = await getDetailBoV2CartMd({code: dataImport.code})
            if (!checkCart) {
                dataImport.mess = `Update: Ban ghi so ${dataImport.stt}, co ma ${dataImport.code_bds}:Ma gio hang khong hop le`
                dataImport.status_after = false
                await transaction.commit()
                return
            }
            cart_id = checkCart.id
        }
        const update = await updateBoV2ProductMd({
            cdt_code: dataImport.cdt_code,
            company_id: company_id,
            p_status: dataImport.p_status,
            status: dataImport.status,
            type: dataImport.type,
            location: dataImport.location,
            lot_number: dataImport.lot_number,
            road: dataImport.road,
            bedroom: dataImport.bedroom,
            toilet: dataImport.toilet,
            direction: dataImport.direction,
            balcony_direction: dataImport.balcony_direction,
            view: dataImport.view,
            corner_unit: dataImport.corner_unit,
            dt_thong_thuy: dataImport.dt_thong_thuy,
            dt_tim_tuong: dataImport.dt_tim_tuong,
            dt_san_vuon: dataImport.dt_san_vuon,
            gia_thong_thuy: dataImport.gia_thong_thuy,
            gia_tim_tuong: dataImport.gia_tim_tuong,
            gia_san: dataImport.gia_san,
            gia_tran: dataImport.gia_tran,
            gia_niem_yet: dataImport.gia_niem_yet,
            gi_chu_niem_yet: dataImport.gi_chu_niem_yet,
            gia_ban_chua_vat: dataImport.gia_ban_chua_vat,
            don_gia_co_vat: dataImport.don_gia_co_vat,
            don_gia_chua_vat: dataImport.don_gia_chua_vat,
            thue_vat: dataImport.thue_vat,
            maintain_price: dataImport.maintain_price,
            service_price: dataImport.service_price,
            stage: dataImport.stage,
            loai_dat_cho: dataImport.loai_dat_cho,
            total: dataImport.total,
            lock_member: dataImport.lock_member,
            open_sale: dataImport.open_sale,
            cart_id: cart_id,
            note: dataImport.note
        }, {code: dataImport.code_bds})
        if (dataImport.code){
            if (cart_id!==product.cart_id){
                const cartHistory = await addBoV2CartHistoryMd({cart_id:cart_id,product_id:product.id,action:"phancan"})
            }
        }
        let data = JSON.stringify(update)
        const addLog = await addBoV2LogDataMd({user_id:dataImport.user_id,data:data,code:dataImport.code_bds})
        dataImport.mess=`Ban ghi so ${dataImport.stt}, co ma ${dataImport.code_bds}: Update thanh cong`
        dataImport.status_after=true
        await transaction.commit()
        return dataImport
    } catch (e) {
        console.log(e)
        await transaction.rollback()
        dataImport.status_after = false
        dataImport.mess = "Có lỗi"
        return dataImport
    }
}
