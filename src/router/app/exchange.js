import {MethodBase} from "@lib";
import {
    addExchange,
    deleteExchange,
    getDetailExchange,
    getListExchange, getListExchangeOrGroup,
    updateExchange
} from "@controller/exchangeController";
import {verifyAccount} from "@controller";
import {verifyToken} from "@middleware/vetifyToken";

class Exchange extends MethodBase {
    static config_middleware = {};
}
Exchange.get={
    getListExchange,
    getDetailExchange,
    getListExchangeOrGroup
}
Exchange.update={
    addExchange,
    updateExchange,
    deleteExchange
}
Exchange.middleware=[verifyToken]
export default Exchange;
