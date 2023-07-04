const NodeRSA = require("node-rsa");

const public_Key_partner = new NodeRSA(process.env.public_key_partner_string);
const public_Key_payment = new NodeRSA(process.env.public_key_payment);
const private_key = new NodeRSA(process.env.private_key_string);
export const encrypt = (data) => {
  return public_Key_partner.encrypt(data, "base64");
};

// export const decrypt = (base64) => {
//   return private_key.decrypt(base64, "utf8");
// };
export const sign = (data) => {
  return private_key.sign(data, "base64");
};

export const verify = (text, signature) => {
  return public_Key_partner.verify(text, signature, "utf8", "base64");
};
export const verifyPayment = (text, signature) => {
  return public_Key_payment.verify(text, signature, "utf8", "base64");
};
