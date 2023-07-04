import {MethodBase} from "@lib";
import {
    getListInvestor,
    countInvestor,
    getDetailInvestor,
    updateInvestor,
    addInvestor,
    deleteInvestor,
} from "@controller"
import {verifyToken} from "@middleware/vetifyToken";

class Investor extends MethodBase {
    static config_middleware = {};
}


Investor.get = {
    getListInvestor,
    countInvestor,
    getDetailInvestor
}

Investor.update = {
    updateInvestor,
    deleteInvestor,
}
Investor.insert = {
    addInvestor
}
Investor.middleware = [verifyToken]
export default Investor
