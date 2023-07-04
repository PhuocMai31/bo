import {cacheRedis} from "@lib";
import {getDetailCityMd} from "@model/city";
import {getDetailDistrictsMd} from "@model/districts";
import {getDetailWardMd} from "@model/ward";


export const getDetailCityRp = (code) => {
    code = `${Number(code)}`.length === 1 ? `0${Number(code)}` : code
    return cacheRedis("getDetailCityRp_" + code, () => {
        return getDetailCityMd({code})
    })

}


export const getDetailDistrictsRp = (gso_id) => {
    gso_id = `${Number(gso_id) +1000}`.slice(1,4);
    return cacheRedis("getDetailDistrictsRp" + gso_id, () => {
        return getDetailDistrictsMd({gso_id})
    })
}

export const getDetailWardsRp = (gso_id) => {
    gso_id = `${Number(gso_id) +100000}`.slice(1,7);
    return cacheRedis("getDetailWardsRp" + gso_id, () => {
        return getDetailWardMd({gso_id : gso_id})
    })
}
