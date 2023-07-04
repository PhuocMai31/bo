import {addWardMd} from "@model/ward";
import {addBoV2RequiredMd, getListBoV2RequiredMd} from "@model/bo_v2_required";
import {getDetailBoV2ProductMd} from "@model/bo_v2_product";
import {getDetailBOCategoryMd} from "@model";
import {sum_minus} from "@lib";
import {getPermissionObjStaffByUser} from "@repository/permissionRepo";
import {STAFF} from "@constant";
import {seqIn, seqOr} from "@util";

/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const getListRequired = async ({type}, c) => {
    if (type == 1) {
        const map = await getPermissionObjStaffByUser(c.user_id, false, [STAFF.DieuPhoiKinhDoanh])
        const or = [{user_sale_id: c.user_id}]
        if (map.category.length) {
            or.push({category_id: seqIn(map.category)})
        }
        const where = seqOr(or)
        where.type = 1
        c.data = await getListBoV2RequiredMd(where)
        c.mess = c.MESS.getData
        return
    }
    c.data = []
    c.mess = c.MESS.getData
}

/**
 *
 * @param p
 * @param c {Controller}
 * @returns {Promise<void>}
 */
export const addRequiredLook = async ({
                                          product_id
                                      }, c) => {

    c.runValid(product_id)
    if (c.v()) return
    const product = await getDetailBoV2ProductMd({id: product_id})
    if (product === null) {
        c.status = false;
        c.mess = `Không tìm thấy sản phẩm`
        return
    }
    const category = await getDetailBOCategoryMd({id: product.category_id})
    c.data = await addBoV2RequiredMd({
            status: 1,
            user_sale_id: c.user_id,
            building_id: product.building_id,
            product_id,
            category_id: product.category_id,
            // bug_log_time: sum_minus(category.keeping_time),
            bill_id: 0,
            type: 1,
        }
    )
    c.mess = c.MESS.addData
}


