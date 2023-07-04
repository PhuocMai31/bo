import moment from "moment";
/**
 * @sum_date
 * @param sum_no
 * @param date
 * @return {string}
 */
function sumDate(sum_no, date = new Date()) {
  return moment(date).add(sum_no, "days").format("yyyy-MM-DD");
}
/**
 * @sum_minus
 * @param sum_no
 * @param date
 * @return {string}
 */
function sum_minus(sum_no, date = new Date()) {
  const hour = moment(date).add(sum_no, "minutes").hours()
  const minutes = moment(date).add(sum_no, "minutes").minutes()
  return  `${moment(date).add(sum_no, "minutes").format("yyyy-MM-DD") + " " + `${hour}:${minutes}:00` }`
}
/**
 * @minus_date
 * @param minus_no
 * @param date
 * @return {string}
 */
function minusDate(minus_no, date = new Date()) {
  return moment(date).subtract(minus_no, "days").format("yyyy-MM-DD");
}

/**
 * @sum_date
 * @param sum_no
 * @param date
 * @return {string}
 */
function sumMoths(sum_no, date = new Date()) {
  return moment(date).add(sum_no, "month").format("yyyy-MM-DD");
}
/**
 * @minus_date
 * @param minus_no
 * @param date
 * @return {string}
 */
function minusMoths(minus_no, date = new Date()) {
  return moment(date).subtract(minus_no, "month").format("yyyy-MM-DD");
}

function formatDateMoment (format , date = new Date()){
  return moment(date).format(format)
}


export { sumDate, minusDate , sumMoths , minusMoths,sum_minus ,formatDateMoment };
