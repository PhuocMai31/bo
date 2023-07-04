import City from "@model/city";
import Districts, {getDetailDistrictsMd} from "@model/districts";
import Ward, {getDetailWardMd} from "@model/ward";
import {REGEX} from "@constant";

/**
 * @param p
 * @param c {Controller}
 */
export const getListCities = async (p, c) => {
    c.data = await City.findArr({}, false, false, false, false, false, [["id", "value"], ["name", "text"]])
}
/**
 * @param p
 * @param c {Controller}
 */
export const getListDistricts = async (p, c) => {
    const regex = REGEX.SO_NGUYEN_DUONG
    if (regex.test(p.province_id)) {
        c.data = await Districts.findArr({
            province_id: p.province_id
        }, false, false, false, false, false, [["id", "value"], ["name", "text"]])
    } else {
        c.status = false
        c.mess = "Vui long nhap chinh xac ma Quan, Huyen"
    }

}
/**
 * @param p
 * @param c {Controller}
 */
export const getListWard = async (p, c) => {
    const regex = REGEX.SO_NGUYEN_DUONG
    if (regex.test(p.district_id)) {
        c.data = await Ward.findArr({
            district_id: p.district_id
        }, false, false, false, false, false, [["id", "value"], ["name", "text"]])
    } else {
        c.status = false
        c.mess = "Vui long nhap dung ma Xa, Phuong"
    }
}

/**
 *
 * @param p
 * @param c {Controller}
 */
export const getDetailWard = async ({id}, c) => {
    c.runValid({id})
    if (c.v()) return
    c.data = await getDetailWardMd({id},false, [["name", "text"], ["id", "value"]])
    c.mess = c.MESS.getData
}
/**
 *
 * @param p
 * @param c {Controller}
 */
export const getDetailDistricts = async ({id}, c) => {
    c.runValid({id})
    if (c.v()) return
    c.data = await getDetailDistrictsMd({id}, false, [["name", "text"], ["id", "value"]])
    c.mess = c.MESS.getData
}
