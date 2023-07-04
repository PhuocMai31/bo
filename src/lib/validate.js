import {LIST_VALID} from "../constant/validate";
import {REGEX, TYPE_DATA, TYPE_VALID} from "@constant";
import {LANGUAGE} from "@constant";
import {res} from "@util";

export const Map_Valid = new Map();
LIST_VALID.forEach(({key, ...value}, index) => {
    Map_Valid.set(key, value);
});
/**
 *
 * @param valid  {Validate}
 * @return {String}
 */
const getMessageCharacterLang = (valid) => {
    switch (valid.language) {
        case "VI":
            return `${valid.name} không được nhỏ hơn ${valid.min} hoặc lớn hơn ${
                valid.max
            } ${valid.format === "string" ? " ký tự " : ""}`;
        case "EN":
            return `${valid.name} cannot be less than ${valid.min} or greater than ${
                valid.max
            }  ${valid.format === "string" ? "characters" : ""}`;
    }
};
// mess_min
// mess_max
/**
 *
 * @param valid  {Validate}
 * @return {String}
 */
const getMessMin = (valid) => {
    switch (valid.language) {
        case "VI":
            return `${valid.name} không được nhỏ hơn ${valid.min}  ${
                valid.format == "string" ? "ký tự" : ""
            } `;
        case "EN":
            return `${valid.name} cannot be less than ${valid.min}  ${
                valid.format == "string" ? "characters" : ""
            }`;
    }
};
/**
 *
 * @param Valid  {Validate}
 * @return {String}
 */
const getMessMax = (Valid) => {
    switch (Valid.language) {
        case "VI":
            return `${Valid.name} không được lớn hơn ${Valid.max} ${
                Valid.format == "string" ? " ký tự" : ""
            }`;
        case "EN":
            return `${Valid.name} cannot be larger than ${Valid.max} ${
                Valid.format == "string" ? "characters" : ""
            } characters`;
    }
};
/**
 *
 * @param valid  {Validate}
 * @return {String}
 */
const getMessFormat = (valid) => {
    switch (valid.language) {
        case "VI":
            return `${valid.name} không đúng định dạng`;
        case "EN":
            return `${valid.name} malformed`;
    }
};
/**
 *
 * @param valid  {Validate}
 * @return {String}
 */
const getMessNotEmpty = (valid) => {
    switch (valid.language) {
        case "VI":
            return ` không được bỏ trống  ${valid.name}`;
        case "EN":
            return ` cannot be empty ${valid.name}`;
    }
};
const getMessOr = (valid) => {
    switch (valid.language) {
        case "VI":
            return ` ${valid.name} không được bỏ trống`;
        case "EN":
            return `${valid.name} cannot be empty `;
    }
};

export class Validate {
    /**
     * @param format
     * @param name
     * @param regex
     * @param func {function}
     * @param min
     * @param max
     * @param type
     */
    constructor({
                    format,
                    name,
                    regex,
                    func = () => {
                    },
                    min = false,
                    max = false,
                    type = TYPE_VALID.REGEX,
                    status = false,
                    language,
                }) {
        this.format = format;
        if (typeof name == "string") {
            this.name = name;
        } else this.name = name ? name[language] : "";

        this.regex = regex;
        this.func = func;
        this.min = min;
        this.max = max;
        this.type = type;
        this.status = status;
        this.mess = "";
        this.language = language;
        this.is_null = false;
        this.key = "";
    }

    mess_character = () => getMessageCharacterLang(this);

    mess_min = () => getMessMin(this);
    mess_max = () => getMessMax(this);
    mess_format = () => getMessFormat(this);
    mess_not_null = () => getMessNotEmpty(this);
    messOr = (name) => {
        this.name = `${name}`;
        return getMessOr(this);
    };
    runValid = (value, allow_Null = false) => {
        this.mess = this.mess_format();
        if (allow_Null == true && !value) {
            this.status = true;
            this.is_null = true;
            return;
        }

        const v = validMapLiD(this.name, value);
        if (v) {
            this.name = v.mess;
            this.status = v.status;
            this.mess = this.mess_format();
            return;
        }
        if (typeof value == TYPE_DATA.STRING)
            if (
                typeof value == TYPE_DATA.STRING &&
                this.format == TYPE_DATA.STRING &&
                value.length == 0
            ) {
                this.status = false;
                this.mess = this.mess_format();
                return;
            }

        switch (this.type) {
            case TYPE_VALID.REGEX: {
                this.status = this.regex.test(value);
                break;
            }
            case TYPE_VALID.FUNC: {
                const result = this.func(value);
                if (!result) this.status = false;
                else this.status = true;
                break;
            }
            case TYPE_VALID.NUMBER_STRING: {
                const value_condition =
                    typeof value === "string" ? value.length : value;
                if (this.min && this.max) {
                    this.mess = this.mess_character();
                    this.status =
                        value_condition <= this.max && value_condition >= this.min;
                    break;
                }
                if (value_condition < this.min && this.max === false && this.min) {
                    this.mess = this.mess_min();
                    this.status = false;
                    break;
                }
                if (value_condition > this.max && this.min === false && this.max) {
                    this.mess = this.mess_max();
                    this.status = false;
                    break;
                }
                this.status = true;
                break;
            }
            case TYPE_VALID.FORMAT: {
                this.status = typeof value === this.format;
                break;
            }
            case TYPE_VALID.NOT_NULL: {
                if (!value && value !== 0) {
                    this.mess = this.mess_not_null();
                    this.status = false;
                    break;
                }
                this.status = true;
                break;
            }
        }
    };
    mesDateNotFound = () => LANGUAGE[this.language].error_not_found;
    /**
     * @param validObj : {}
     * @constructor
     */
    static valid = (validObj, language = "VI") => {
        for (const key of Object.keys(validObj)) {
            const data = Map_Valid.get(key) || {
                format: "String",
                type: TYPE_VALID.NOT_NULL,
            };
            data.language = language;
            if (!data.name) data.name = key;
            const valid_var = new Validate(data);
            valid_var.runValid(validObj[key]);
            if (valid_var.status === false) return valid_var;
        }
        return new Validate({status: true});
    };
    /**
     * @param validObj
     * @return {Validate}
     */
    static validAllowNull = (validObj, language = "VI") => {
        for (const key of Object.keys(validObj)) {
            const data = Map_Valid.get(key) || {
                format: "string",
                type: TYPE_VALID.NOT_NULL,
            };

            data.language = language;
            const valid_var = new Validate(data);
            valid_var.name = key;
            valid_var.runValid(validObj[key] || "", true);
            if (valid_var.status === false) return valid_var;
        }
        return new Validate({status: true});
    };

    static validDateOr(validObj, language = "VI") {
        let check = false;
        const name = [];
        for (const key of Object.keys(validObj)) {
            const data = Map_Valid.get(key) || {
                format: "String",
                type: TYPE_VALID.NOT_NULL,
            };
            data.language = language;
            const valid_var = new Validate(data);
            valid_var.key = key;
            name.push(valid_var.name);
            valid_var.runValid(validObj[key] || "", true);
            if (valid_var.is_null === false && valid_var.status === false)
                return valid_var;
            if (valid_var.status) check = true;
        }
        if (check == false) {
            const valid = new Validate({status: false, language});
            valid.mess = valid.messOr(name);
            return valid;
        }
        return new Validate({status: true});
    }
}

export const MAP_VALID = {
    N: 1,
    S0: 2,
    S: 3,
    NZS: 4,
    N0: 5,
    D: 6,
    D0: 7,
};
/**
 *
 * @param name {string}
 * @param value
 * @return {{mess, status: boolean, data: {}}|boolean}
 */
export const validMapLiD = (name, value) => {
    const list = name.split("_");
    const validate = MAP_VALID[list.splice(0, 1)[0]];
    if (validate) {
        switch (validate) {
            case MAP_VALID.N0:
                return res(list.join("_"), REGEX.C_NUMBER.test(value) || value === undefined);
            case MAP_VALID.N:
                return res(list.join("_"), REGEX.C_NUMBER.test(value));
            case MAP_VALID.D:
                return res(list.join("_"), REGEX.C_DATE_TIME.test(value));
            case MAP_VALID.D0:
                return res(list.join("_"), REGEX.C_DATE_TIME_ALL.test(value) || value === undefined || "0000-00-00 00:00:00");
            case MAP_VALID.NZS:
                return res(list.join("_"), REGEX.SO_NGUYEN_DUONG.test(value));
            case MAP_VALID.S0:
                return res(list.join("_"), typeof value === "string");
            case MAP_VALID.S:
                return res(list.join("_"), typeof value === "string" && value);
        }
    }
    return false;
};
