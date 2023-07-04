import {
    addUser,
    countUser, deleteUser, expListUser,
    getDetailUser,
    getInfoUser, getListCustomerBeforeDel, getListDelCustomer,
    getListUser, getListUserV2,
    importUser, recallCustomer,
    updateUser
} from "@controller/userController";
import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";
import {Upload, uploadFile} from "@middleware/multer";


class User extends MethodBase {
    static config_middleware = {};
}

User.get = {
    getInfoUser  ,
    getListUser   ,
    getDetailUser  ,
    countUser,
    getListUserV2,
    expListUser,
    getListCustomerBeforeDel
}
User.update  = {
    recallCustomer,

}
User.insert = {
    importUser    ,
    addUser   ,
    updateUser
}
User.delete = {
    deleteUser
}
User.middleware = [verifyToken]
User.config_middleware.importUser = [ new Upload("file")]
export default User;
