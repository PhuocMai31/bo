const END_POINT = process.env.payment_domain;

const message = (time, httpQuery, link) =>
  "POST" + "\n" + END_POINT + link + "\n" + time + "\n" + httpQuery;

/**
 *
 * @param parameters {{*}}
 * @param building : {{
 *      secret_key_9p : String ,
 *      client_id_9p : String ,
 *      checksum_key_9p : String ,
 * }}}
 */
export const generateSignature = (parameters, time, link, building) => {
  const httpQuery = buildHttpQuery(parameters, link);
  const mes = message(time, httpQuery, link);
  const signature = `Signature Algorithm=HS256,Credential=${
    building.client_id_9p
  },SignedHeaders=,Signature=${buildSignature(mes, building.secret_key_9p)}`;
  return signature;
};

function buildHttpQuery(data) {
  let httpQuery = new URLSearchParams();

  const ordered = Object.keys(data)
    .sort()
    .reduce((obj, key) => {
      obj[key] = data[key];
      return obj;
    }, {});

  Object.keys(ordered).forEach(function (parameterName) {
    httpQuery.append(parameterName, ordered[parameterName]);
  });
  return httpQuery.toString();
}

function buildSignature(data, secret) {
  let crypto = require("crypto");
  let token = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest()
    .toString("base64");
  return token;
}
