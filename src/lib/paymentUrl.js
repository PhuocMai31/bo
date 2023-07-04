import axios from "axios";
import { generateSignature } from "@lib";
import FormData from "form-data";
import { URL_PAYMENT_9P } from "@constant";
const client = axios.create({
  baseURL: process.env.payment_domain,
  timeout: 5000,
});
/**
 *
 * @param params {{
 *     request_id : string ,
 * uid  : String ,
 * uname  : String ,
 * bank_code : String ,
 * }}
 * @param building {{
 *      secret_key_9p : String ,
 *      client_id_9p : String ,
 *      checksum_key_9p : String ,
 * }}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const create_payment = (params, building) => {
  const url = URL_PAYMENT_9P.create;
  const data = new FormData();
  data.append("request_id", params.request_id);
  data.append("uid", params.uid);
  data.append("uname", params.uname);
  data.append("bank_code", params.bank_code);
  const time = Math.round(Date.now() / 1000);
  const config = {
    method: "post",
    url,
    headers: {
      ["Authorization"]: generateSignature(
        params,
        time,
        URL_PAYMENT_9P.create,
        building
      ),
      ["Date"]: time,
      ...data.getHeaders(),
    },
    data,
  };
  return client(config);
};
/**
 *
 * @param params {{
 *  amount : string ,
 * remark  : String ,
 * account_no  : String ,
 * bank_code : String ,
 * }}
 * @param building {{
 *      secret_key_9p : String ,
 *      client_id_9p : String ,
 *      checksum_key_9p : String ,
 * }}
 * @returns {Promise<AxiosResponse<any>>}
 */
export const create_9p_qr = (params, building) => {
  const url = URL_PAYMENT_9P.qr;
  const data = new FormData();
  console.log(building.checksum_key_9p);
  console.log(building.client_id_9p);
  console.log(building.secret_key_9p);
  data.append("amount", params.amount);
  data.append("remark", params.remark);
  data.append("account_no", params.account_no);
  data.append("bank_code", params.bank_code);
  const time = Math.round(Date.now() / 1000);
  const config = {
    method: "post",
    url,
    headers: {
      ["Authorization"]: generateSignature(
        params,
        time,
        URL_PAYMENT_9P.qr,
        building
      ),
      ["Date"]: time,
      ...data.getHeaders(),
    },
    data,
  };
  return client(config);
};
