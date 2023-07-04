import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";
import {updateFiles} from "@util";
import {Upload} from "@middleware/multer";
import fileUpload from "express-fileupload";
import {fTest} from "@controller/test";

class Test extends MethodBase {
    static config_middleware = {
        fileUpload: fileUpload({createParentPath: true}),
    };
}

Test.insert = {
    fTest
}
Test.middleware = [verifyToken]

Test.config_middleware.fTest = [new Upload("file"),verifyToken];
export default Test;