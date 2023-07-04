import {mauHopDong} from "@controller/billController";
import {MethodBase} from "@lib";


class Bill extends MethodBase {
    static config_middleware = {};
}


Bill.get = {
    mauHopDong
}

export default Bill
