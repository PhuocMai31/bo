import {
    addUserLoginRp,
    checkToken, genToken,
    loginUserRp,
} from "@repository";
import {$} from "@lib";
import {resFail} from "@util";
import {clearToken, forgetAccountRp, setPwordRp, verifyAccountRp} from "@repository/authRepo";
import {LANGUAGE} from "@constant";
import {getDetailBoV2UserInfoMd, getDetailBoV2UserMd, updateBoV2UserMd} from "@model";
import bcrypt from "bcrypt";

/**
 * @param p
 * @param c {Controller}
 */
export const register = async ({phone = "", password, username}, c) => {
    c.runValid({phone, password, username});
    if (c.v()) return;
    phone = $.convertPhone(phone);
    const res = await addUserLoginRp(phone, password, username, c.info.client_id);
    if (!res.status) return res;
    c.mess = "thêm tài khoản thành công";
    c.data = res.data;
};
/**
 * @param p
 * @param c { Controller}
 */
export const getUserInfo = async (p, c) => {
    const result = await checkToken(c.token, c.info.client_id);
    if (result.status) {
        c.data = result.data.userInfo;
    }
    c.mess = result.mess;
};
/**
 * @param p
 * @param c {Controller}
 */
export const login = async ({email, password, username}, c) => {
    c.runValid({password,username});
    if (c.v()) return;
    const result = await loginUserRp(undefined, username, password, c.info);
    c.status = result.status
    c.data = result.data;
    c.mess = result.mess;
};
/**
 * @param p
 * @param c {Controller}
 */
export const forgetAccount = async (p, c) => {
    let {email  , username} = p;
    c.runValidOr({email , username})
    if (c.v()) return
    if(username ){
        const user = await  getDetailBoV2UserMd({username :username ,status :1})
        if(user === null){
            c.mess = "không tìm thấy tài koản có user name là " + username + " trên hệ thống"
            c.status =false
            return
        }
        email = user.email
    }
    const response = await forgetAccountRp(email, false, c);
    c.apply_resp(response)
};


/**
 * @param p
 * @param c {Controller}
 */
export const verifyAccount = async (p, c) => {
    let {
        email,
        token,
        code,
    } = p;

    c.runValid({email, code})
    if (c.v()) return
    const response = await verifyAccountRp(token, code, email, c);
    c.apply_resp(response);
};


/**
 *
 * @param p
 * @param c {Controller}
 * @return {Promise<(boolean|string)[]|[boolean,undefined,{},undefined]|[boolean,undefined,{}]>}
 */
export const setPword = async (p, c) => {
    const {
        email,
        token,
        pword,
    } = p;
    c.runValid({email, token, pword})
    if (c.v()) return
    if (pword.length < 6) {
        c.mess = c.MESS.err_pass_length
        c.status = false
        return
    }

    const userInfo = await setPwordRp(token, pword, email);
    c.apply_resp(userInfo)
    if (c.v())   return
    await clearToken(userInfo.result.id);

    const user = await getDetailBoV2UserMd({id: userInfo.result.id})

    const tokenNew = await genToken(user, c.info);

    c.mess = c.MESS.change_pass_success
    c.data = {token: tokenNew.token}
};


/**
 * @param p
 * @param c {Controller}
 * @return {Promise<void>}
 */
export const changePword = async (p, c) => {

    const {oldPassword, password} = p
    const valid = !oldPassword || !password || `${password}`.length < 6;
    if (valid) {
        c.mess = "Mật khẩu mới không được bé hơn 6 ký tự"
        c.status = false
        return
    }
    const user = await getDetailBoV2UserMd({id: c.user_id});
    const validUser =
        !user ||
        !(await bcrypt.compare(oldPassword, user.pword));

    if (validUser) {
        c.mess = "mật khẩu cũ không trùng nhau "
        c.status = false
        return
    }
    await updateBoV2UserMd({pword:await bcrypt.hash(password, 10)}, {id: c.user_id})
    await clearToken(user.id);
    c.mess = "Thay đổi mật khẩu thành công"
}
