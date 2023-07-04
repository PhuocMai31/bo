import {validNumber} from "@util";
import base64 from "base-64";
import utf8 from "utf8";
import {Op} from "sequelize";
import {del} from "express/lib/application";

export const generateNumber = (length) => {
    let result = "";
    for (var i = 0; i < length; i++) {
        result += Math.floor(Math.random() * 10);
    }
    return result;
};
/**
 *  tạo ra số ngẫu nhiên dựa theo thời gian dài nhất là 14 số
 * @param length
 * @returns {number}
 */
export const getNowTimeStamp = (length = 14) => {
    return Number(`${new Date().getTime()}`.slice(0, length));
};
export const queryLike = (object, and = false) => {
    let string = "";
    let i = 0;
    for (const key in object) {
        if (object[key]) {
            string += ` ${i !== 0 || and == true ? "and" : ""}  ${key} like '%${
                object[key]
            }%' `;
            i = 1;
            and = true;
        }
    }
    return string;
};
export const seqLike = (name) => {
    return {[Op.like]: `%${name}%`}
}
/**
 *
 * @param arr {[]}
 * @returns {{}}
 */
export const seqOr = (arr) => {
    return {[Op.or]: arr}
}
export const seqIn = (arr) => {
    if (Array.isArray(arr))
        return {[Op.in]: arr}
    return {[Op.in]: [arr]}
}
export const seqAnd = (arr) => {
    return {[Op.and]: arr}
}

export const queryEqual = (object, and = false) => {
    let string = "";
    let i = 0;
    for (const key in object) {
        if (object[key]) {
            string += ` ${i !== 0 || and == true ? "and" : ""}  ${key} = '${
                object[key]
            }' `;
            i = 1;
            and = true;
        }
    }
    return string;
};

/**
 *
 * @param list
 * @param key
 * @returns {*[]}
 */
export const convertListObjectToArr = (list, key) => {
    const arr = [];
    for (let i = 0; i < list.length; i++) {
        arr.push(list[i][key]);
    }
    return arr;
};

export const convertListObjectToArrObject = (list, key) => {
    const arr = [];
    for (let i = 0; i < list.length; i++) {
        const item = {};
        for (let j = 0; j < key.length; j++) {
            item[key[j]] = arr[i][key[j]];
        }
        arr.push(item);
    }
    return arr;
};

export const groupObject = (arr, key, valueDefault) => {
    const result = arr[0];
    for (let i = 0; i < result.length; i++) {
        result[i] = {...valueDefault, ...result[i]};
    }
    for (let i = 1; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            const index = result.findIndex((value) => value[key] == arr[i][j][key]);
            result[index] = {...valueDefault, ...result[index], ...arr[i][j]};
            if (arr[i].length === 0) {
                // console.log("check");
                // result[i] = { ...valueDefault, ...result[i] };
            }
        }
    }
    return result;
};

export const groupObjectByMonth = (arr, key, valueDefault, list) => {
    const result = [];
    for (let i = 0; i < list.length; i++) {
        let item = {...valueDefault, [key]: list[i]};
        for (let index = 0; index < arr.length; index++) {
            const j = arr[index].findIndex((value) => value[key] == list[i]);
            item = {...item, ...arr[index][j]};
        }
        result.push(item);
    }
    return result;
};

export const generateId = (characterNo, stringArr = []) => {
    return `${characterNo}${stringArr.join("")}${new Date().getTime()}`;
};

export function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(
        /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
        " "
    );
    return str;
}

export const showMoneyVND = (money) => {
    if (typeof money !== "number") money = Number(money);
    return money.toLocaleString("it-IT", {style: "currency", currency: "VND"});
};

export const getStrGender = (gender) => {
    if (gender == 1) {
        return "nam";
    } else if (gender == 2) {
        return "nữ";
    } else if (validNumber(gender)) return "khác";
    return "";
};

export const getRelationshipApartment = (relationship) => {
    if (typeof relationship !== "number") relationship = Number(relationship);
    switch (relationship) {
        case 0:
            return "chủ hộ";
        case 1:
            return "vợ chồng";

        case 2:
            return "con ";
        case 3:
            return "bố mẹ";
        case 4:
            return "anh chị em";
        case 5:
            return "khác";
        case 6:
            return "khách thuê";
        case 7:
            return "chủ hộ cũ";
        default:
            return "";
    }
};

export const offset = (limit = 10, page) =>
    page == 0 ? {} : {offset: page * limit - limit};
export const offsetQr = (limit = 10, page) => {
    console.log({limit, page});
    return page == 0 ? "" : `limit ${page * limit - limit},${limit} `;
};

/**
 *
 * @param value
 * @param condition {{}}
 * @return {Boolean}
 */
export const conditionObject = (value, condition) => {
    const keys = Object.keys(condition);
    for (let i = 0; i < keys.length; i++) {
        if (value == condition[keys[i]]) return true;
    }
    return false;
};
export const conditionObjectV2 = (key, value, condition) => {
    const keys = Object.keys(condition);
    for (let i = 0; i < keys.length; i++) {
        if (value === condition[keys[i]][key]) return true;
    }
    return false;
};
export const getObjectV2 = (key, value, condition) => {
    const keys = Object.keys(condition);
    for (let i = 0; i < keys.length; i++) {
        if (value === condition[keys[i]][key])
            return condition[keys[i]].config_code;
    }
    return false;
};
/**
 *
 * @param value
 * @param valid
 * @return {boolean}
 */
export const checkExit = (value, valid) => {
    if (!value) return true;
    return valid;
};

export const decodeParamsDefault = (value) => {
    return JSON.parse(utf8.decode(base64.decode(value)));
};


export const makeid = (length) => {
    let result = "";
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
/**
 *
 * @param object  {any}
 */
export const objIsEmpty = (object) => {
    const object2 = {}
    for (let key of Object.keys(object)) {
        if (object[key] === undefined) {

        }
        object2[key] = object[key]
    }
    return Object.keys(object2).length === 0;
}

/**
 *
 * @param group_permission_member {Bo_v2_permission_group_member[]}
 */
export const mapPermission = (group_permission_member) => {
    const exchange = []
    const group = []
    const campaign = []
    const cart = []
    const category = []
    group_permission_member.map((value) => {
        switch (value.scope_type) {
            case "campaign" :
                campaign.push(value.scope_id)
                break
            case "department" :
                exchange.push(value.scope_id)
                break
            case "group" :
                group.push(value.scope_id)
                break
            case "cart" :
                cart.push(value.scope_id)
                break
            case "category" :
                category.push(value.scope_id)
                break
            default :
                break
        }

    })

    return {
        exchange,
        group,
        campaign,
        cart,
        category
    }
}

function isObject(value) {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
    );
}

/**
 *
 * @param obj {Object}
 */
export function removeBuffer(obj) {
    if (Buffer.isBuffer(obj)) {
        return "buffer"
    }
    if (isObject(obj)) {
        for (let key of Object.keys(obj)) {
            if (Buffer.isBuffer(obj[key])) {
                obj[key] = "buffer"
            } else {
                if (typeof obj === "object") {
                    obj[key] = removeBuffer(obj[key])
                }
            }
        }
    } else if (Array.isArray(obj)) {
        for (let i = 0; i < obj.length; i++) {
            if (Buffer.isBuffer(Object[i])) {
                obj[i] = "buffer"
            } else {
                if (typeof obj === "object")
                    obj[i] = removeBuffer(obj[i])
            }
        }
    }
    return obj
}
