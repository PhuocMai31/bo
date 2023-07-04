import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";
import {
    browseExplanations,
    countFilterViolatingCustomers, countSaleViolation, forgiveViolation,
    getDetailFilterViolatingCustomers,
    getListFilterViolatingCustomersOfManager,
    getListFilterViolatingCustomersOfSale, getListSaleViolation, sendExplanation
} from "@controller/saleViolationController";
import {Upload} from "@middleware/multer";


class Sale_violation extends MethodBase{
    static config_middleware = {};
}
Sale_violation.get = {
    getListFilterViolatingCustomersOfSale,
    getListFilterViolatingCustomersOfManager,
    countFilterViolatingCustomers,
    getDetailFilterViolatingCustomers,
    getListSaleViolation,
    countSaleViolation
}
Sale_violation.insert={
    sendExplanation
}
Sale_violation.update={
    browseExplanations,
    forgiveViolation
}


Sale_violation.config_middleware.sendExplanation=[new Upload([
    { name: 'image', maxCount: 8 }
],"fields")]
Sale_violation.middleware  = [verifyToken]


export default Sale_violation
