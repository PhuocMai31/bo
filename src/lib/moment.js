import moment from "moment";

/**
 *
 * @param date : Date
 * @param sum_no : number
 * @return {string<YYYYMM>}
 */
export const sumMonth = (date = new Date(), sum_no) => {
  return moment(date).add(sum_no, "months").format("YYYYMM");
};

/**
 *
 * @param date : Date
 * @param minus_no : number
 * @return {string<YYYYMM>}
 */
export const minusMonth = (date = new Date(), minus_no) => {
  return moment(date).subtract(minus_no, "months").format("YYYYMM");
};


export  const getDateName = (date = new Date, day = false)=> {
  if(day) return moment(date).format("YYYYMMDD")
  return   moment(date).format("YYYYMMDDhhmmss")

}
