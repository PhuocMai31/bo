import {
    getDetailBoV2UserInfoMd,
    getDetailBoV2UserMd,
    getListBoV2UserTokenMd,
    updateBoV2UserMd,
    updateBoV2UserTokenMd
} from "@model";
import {generateNumber, resFail, resSuccess, sendToTelegram} from "@util";
import {LANGUAGE} from "@constant";
import SendMail from "../api/sendMail";
import {addLogRp, rdDel, rdGet, rdSet} from "@lib";
import bcrypt from "bcrypt";
import {Op} from "sequelize";
import {remap} from "lodash/fp/_mapping";

/**
 *
 * @param email
 * @param info
 * @param c {Controller}
 * @return {Promise<{data: {}, message, status: true}|{rest, data: {}, message, status: string}|{data: {}, message, status: false}|{rest: boolean, data: {}, message, status: string}>}
 */
export const forgetAccountRp = async (email = {}, info = false, c) => {
    const user = await getDetailBoV2UserMd({
        email,
        deleted_at: null,
        status: 1
    });
    if (!user) return resFail(c.MESS.user_not_register);
    const data = {step: 1, id: user.id, code: generateNumber(6), email};
    const user_info = await getDetailBoV2UserInfoMd({user_id: user.id});
    const isSend = await SendMail.sendOtp(
        email, data.code,
        user_info?.full_name || email,
    );
    if (!isSend) return resFail(c.MESS.err_send_code);
    const token = $.genTokenVerify(data);
    return resSuccess(c.MESS.success, {token, email});
};


export const verifyAccountRp = async (token, code, email = {}, c) => {
    const info = await rdGet(token);
    if (info === null) return resFail(c.MESS.err_time_exp_verify);
    if (email && info.step === 1) {
        const checkStep = info.email === email && info.code === code;
        if (checkStep) {
            await rdSet(token, {...info, step: 2}, 60 * 10);
            return resSuccess(c.MESS.success);
        }
    }
    return resFail(c.MESS.err_verify_data);
};


export const setPwordRp = async (token, pword, email) => {
    // bcrypt                            authRepo
    const info = await rdGet(token);
    let mess = "";
    const validAccount = info.email && info.email === email;
    const validStep = info.step === 2;
    if (!info) mess = "đã quá thời hạn thay đổi mật khẩu";
    else if (info && validAccount && validStep) {
        //  ma hoa va update password
        const pwordEncoded = await bcrypt.hash(pword, 10);
        //  luu lai vao db
        await updateBoV2UserMd(
            {pword: pwordEncoded},
            {id: info.id}
        );
        //  xoa token
        rdDel(token);
        return {status: true, result: info};
    } else if (!validStep) {
        await sendToTelegram("step forget err ");
        await addLogRp("setPE", {info}, 12 * 60 * 60);
        mess = "vui lòng thoát ứng dụng và thực hiện lại thao tác";
    } else if (!validAccount) {
        await sendToTelegram("valid account err ");
        await addLogRp("setPE", {info}, 12 * 60 * 60);
        mess = "có lỗi xảy ra vui lòng thao tác lại";
    }
    return {status: false, mess};
};


export const getListTokenExpire = async (userId) => {
    const now = Math.floor(new Date().getTime() / 1000);
    return getListBoV2UserTokenMd({
        time_expired: {[Op.gte]: now},
        user_id: userId,
        deleted_at: null,
    });
};


export const clearTokenRd = async (listToken) => {
    for (let index = 0; index < listToken.length; index++) {
        await rdDel(listToken[index].token);
    }
};

export const clearTokenDB = (userId) => {
    const now = Math.floor(new Date().getTime() / 1000);
    return updateBoV2UserTokenMd(
        {time_expired: now, updated_at: new Date()},
        {user_id: userId}
    );
};

export const clearToken = async (userId, clearDb = true) => {
    const listToken = await getListTokenExpire(userId);
    await clearTokenRd(listToken);
    clearDb && await clearTokenDB(userId);
};
