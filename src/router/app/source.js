import {MethodBase} from "@lib";
import {getListSource} from "@controller/sourceController";
import {verifyAccount} from "@controller";
import {verifyToken} from "@middleware/vetifyToken";

class Source extends MethodBase{
    static config_middleware = {};
}
Source.get={
    getListSource
}
Source.middleware = [verifyToken]
export default Source
