import { MethodBase } from "@lib";
import {
    getDetailDistricts,
    getDetailWard,
    getListCities,
    getListDistricts,
    getListWard
} from "@controller/addressController";
import {verifyToken} from "@middleware/vetifyToken";
class Address extends MethodBase {
    static config_middleware = {};
}
Address.get={
    getListCities,
    getListDistricts,
    getListWard   ,
    getDetailWard   ,
    getDetailDistricts
}
Address.middleware  = [verifyToken]
export default Address;
