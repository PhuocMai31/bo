import {
    addSource,
    countSource,
    getDetailSource,
    getListSource,
    updateSource,
    deleteSource
} from "@controller/sourceController";



import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";

class Source extends MethodBase{
    static config_middleware = {};
}
Source.get = {
    getListSource,
    countSource,
    getDetailSource
}
Source.insert = {
    addSource
}
Source.update = {
    updateSource,
    deleteSource
}
Source.middleware = [verifyToken]
export default Source;
