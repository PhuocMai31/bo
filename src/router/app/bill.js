import {MethodBase} from "@lib";

import {verifyToken} from "@middleware/vetifyToken";
import {getListBill, themHopDongTuVan} from "@controller/billController";

class Bill extends MethodBase{
    static config_middleware = {};
}

Bill.insert = {
    themHopDongTuVan
}
Bill.get={
    getListBill
}
Bill.middleware = [verifyToken]
export default Bill