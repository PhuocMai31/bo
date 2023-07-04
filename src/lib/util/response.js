import { convertJsonToExcel } from "@lib";
import { LANGUAGE } from "@constant";

/**
 * response
 * @param {String} status
 * @param {String} mess
 * @param {Object} data
 * @param {Object} rest
 * @param {Object} res
 * @returns
 */
export const response = (res, status, mess, data = {}, rest) => {
  return res.json({
    status,
    mess,
    data,
    ...rest,
  });
};
/**
 *
 * @param mess
 * @param data
 * @param rest
 * @return {{data: {}, message, status: true}|{rest, data: {}, message, status: string}}
 */
export const resSuccess = (mess, data = {}, rest) => {
  if (rest) return { status: true,  mess, data, rest };
  return { status: true,  mess, data };
};
/**
 *
 * @param mess
 * @param data
 * @param rest
 * @return {{data: {}, message, status: false}|{rest: boolean, data: {}, message, status: string}}
 */
export const resFail = (mess, data = {}, rest = false) => {
  if (rest) return { status: false,  mess, data, rest };
  return { status: false,  mess, data };
};
/**
 *
 * @param res
 * @param status
 * @param mess
 * @param data
 * @param rest
 * @return {*}
 */
export const resExcel = (res, status, mess, data = {}, rest) => {
  if (!status)
    return res.json({
      status,
      mess,
      data,
      ...rest,
    });
  const buffer = convertJsonToExcel(data, rest.headers);
  res.contentType("xlsx");
  res.attachment(rest.filename + ".xlsx" || "file.xlsx");
  res.end(buffer);
};

export const resG = (data, mess) => {
  return [true, mess || LANGUAGE.VI.getData, data];
};
export const resU = (data, mess) => {
  return [true, mess || LANGUAGE.VI.update, data];
};
export const resA = (data, mess) => {
  return [true, mess || LANGUAGE.VI.addData, data];
};

export const resVaL = (data, mess) => {
  return [false, mess || LANGUAGE.VI.validError, data || {}];
};
/**
 *
 * @param mess : string
 * @param status {any}
 * @param rest {any}
 * @param data {any}
 * @return {{mess, status: boolean ,data : {}}}
 */
export const res = (mess, status = false, data = {}, rest = {}) => {
  return { status, mess, data, ...rest };
};

export const resD = async (data, mess = "", status = true) => {
  return { status, data, mess };
};
