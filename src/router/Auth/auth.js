import {changePword, forgetAccount, getUserInfo, login, setPword, verifyAccount} from "@controller";
import { MethodBase } from "@lib";
import { verifyToken } from "@middleware/vetifyToken";
class Auth extends MethodBase {
  static config_middleware = {};
}

Auth.get = getUserInfo;

Auth.update = { login  ,forgetAccount, verifyAccount ,setPword,changePword};


Auth.config_middleware.get = [verifyToken];
Auth.config_middleware.changePword = [verifyToken];
export default Auth;
