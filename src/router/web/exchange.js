import {MethodBase} from "@lib";
import {
    addExchange,
    countExchange,
    deleteExchange, getDetailExchange,
    getListExchange,
    updateExchange
} from "@controller/exchangeController";
import {verifyToken} from "@middleware/vetifyToken";

class Exchange extends MethodBase {
    static config_middleware = {};
}
Exchange.get={
    getListExchange,
    countExchange,
    getDetailExchange
}
Exchange.update={
    addExchange,
    updateExchange,
    deleteExchange
}
Exchange.middleware = [verifyToken]
export default Exchange;
