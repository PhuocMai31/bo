/**
 *
 * @param param {{}}
 * @return {String}
 */
export const andQuery = (param, startAnd = false, endAnd = false) => {
  let query = startAnd ? ` and ` : " ";
  Object.keys(param).forEach((key, index) => {
    if (param[key] === undefined) return;

    const value =
      typeof param[key] == "string" ? `'${param[key]}'` : param[key];
    if (index) return (query += " and " + key + " = " + value + " ");
    return (query += key + " = " + value + " ");
  });
  if (endAnd) query += " and ";
  return query;
};

export const whereSequelize = (param) => {
  const where = {};
  Object.keys(param).forEach((key) => {
    if (param[key] === undefined) return;
    where[key] = param[key];
  });
  return where;
};
