import {addBoV2CartMd, updateBoV2CartMd} from "@model/bo_v2_cart";
import {generateNumber} from "@util";
import {addBoV2PermissionGroupMemberMd, delBoV2PermissionGroupMemberMd, sequelize} from "@model";
import {addBoV2CartMemberMd, delBoV2CartMemberMd} from "@model/bo_v2_cart_member";
import {updateBoV2CartProductMd} from "@model/bo_v2_cart_history";
import {del} from "express/lib/application";

/**
 *
 * @param category_id
 * @param name
 * @param time_hold
 * @param desc
 * @param cb_code
 * @param user_id_manager {[{user_id}]}
 * @param user_ids {[{user_id}]}
 * @param company_id
 * @param image
 * @returns {Promise<void>}
 */
export const addCartRp = async (
    category_id,
    name,
    time_hold,
    desc,
    cb_code,
    user_id_manager, user_ids, company_id,
    image
) => {
    const data = await addBoV2CartMd({
        category_id,
        name,
        time_hold,
        desc,
        code: `${cb_code}_${generateNumber(6)}`,
        company_id,
        status: 1,
        image
    })

    for (let userManagerElement of user_id_manager) {
        await addBoV2PermissionGroupMemberMd({
            staff_object_id: "quanlydohang",
            user_id: userManagerElement.user_id,
            scope_type: "cart",
            scope_id: data.id,
        })
    }
    for (let userIdsS of user_ids) {
        await addBoV2CartMemberMd({
            user_id: userIdsS.user_id,
            cart_id: data.id,
        })
    }
    return data
}

/**
 *
 * @param id
 * @param name
 * @param category_id
 * @param desc
 * @param code
 * @param image
 * @param time_hold
 * @param user_id_sale {[{user_id ,deleted_at, id}]}
 * @param user_id_manager {[{ id,user_id,deleted_at }]}
 * @param company_id
 * @param status
 *
 * @returns {Promise<void>}
 */
export const updateCartRp = async (id, name, category_id, code, desc, time_hold, user_id_sale, user_id_manager, company_id, status,image) => {
    const transaction = await sequelize.transaction()
    try {
        await updateBoV2CartMd({id, name, category_id, code, desc, time_hold, company_id, status,image}, {id}, transaction)
        if (user_id_sale) {

            for (let userIdSaleElement of user_id_sale) {
                if (userIdSaleElement.id && userIdSaleElement.deleted_at === 1) {
                    await delBoV2CartMemberMd({id : userIdSaleElement.id}, transaction)
                } else {
                    await addBoV2CartMemberMd({
                        user_id: userIdSaleElement.user_id,
                        cart_id: id,
                    }, transaction)
                }
            }
        }
        if (user_id_manager) {
            for (let userIdManagerElement of user_id_manager) {
                if (userIdManagerElement.deleted_at === 1 && userIdManagerElement.id) {
                    await delBoV2PermissionGroupMemberMd({id :userIdManagerElement.id}, transaction)
                } else {
                    await addBoV2PermissionGroupMemberMd({
                        staff_object_id: "quanlydohang",
                        user_id: userIdManagerElement.user_id,
                        scope_type: "cart",
                        scope_id: id,
                    }, transaction)
                }
            }
        }
        await transaction.commit()

    } catch (e) {
        await transaction.rollback()
        throw  e
    }
}
