import {MethodBase} from "@lib";
import {getInfoUser, getListUserInfo, updateUser} from "@controller/userController";
import {verifyToken} from "@middleware/vetifyToken";
import {Upload} from "@middleware/multer";


class User extends MethodBase{
    static config_middleware = {};
}
User.get={
    getListUserInfo
}
User.update = {
    updateUser
}
User.middleware = [verifyToken]
User.config_middleware.updateUser = [ new Upload("file")]

export default User;