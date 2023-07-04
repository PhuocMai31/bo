import {addLogRp, } from "@lib";
import {sendToTelegram} from "./logTelegram";
import {response,res} from "./response";
import {LANGUAGE} from "@constant";
import {client} from "@config/redisConnect";

export const throwError = async (error, name) => {
  error.name = `${name}: ${error?.name}  : ${error?.message}`;
  await addLogRp("error", JSON.stringify(error), 60 * 60);
  await sendToTelegram("error", name);
  throw error;
};

export const throwErrorNo = (error_no) => {
  const e = new Error();
  e.error_no = error_no;
  throw e;
};

export const error_no = {
  redis: 0,
  fileUpload: 1,
};

export const error_mess = {
  error_0: "sever busy",
  error_1: "bạn không thể upload file quá 50 mb",
};

export const responseError = (error_no, res) => {
  return response(res, false, error_mess[`error_${error_no}`]);
};

export const tryCatch = async (callBack, errCallBack, res, title, content) => {
  try {
    await callBack();
  } catch (e) {
    if (title)
      await sendToTelegram(
        title,
        content || encodeURIComponent(JSON.stringify(e))
      );
    if (res) return returnCatch(e, res);
  }
};
export const returnCatch = (error, res, mess, language) => {
  console.log("-----------------------------");
  if (error.error_no === error_no.redis) {
    return response(res, false, "server buzy");
    return client.disconnect(true);
  } else if (error.error_no)
    return response(res, false, error_mess["error_" + error.error_no]);
  else {
    return response(
      res,
      false,
      mess || language ? LANGUAGE[language].err_link : LANGUAGE.VI.err_link
    );
  }
};
export const returnCatchv2 = (error, mess, language) => {
  if (error.error_no === error_no.redis) {
    client.disconnect(true);
    return res( "server buzy",false,);
  } else if (error.error_no)
    return res(  error_mess["error_" + error.error_no],false);
  else {
    return res(
      mess || language ? LANGUAGE[language].err_link : LANGUAGE.VI.err_link,
        false,

    );
  }
};

/**
 * @param error {Error}
 */
export const convertError = (error) => {
  return {
    cause: error.cause,
    stack: error.stack,
    lineNumber: error.lineNumber,
    fileName: error.fileName,
    name: error.name,
    message: error.message,
  };
};
