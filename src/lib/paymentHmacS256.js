import CryptoJS from "crypto-js";
import { addLogRp } from "./debug";

// const checksum = "EEE97758746F1949D47413F0D275F7331C622403A4DD360AAB6957AA1B623916";

// const checksum_key = "ljDeHNFF0McTR8SC3nSkAgX1CpXvE33z";
// - Checksum: ljDeHNFF0McTR8SC3nSkAgX1CpXvE33z
// - Client ID: 7Vqu0r
// - Key: vsOAV0hdArLtkU7iv0IwW7TnHlo1dPxRBB3
export const checkSha256Data = (result, checksum_key) => {
  return CryptoJS.SHA256(result + checksum_key)
    .toString()
    .toUpperCase();
};
export const decode = (result) => {
  let buff = Buffer.from(result, "base64");
  let text = buff.toString("utf-8");
  return JSON.parse(text);
};

export const endCode = (data) => {
  return CryptoJS.SHA256.encrypt(data, checksum_key);
};

function hmac(key, data) {
  return CryptoJS.HmacSHA256(data, key);
}

export const check = () => {
  // const data = btoa(JSON.stringify([{ id: 1 }, { id: 2 }]));
  // console.log(checkSha256Data(data));
  // console.log(sign("120321380821038021"));
  console.log(new Date("23-08-2022 15:10:55"));
};
// có dữ liệu data đẩu tiên  chuyển  về dạng base 64
// là và mã hóa về dạng sha256  nhờ vào checksum_key

// rồi gửi dữ liệu đi base64 và sha256 đi
// ở đầu bên kia sẽ dựa vào  check sum key mã hóa lại lần nữa và so sánh
