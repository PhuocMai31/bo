import {MethodBase} from "@lib";
import {getListSource} from "@controller/sourceController";
import {verifyAccount} from "@controller";
import {verifyToken} from "@middleware/vetifyToken";
import {addFirebaseTokenPush} from "@controller/firebaseTokenPushController";

class TokenPush extends MethodBase{
    static config_middleware = {};
}

TokenPush.insert={
    addFirebaseTokenPush
}
TokenPush.middleware = [verifyToken]
export default TokenPush
