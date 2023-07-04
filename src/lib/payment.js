import { makeid } from "@repository";
import { generateNumber, getNowTimeStamp } from "@util";
import { validNumber } from "@util";

export const generatePaymentCreate = (count) => {
  const date = new Date();
  return {
    order_id: date.getTime() + makeid(10),
    trans_id: date.getTime() + makeid(5),
    code_pay: "x" + generateNumber(4) + count || generateNumber(2),
  };
};
/**
 *
 * @param apartment_id
 * @return {string}
 */
export const generatePaymentApartment = (apartment_id) => {
  const number = Math.ceil(apartment_id + 100 / 2);
  return "a" + getNowTimeStamp(4) + number;
};
/**
 *
 * @param code_pay {String}
 * @param character {String}
 * @return {String|false}
 */
export const getCodePayVal = (code_pay, character = "x") => {
  if (!code_pay) return false;
  let a = code_pay.split(character);
  if (!code_pay.startsWith(character) && a.length > 1) {
    a.shift();
  }
  for (let i = 0; i < a.length; i++) {
    let flag = false;
    for (let j = 5; j < a[i].length; j++) {
      if (validNumber(a[i].slice(0, j))) {
        flag = true;
        continue;
      } else {
        if (flag === true) {
          return `${character}${a[i].slice(0, j - 1)}`;
        }
        break;
      }
    }
    if (flag === true) return `${character}${a[i]}`;
  }
  a = code_pay.split(character.toUpperCase());
  if (!code_pay.startsWith(character.toUpperCase()) && a.length > 1) {
    a.shift();
  }
  for (let i = 0; i < a.length; i++) {
    let flag = false;
    for (let j = 5; j < a[i].length; j++) {
      if (validNumber(a[i].slice(0, j))) {
        flag = true;
        continue;
      } else {
        if (flag === true) {
          return `${character.toUpperCase()}${a[i].slice(0, j - 1)}`;
        }
        break;
      }
    }
    if (flag === true) return `${character.toUpperCase()}${a[i]}`;
  }
  return false;
};
/**
 *
 * @param remark
 * @returns {{NORMA : String , APM : String}}
 */
export const getCodePayV2 = (remark) => {
  const result = {};
  Object.keys(TYPE_CODE_PAY_CHECK).forEach((key) => {
    result[key] = getCodePayVal(remark, TYPE_CODE_PAY_CHECK[key]);
  });
  return result;
};

/**
 *
 * @param code_pay
 * @returns {String|Boolean}
 */
export const getCodePayValV2 = (code_pay) => {
  const a = code_pay.split("x");
  for (let i = 0; i < a.length; i++) {
    let flag = false;
    for (let j = 6; j < a[i].length; j++) {
      if (validNumber(a[i].slice(0, j))) {
        flag = true;
        continue;
      } else {
        if (flag === true) {
          return `x${a[i].slice(0, j - 1)}`;
        }
        break;
      }
    }
    if (flag === true) return `x${a[i]}`;
  }

  return false;
};
