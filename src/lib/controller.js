import {getConfigVal, MESS} from "@constant";
import {Validate} from "@lib";
import {resFail, resSuccess} from "@util";

export class Controller {
    constructor(language, excel = false) {
        this.MESS = new MESS(language);
        this.runFist = false;
        this.data = {};
        /** @type {string}     */
        this.mess = "";
        this.language = language;
        this.status = true;
    }

    /** @type {{filename: string , headers: []},any}*/
    rest = {};

    /**
     * @param obj
     * @return {Validate|void}
     */

    runValid(obj) {
        if (this.runFist && !this.status) return;
        const valid = Validate.valid(obj, this.language);
        this.mess = valid.mess;
        this.status = valid.status;
        this.runFist = true;
        if (!valid.status) this.keyVal = valid.key;
    }

    /**
     * @param obj
     * @return {Validate|void}
     */
    runValidAlNull(obj) {
        if (this.runFist && !this.status) return;
        const valid = Validate.validAllowNull(obj, this.language);
        this.status = valid.status;
        this.mess = valid.mess;
    }

    runValidOr(obj) {
        if (this.runFist && !this.status) return;
        const valid = Validate.validDateOr(obj, this.language);
        this.status = valid.status;
        this.mess = valid.mess;
    }

    res = (mess, data) => {
        return resSuccess(this.mess || mess, this.data || data);
    };
    resF = (mess, data = {}) => {
        return resFail(this.mess || mess, data);
    };

    end() {
        if (this.status) return resSuccess(this.mess, this.data, this.rest);
        return resFail(this.mess, this.data, this.rest);
    }

    end_err(mess = false) {
        return resFail(mess || this.MESS.err_link);
    }

    /** @type {Pub_users}*/
    pubUser;

    /** @type {Bdc_v2_user_info|{token , isAdmin}}*/
    userInfo;

    /** @type {string}*/
    authorization;
    /**
     * @type {{client_id : string,build : string,device_name ,js_ver,native_ver,os,os_ver,bundle_id,type}}
     */
    info;

    /**@type {Number}*/
    user_id;

    building_id;

    is_mater =false
    v() {
        return !this.status;
    }

    token;
    company_id = 0
    exchange_id =0
    apply_resp(resp) {
        this.status = resp.status;
        this.mess = resp.mess;
        this.data = resp.data || {};
    }

    /**
     *
     * @param avg{{
     * f,
     * v,
     * n ,
     * c : "Allow0&EmptyString"|"AllowUndefined"|"Normal"|any ,
     * m
     * }} f : là hàm validate hoặc biểu thức chính quy , v là giá trị cần validate , c nếu c = true bỏ qua cac trường hợp = 0 và bẳng chuỗi rỗng , m là mess trả về thay thế
     */
    valid = (...avg) => {
        if (this.runFist && !this.status) return;
        for (let avgElement of avg) {
            const status = handleValid(avgElement);
            if (status === false) {
                this.status = false;
                const nameCgf = getConfigVal(avgElement.n, this.language,avgElement.m );
                this.mess = nameCgf;
                return;
            }
        }
        this.runFist = true;
    };

    /**
     *
     * @param avg{{f, v, n}}
     */
    validAlU = (...avg) => {
        if (this.runFist && !this.status) return;
        for (let avgElement of avg) {
            const status =
                avgElement.v === undefined ||
                avgElement.v === "" ||
                handleValid(avgElement);
            if (status === false) {
                this.status = false;
                const nameCgf = getConfigVal(avgElement.n, this.language);
                this.mess = nameCgf;
                return;
            }
        }
        this.runFist = true;
    };

    /**
     *
     * @type {"JSON","FILE_EXEL","REDIRECT_LICK"}
     */
    type_return = "JSON"
    /**
     *
     * @type {{ havPermission : boolean,master: boolean, nhanvienbanhang: boolean, khachhang: boolean, giamdocsan: boolean, dieuphoikinhdoanh: boolean, truongphong: boolean, dichvukhachhang: boolean, truongnhom: boolean, ketoan: boolean}}
     */
    p = {
        master : false,
        nhanvienbanhang :false,
        khachhang : false ,
        giamdocsan : false,
        dieuphoikinhdoanh : false,
        dichvukhachhang : false,
        ketoan : false ,
        truongphong : false,
        truongnhom : false,
        havPermission : false
    }
}


/**
 *
 * @param avg
 */

export const handleValid = ({f, v, c = "Normal"}) => {
    if (typeof f === "function") {
        if (c === "AllowUndefined" && v === undefined){
            return  true
        }
        return f(v) ;
    }
    if (f instanceof RegExp) {
        if (c === "AllowUndefined" && v === undefined){
            return  true
        }
        return f.test(v);
    }

    if (c === "Normal") return Boolean(v)
    if (c === "AllowUndefined") return Boolean(v) || v ===  undefined;
    if(c === "Allow0&EmptyString")
    return v === "" || v === 0 || Boolean(v);
};
