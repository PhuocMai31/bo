import moment from "moment";
import { TYPE_FILE } from "@/constant";

export const validNumberInt = (value) => {
  if (Number.isInteger(Number(value)) && value !== null) {
    return true;
  }
  return false;
};
export const validDifferent = (value, condition) => {
  if (Number(value) !== condition) {
    return true;
  }
  return false;
};
export const validMinNumber = () => {};
export const validMaxNumber = (value, max_value) => {
  if (Number(value) > max_value) {
    return false;
  }
  return true;
};
export const validMinLength = (value, condition) => {
  if (value.length >= condition) {
    return true;
  }
  return false;
};
export const validMaxLength = (value, condition) => {
  if (value.length <= condition) {
    return true;
  }
  return false;
};
export const validRegex = (regex, value) => {
  return regex.test(value);
};

export const validCMT = (value) => {
  return validRegex(/^[\d]{9,12}$/, value);
};

export const validateBirthday = (value) => {
  return validRegex(
    /^[12]{1}[0-9]{3}-(0?[1-9]|1[0-2]{1})-(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})$/,
    value
  );
};
export const validateExcel = (value) => {
  return validRegex(
    /^(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1})[-/]{1}(0?[1-9]|1[0-2]{1})[-/]{1}[12]{1}[0-9]{3}$/,
    value
  );
};
export const validateTime = (value) => {
  return validRegex(
    /^[2]{1}[0]{1}[0-9]{2}-(0?[1-9]|1[0-2]{1})-(0?[1-9]{1}|[1-2]{1}[0-9]{1}|3[0-1]{1}) (2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]$/,
    value
  );
};

export const validatePage = (value) => {
  return validRegex(/^[1-9]{1}[0-9]{0,3}$/, value);
};

export const validEmail = (value) => {
  return validRegex(/^([a-zA-Z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/g, value);
};

export const validNumber = (value) => {
  return validRegex(/^-?[\d]+$/, value);
};
export const validNumberV2 = (value) => {
  return validRegex(/^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/, value);
};

export const validPercent = (value) => {
  return Number(value) <= 100 && Number(value) >= 0 && validNumberV2(value);
};
export const validPhoneNumber = (value) => {
  return validRegex(/^0[1-9]{1}[0-9]{8}$/, value);
};

export const validMothMetter = (value) => {
  if (
    !validNumberInt(value) ||
    !validMaxLength(value, 6) ||
    !validMinLength(value, 6)
  )
    return false;
  const year = Number(value.slice(0, 4));
  const month = Number(value.slice(4, 6));
  const date = new Date();
  // truoc 2 thang  va tuong lai 1 thang
  // 202101
  if (month > 12 || month < 1) return false;

  if (year === date.getFullYear()) {
    if (month >= date.getMonth() + 1 - 2 && month <= date.getMonth() + 1 + 1)
      return true;
  }
  // truoc 2 thang  trong truong hop dau nam
  if (year === date.getFullYear() - 1) {
    if (date.getMonth() + 1 === 1 && (month === 12 || month === 11))
      return true;
    if (date.getMonth() + 1 === 2 && (month === 12 || month === 1)) return true;
  }

  //  tuong lai 1 thang trong truong hop cuoi nam
  if (year === date.getFullYear() + 1) {
    if (date.getMonth() + 1 === 12 && month === 1) return true;
  }
  // if (year !== date.getFullYear()) return false;
  //  nhap sai

  return false;
};

export const validPhone = (phone) => {
  if (phone.search(/([0]{1})([0-9]{9}){1}$/g) === -1) {
    return false;
  }
  return true;
};
export const validExitAndIsNumber = (value) => {
  console.log(value);
  if (value) return validNumber(value);
  return true;
};
export const checkString = (value) => {
  return typeof value === "string";
};

/**
 *
 * @param file {{mimetype : String}}
 * @param mimetype
 * @param start {string}
 */
export const validTypeFile = (file, mimetype, start) => {
  if (mimetype) {
    if (file.mimetype === mimetype) return true;
  } else if (start)
    if (file.mimetype.startsWith(start)) {
      return true;
    }
  return false;
};

export const validVideo = (files, mimetype) => {
  for (let i = 0; i < files.length; i++) {
    if (validTypeFile(files[i], mimetype, TYPE_FILE.VIDEO)) return true;
  }
  return false;
};
export const validImg = (files) => {
  for (let i = 0; i < files.length; i++) {
    if (validTypeFile(files[i], false, TYPE_FILE.IMG)) return true;
  }
  return false;
};

/**
 *  valid cycleName
 * @param value
 * @return {boolean}
 */
export const validCycleName = (value) => {
  return moment(value, "YYYYMM", true).isValid();
};

export const validPage = (limit, page) => {
  return validNumber(limit) && validNumber(page);
};
export const validJsonArr = (value) => {
  console.log("khonog vao day ak")
  try {
    console.log({value, js : Array.isArray(JSON.parse(value))})
    return Array.isArray(JSON.parse(value));
  } catch (e) {
    return false;
  }
};

export const checkLastDate = (date = new Date()) => {
  const day = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  return day === date.getDate();
};
