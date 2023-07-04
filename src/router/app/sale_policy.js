
import {getDetailSalePolicyV2} from "@controller/salePolicyController";

import {verifyToken} from "@middleware/vetifyToken";

import {MethodBase} from "@lib";

class Sale_policy extends MethodBase {
    static config_middleware = {};
}

Sale_policy.get = {
    getDetailSalePolicy: getDetailSalePolicyV2,
}
Sale_policy.middleware = [verifyToken]

export default Sale_policy