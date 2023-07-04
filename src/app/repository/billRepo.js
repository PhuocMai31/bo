import {addBoV2BillMd} from "@model/bo_v2_bill";
import {STATUS_BILL, TYPE_BILL, TYPE_BILL_CODE} from "@constant";
import {generateNumber} from "@util";
import {formatDateMoment} from "@lib";

export const themHopDongTuVanRp = (user_sale_id, note, customer_id, campaign_sale_id, category_id, building_id, wish ,info_customer) => {
    return addBoV2BillMd({
        info_customer,
        user_sale_id,
        note,
        type: TYPE_BILL.hdtv,
        building_id,
        category_id,
        campaign_sale_id,
        wish,
        status: STATUS_BILL.them_khach_hang_dat_cho,
        code: TYPE_BILL_CODE.qttv + "_" + formatDateMoment("YYYYMMDD") + "_" + generateNumber(10)
    })
}