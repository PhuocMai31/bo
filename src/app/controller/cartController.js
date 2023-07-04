import {getPermissionObjStaffByUser} from "@repository/permissionRepo";
import {aLog1Rp, ModelQuery} from "@lib";
import {generateNumber, updateFiles, validNumber} from "@util";
import {getDetailBoV2CartMd, getListBoV2CartMd} from "@model/bo_v2_cart";
import {getDetailBOCategoryMd, getDetailBoV2PermissionGroupMemberMd, getListBoV2PermissionGroupMemberMd} from "@model";
import {getListBoV2CartMemberMd} from "@model/bo_v2_cart_member";
import {addCartRp, updateCartRp} from "@repository/cartRepo";
import {countBoV2CartProductMd} from "@model/bo_v2_cart_history";
import {getListBoV2GroupMemberMd} from "@model/bo_v2_group_member";
import {deleteBoV2CartMd} from "@model/bo_v2_cart";
import {Op} from "sequelize";
import {STAFF} from "@constant";
import {file} from "googleapis/build/src/apis/file";
import {countBoV2ProductMd} from "@model/bo_v2_product";

/**
 *
 * @param category_id
 * @param name
 * @param user_id_manager
 * @param status
 * @param limit
 * @param page
 * @param c {Controller}
 */
export const getListCart = async ({category_id, name, user_id_manager, status, limit, page}, c) => {
    const query = new ModelQuery(`
                                    bo_v2_cart a
    left join bo_v2_permission_group_member b on a.id = b.scope_id and b.scope_type = "quanlychiendich"`)
    query.attr = ["a.*"]
    if (c.p.master) {

    } else {
        const map = await getPermissionObjStaffByUser(c.user_id)
        if (map.cart.length === 0 && map.category.length === 0) {
            c.data = []
            c.mess = c.MESS.getData
            return
        }
        query.condition_1 = `(${map.cart.length ? `a.id in (${map.cart})` : ""}  ${map.category.length ? `or a.category_id in (${map.category})` : ""} )`
    }
    query.condition_2 = "a.deleted_at is null"
    query.condition_7 = "b.deleted_at is null"
    if (name) {
        query.condition_3 = `a.name like '%${name}%'`
    }
    if (category_id) {
        query.condition_4 = `a.category_id = ${category_id}`
    }
    if (user_id_manager) {
        query.condition_5 = `b.user_id = ${user_id_manager}`
    }
    if (validNumber(status)) {
        query.condition_6 = `status = ${status}`
    }
    query.group = ['id']
    query.order = [["a.created_at", "desc"]]
    query.limit = limit
    query.page = page
    c.data = await query.exe()
    c.mess = c.MESS.getData
}
export const getListCartV2 = async ({category_id, limit, page, name}, c) => {
    const query = new ModelQuery(`bo_v2_cart a
    left join bo_v2_permission_group_member b on a.id = b.scope_id and b.scope_type = "quanlychiendich" 
        right join bo_v2_cart_member c on a.id = c.cart_id
    `)
    query.attr = ["a.*"]
    if (c.p.master) {

    } else {
        const map = await getPermissionObjStaffByUser(c.user_id)
        if (map.cart.length === 0 && map.category.length === 0) {
            c.data = []
            c.mess = c.MESS.getData
            return
        }
        query.condition_1 = `(${map.cart.length ? `a.id in (${map.cart})` : ""}  ${map.category.length ? `or a.category_id in (${map.category})` : ""} or c.user_id = ${c.user_id} )`

    }
    query.condition_2 = "a.deleted_at is null"
    query.condition_7 = "b.deleted_at is null"
    if (name) {
        query.condition_3 = `a.name like '%${name}%'`
    }
    if (category_id) {
        query.condition_4 = `a.category_id = ${category_id}`
    }
    query.group = ['id']
    query.order = [["a.created_at", "desc"]]
    query.limit = limit
    query.page = page
    c.data = await query.exe()
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
export const addCart = async ({
                                  category_id,
                                  user_id_sales,
                                  user_id_manager,
                                  name,
                                  time_hold,
                                  desc,
                                  company_id,
                                  file
                              }, c) => {
    aLog1Rp("addCart", {category_id, user_id_sales, user_id_manager, name, time_hold, desc, company_id, file})
    c.runValid({
        N_category_id: category_id, user_id_manager, time_hold,
        S_name: name
    })
    if (c.v()) return
    const category = await getDetailBOCategoryMd({id: category_id})
    if (category === null) {
        c.mess = "Không tìm thấy dự án"
        c.status = false
        return
    }
    let image = null
    if (file) image = await updateFiles(file)
    c.data = await addCartRp(category_id, name, time_hold, desc, category.cb_code, JSON.parse(user_id_manager), JSON.parse(user_id_sales), company_id, image)
    c.mess = c.MESS.addData
}


/**
 *
 * @param category_id
 * @param name
 * @param user_id_manager
 * @param status
 * @param c {Controller}
 */
export const countCart = async ({category_id, name, user_id_manager, status}, c) => {
    const query = new ModelQuery(`
                                    bo_v2_cart a
    left join bo_v2_permission_group_member b on a.id = b.scope_id and b.scope_type = "quanlychiendich"`)
    query.attr = ["count(*) count"]
    if (c.p.master) {

    } else {
        const map = await getPermissionObjStaffByUser(c.user_id)
        if (map.cart.length === 0 && map.category.length === 0) {
            c.data = []
            c.mess = c.MESS.getData
            return
        }
        query.condition_1 = `(${map.cart.length ? `a.id in (${map.cart})` : ""}  ${map.category.length ? `or a.category_id in (${map.category})` : ""} )`
    }
    query.condition_2 = "a.deleted_at is null"
    query.condition_7 = "b.deleted_at is null"
    if (name) {
        query.condition_3 = `a.name like '%${name}%'`
    }
    if (category_id) {
        query.condition_4 = `a.category_id = ${category_id}`
    }
    if (user_id_manager) {
        query.condition_5 = `b.user_id = ${user_id_manager}`
    }
    if (validNumber(status)) {
        query.condition_6 = `status = ${status}`
    }
    query.order = []
    query.plain = true
    const data = await query.exe()
    c.data = data.count
    c.mess = c.MESS.getData
}
/**
 *
 * @param p
 * @param c {Controller}
 */
export const updateCart = async ({
                                     id,
                                     name,
                                     category_id,
                                     desc,
                                     time_hold,
                                     user_id_sales,
                                     user_id_manager,
                                     company_id,
                                     status,
                                     file
                                 }, c) => {
    c.runValid({id})
    if (c.v()) return
    aLog1Rp("updateCart",
        {
            id,
            name,
            category_id,
            desc,
            time_hold,
            user_id_sales,
            user_id_manager,
            company_id,
            status
        }
    )
    const detail = await getDetailBoV2CartMd({id})
    if (detail === null) {
        c.mess = "Khống tìm thấy dổ hàng"
        c.status = false
        return
    }
    const map = await getPermissionObjStaffByUser(c.user_id)
    if (map.category.find(value => value === detail.category_id) || c.p.master) {
        let code = undefined
        if (category_id) {
            const category = await getDetailBOCategoryMd({id: category_id})
            code = `${category.cb_code}_${generateNumber(6)}`
            if (category === null) {
                c.mess = "Không tìm thấy dự án"
                c.status = false
                return
            }
            const count = await countBoV2CartProductMd({cart_id: detail.id})
            if (count) {
                c.mess = "Không thể cập nhập mã dữ án khi bảng hàng này đã có căn hộ"
                c.status = false
                return
            }
        }
        let image = detail.image
        if (file) image = updateFiles(file)
        await updateCartRp(id, name, category_id, code, desc, time_hold, user_id_sales ? JSON.parse(user_id_sales) : user_id_sales, user_id_manager ? JSON.parse(user_id_manager) : user_id_manager, company_id, status, image)
        c.mess = c.MESS.update
        return
    } else if (map.cart.find(value => value === detail.id)) {
        let image = detail.image
        if (file) image = updateFiles(file)
        await updateCartRp(id, undefined, undefined, undefined, undefined, time_hold, user_id_sales ? JSON.parse(user_id_sales) : user_id_sales, undefined, undefined, undefined, image)
        c.mess = c.MESS.update
        return
    }
    c.mess = "Bạn không có quyền cập nhập"
}

/**
 *
 * @param p
 * @param c {Controller}
 */
export const deleteCart = async ({id}, c) => {
    const checkId = await getDetailBoV2CartMd({id})
    if (checkId === null) {
        c.mess = "Khống tìm thấy rổ hàng"
        c.status = false
        return
    }
    c.data = await deleteBoV2CartMd({id})
    c.mess = c.MESS.delete
}

/**
 *
 * @param id
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const getDetailCart = async ({id}, c) => {
    c.runValid({id})
    if (c.v()) return
    const detail = await getDetailBoV2CartMd({id})
    if (detail === null) {
        c.mess = "Không tìm thấy giỏ hàng"
        c.status = false
        return
    }
    detail.scope_type = "admin"
    const check = await getDetailBoV2PermissionGroupMemberMd({
        staff_object_id: "dieuphoikinhdoanh",
        scope_id: detail.category_id,
        scope_type: "category"
    })
    if (check) {
        detail.scope_type = "dieuphoikinhdoanh"
    } else {
        const check2 = await getDetailBoV2PermissionGroupMemberMd({
            staff_object_id: "quanlychiendich",
            scope_id: detail.id,
            scope_type: "cart"
        })
        if (check2) {
            detail.scope_type = "quanlychiendich"
        }

    }
    detail.user_id_manager = await getListBoV2PermissionGroupMemberMd({
        staff_object_id: "quanlydohang",
        scope_id: detail.id,
        scope_type: "cart"
    })
    detail.user_id_sales = await getListBoV2CartMemberMd({cart_id: detail.id})
    c.data = detail
    c.mess = c.MESS.getData

}
/**
 * @param p
 * @param c {Controller}
 */
export const    getListCartV3 = async ({category_id,name}, c) => {
    let where = {}
    let listCart = []
    if (c.p.master) {
        where = {}
    } else {
        const permission = await getPermissionObjStaffByUser(c.user_id)
        if (permission.category.length > 0) {
            const cart = await getListBoV2CartMd({category_id: {[Op.in]: permission.category}})
            for (const boV2Cart of cart) {
                listCart.push(boV2Cart.id)
            }
        }
        if (permission.cart.length > 0) {
            listCart = listCart.concat(permission.cart)
        }
        listCart = [...new Set((listCart))]
        if (listCart.length === 0) {
            c.data = []
            c.mess = c.MESS.getData
            return
        }
        where.id = {[Op.in]: listCart}
    }
    if (category_id) {
        where.category_id = {[Op.in]:JSON.parse(category_id)}
    }
    if (name){
        where.name = {[Op.like]: `%${name}%`}
    }
    const data = await getListBoV2CartMd(where)
    for (const datum of data) {
        datum.total_product = await countBoV2ProductMd({cart_id: datum.id,status:1})
    }
    c.data = data
    c.mess = c.MESS.getData
}
/**
 * @param p
 * @param c {Controller}
 */
