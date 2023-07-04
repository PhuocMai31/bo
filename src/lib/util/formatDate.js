import date_format from "date-format";
import { Sequelize } from "sequelize";
import { validateExcel } from "@util";
import { sendToTelegram } from "@util";
import { sumDate } from "@lib";
export const getDatePayment = () => {
  // format('hh:mm:ss.SSS', new Date())
  return date_format("yyyyMMdd", new Date());
};
export const getDateString = (date) => {
  // format('hh:mm:ss.SSS', new Date())
  return date_format("dd/MM/yyyy", date || new Date());
};

export const formatExcelDate = (date) => {
  // format('hh:mm:ss.SSS', new Date())
  return date_format("dd/MM/yyyy", new Date(date));
};
/**
 *
 * @param from
 * @param to
 * @return {*[]}
 */
export const getListMonth = (from, to) => {
  const n = [];
  from = Number(from);
  to = Number(to);

  for (from; from <= to; from++) {
    if (`${from}`.endsWith("13"))
      from = Number(`${Number(`${from}`.slice(0, 4)) + 1}01`);
    n.push(from);
  }
  return n;
};

export const dateNowDataBase = (is_, date) => {
  if (is_) {
    return date_format("yyyy-MM-dd hh:mm:ss", date || new Date());
  }
  return date_format("yyyy/MM/dd hh:mm:ss", date || new Date());
};
export const dateNowByHour = (time, date = new Date(), sumDay = false) => {
  if (sumDay) return `${sumDate(sumDay, date)} ${time}`;
  return date_format(`yyyy-MM-dd ${time}`, date);
};

export const selectDateFormat = (colomn) => {
  return [
    Sequelize.fn("DATE_FORMAT", Sequelize.col(colomn), "%Y-%m-%d %H:%i:%s"),
    colomn,
  ];
};

export const convertCycleDate = (date) => {
  return date_format("yyyyMM", new Date(date));
};

/**
 *
 * @param cycleName {String}
 */
export const cycleNameToDate = (cycleName) => {
  return `${cycleName.slice(4)}/${cycleName.slice(0, 4)}`;
};

export function excelDateToJSDate(excelDate) {
  try {
    if (!excelDate) {
      return false;
    }
    if (typeof excelDate === "number") {
      return new Date(Math.round((excelDate - 25569) * 86400 * 1000));
    } else if (typeof excelDate === "string" && validateExcel(excelDate)) {
      const c = excelDate.split("/");
      const a = [];
      for (let i = 0; i < c.length; i++) {
        a.push(c[c.length - i - 1]);
      }
      return new Date(a.join("-"));
    } else {
      return false;
    }
  } catch (e) {
    return false;
  }
}

/**
 *
 * @param tranDate
 * @param defaultValue
 * @return {string|boolean}
 */
export const convertTranDate = (tranDate, defaultValue = false) => {
  try {
    let key = "-";
    const date = tranDate.split(" ");
    let sort_date = date[0].split(key);
    if (sort_date.length === 1) {
      key = "/";
      sort_date = date[0].split(key);
    }
    const t = sort_date[0];
    sort_date[0] = sort_date[2];
    sort_date[2] = t;
    return `${sort_date.join("-")} ${date[1]}`;
  } catch (e) {
    sendToTelegram("date err", tranDate);
    return defaultValue || dateNowDataBase();
  }
};
