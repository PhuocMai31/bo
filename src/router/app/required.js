
import {verifyToken} from "@middleware/vetifyToken";

import {MethodBase} from "@lib";
import {addRequiredLook, getListRequired} from "@controller/requeiredController";

class Required extends MethodBase {
    static config_middleware = {};
}


Required.get = {
    getListRequired

}
Required.insert = {
    addRequiredLook
}

Required.middleware = [verifyToken]

export default Required