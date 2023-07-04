import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";

import {
    browseExplanations,
    cancelExplanation,
    countFilterViolatingCustomers,
    countFilterViolatingCustomersOfManager,
    getDetailFilterViolatingCustomers,
    getListFilterViolatingCustomersOfManager,
    getListFilterViolatingCustomersOfSale,
    sendExplanation
} from "@controller/saleViolationController";
import {Upload} from "@middleware/multer";

class Sale_violation extends MethodBase{
    static config_middleware = {};
}

Sale_violation.get = {
    getListFilterViolatingCustomersOfSale,
    getListFilterViolatingCustomersOfManager,
    countFilterViolatingCustomersOfManager,
    countFilterViolatingCustomers,
    getDetailFilterViolatingCustomers,
}
Sale_violation.insert={
    sendExplanation,
    cancelExplanation,
}
Sale_violation.update={
    browseExplanations
}
Sale_violation.config_middleware.sendExplanation=[new Upload([
    { name: 'image', maxCount: 8 }
],"fields")]
Sale_violation.middleware  = [verifyToken]


export default Sale_violation