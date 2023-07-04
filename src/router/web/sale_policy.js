import {
    addSalePolicy,
    countSalePolicy,
    getDetailSalePolicy,
    getListSalePolicy,
    updateSalePolicy
} from "@controller/salePolicyController";

import {MethodBase} from "@lib";

import {verifyToken} from "@middleware/vetifyToken";

class Sale_policy extends MethodBase{
    static config_middleware = {};
}


Sale_policy.update  = {
    updateSalePolicy
}
Sale_policy.insert={
    addSalePolicy
}
Sale_policy.get = {
    getListSalePolicy,
    getDetailSalePolicy,
    countSalePolicy,

}
Sale_policy.middleware=[verifyToken]
export default Sale_policy

