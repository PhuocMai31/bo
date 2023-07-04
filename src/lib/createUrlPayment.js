import crypto from "crypto";
import { addLogRp, aLog1Rp } from "@lib";

const END_POINT = process.env.payment_domain;
export const directUrl = (
  invoice_no,
  amount,
  description,
  return_url,
  method,
  secret_key_9p,
  client_id_9p
) => {
  const time = Math.round(Date.now() / 1000);
  const parameters = {
    merchantKey: client_id_9p,
    time,
    invoice_no,
    amount,
    description,
    return_url,
    method: method,
  };
  aLog1Rp("parammester", parameters, 2);
  const httpQuery = buildHttpQuery(parameters);
  const message =
    "POST" +
    "\n" +
    END_POINT +
    "/payments/create" +
    "\n" +
    time +
    "\n" +
    httpQuery;

  let signature = buildSignature(message, secret_key_9p);

  let baseEncode = Buffer.from(JSON.stringify(parameters)).toString("base64");
  let httpBuild = {
    baseEncode: baseEncode,
    signature: signature,
  };
  return END_POINT + "/portal?" + buildHttpQuery(httpBuild);
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

export function buildSignature(data, secret) {
  let token = crypto
    .createHmac("sha256", secret)
    .update(data)
    .digest()
    .toString("base64");
  return token;
}
