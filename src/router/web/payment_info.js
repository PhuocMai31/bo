import {MethodBase} from "@lib";

import {verifyToken} from "@middleware/vetifyToken";
import {
    addPaymentInfo,
    countPaymentInfo, delPaymentInfo,
    getDetailPaymentInfo,
    getListPaymentInfo,
    updatePaymentInfo
} from "@controller/paymentInfoController";

class Payment_info extends MethodBase{
    static config_middleware = {};
}


Payment_info.get={
    getListPaymentInfo,
    countPaymentInfo,
    getDetailPaymentInfo
}

Payment_info.update={
    updatePaymentInfo
}
Payment_info.insert = {
    addPaymentInfo
}
Payment_info.delete = {
    delPaymentInfo
}
Payment_info.middleware = [verifyToken]
export default Payment_info
