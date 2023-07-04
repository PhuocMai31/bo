import { addLogRp } from "@lib";
import {
  convertError,
  decodeParamsDefault,
  returnCatch,
  returnCatchv2,
} from "@util";
import { sendToTelegram } from "@util";
import { resExcel, response, res as _res } from "@util";
import { pushLogEnd } from "@lib";
import { Controller } from "@lib";
import {Upload} from "@middleware/multer";
const utf8 = require("utf8");

export const adapterHttp = (callback) => {
  return async (req, res) => {
    const data = req.data || { language: "VI", ...req.query, ...req.body };
    const { file, files, ...param } = data;
    const { pubUser, userInfor, authorization, infor, ...param2 } = data;
    filterParams(param2);
    try {
      const con = new Controller(data.language);
      con.authorization = authorization;
      con.pubUser = pubUser;
      con.userInfo = userInfor;
      con.info = infor;
      con.user_id = param2?.userId;
      con.building_id = param2?.building_id;
      const responseData = await callback(param2, con);
      if (responseData === undefined) {
        await pushLogEnd(data.reqID, {
          building_id: data.building_id,
          param,
          error: con.status ? "" : con.data,
          status: con.status ? 1 : 0,
          response: con.status ? "" : JSON.stringify(con.data),
        });
        return response(res, con.status, con.mess, con.data, con.rest);
      }
      await pushLogEnd(data.reqID, {
        building_id: data.building_id,
        param,
        error: responseData[0] ? "" : responseData[1],
        status: responseData[0] ? 1 : 0,
        response: responseData[0] ? "" : JSON.stringify(responseData),
      });
      if (Array.isArray(responseData)) return response(res, ...responseData);
      return res.json(responseData);
    } catch (error) {
      console.log(error);
      await pushLogEnd(data.reqID, {
        building_id: data.building_id,
        param,
        error: convertError(error),
        status: 0,
      });
      await addLogRp(
        "errorCheck",
        {
          error: convertError(error),
          param: param,
          url: `${process.env.DOMAIN}${req.originalUrl}`,
        },
        60 * 60 * 4
      );
      await sendToTelegram({
        processTele: req.originalUrl,
        event: `${error.name} ::: ${error.message}`,
        description: JSON.stringify(error),
        param: JSON.stringify({ ...req.query, ...req.body }),
        timestamp: new Date().toLocaleString(),
      });
      return returnCatch(error, res, undefined, data.language || "VI");
    }
  };
};

export const adapterImpExp = (callback) => {
  return async (req, res) => {
    const data = req.data;
    const { file, files, ...param } = data;
    const { pubUser, userInfor, authorization, infor, ...param2 } = data;
    filterParams(param2);
    try {
      const con = new Controller(data.language);
      con.authorization = authorization;
      con.pubUser = pubUser;
      con.userInfo = userInfor;
      con.info = infor;
      con.user_id = param2?.userId;
      con.building_id = param2?.building_id;
      const responseData = await callback(param2, con);

      if (!responseData) {
        await pushLogEnd(data.reqID, {
          building_id: data.building_id,
          param: con.data,
          error: con.mess,
          status: con.status ? 1 : 0,
          response: con.status ? "" : JSON.stringify(responseData),
        });
        return resExcel(res, con.status, con.mess, con.data, con.rest);
      }
      await pushLogEnd(data.reqID, {
        building_id: data.building_id,
        param,
        error: responseData[0] ? "" : responseData[1],
        status: responseData[0] ? 1 : 0,
        response: responseData[0] ? "" : JSON.stringify(responseData),
      });

      return resExcel(res, ...responseData);
    } catch (error) {
      console.log(error);
      await addLogRp(
        "errorCheck",
        {
          error: JSON.stringify(convertError(error)),
          param: { ...req.query, ...req.body },
          url: `${process.env.DOMAIN}${req.originalUrl}`,
        },
        60 * 60
      );
      await sendToTelegram({
        processTele: req.originalUrl,
        event: `${error.name} ::: ${error.message}`,
        description: JSON.stringify(error),
        param: { ...req.query, ...req.body },
        timestamp: new Date().toLocaleString(),
      });
      return returnCatch(error, res);
    }
  };
};

/**
 *
 * @param params
 * @param url {string}
 * @param callback
 * @param user_id
 * @return {Promise<{mess, status: boolean, data: {}}|[boolean,undefined,{},undefined]|[boolean,undefined,{}]>}
 */
export const adapterMqtt = async (params, url, callback, user_id) => {
  params = JSON.parse(params.toString());
  let { default_params, requestId, ...param } = params;
  try {
    default_params = decodeParamsDefault(default_params);
    const c = new Controller(callback.language || "VI");
    c.info = default_params;
    c.user_id = user_id;
    await callback(param, c);
    const res = c.end();
    res.requestId = requestId;
    return res;
  } catch (error) {
    console.log(error);
    // await pushLogEnd(data.reqID, {
    //   building_id: data.building_id,
    //   param,
    //   error: convertError(error),
    //   status: 0,
    // });
    addLogRp(
      "errorCheck",
      {
        error: convertError(error),
        param: params,
        url,
      },
      60 * 60 * 4
    );
    await sendToTelegram({
      processTele: url,
      event: `${error.name} ::: ${error.message}`,
      description: JSON.stringify(error),
      param: JSON.stringify({ params }),
      timestamp: new Date().toLocaleString(),
    });
    return returnCatchv2(error, undefined, params.language || "VI");
  }
};
/**
 *
 * @param params {{}}
 */
export const filterParams = (params) => {
  for (let key of Object.keys(params)) {
    if (
      params[key] === "null" ||
      params[key] === "" ||
      params[key] === "undefined"
    )
      delete params[key];
  }
  return params;
};
/**
 *
 * @param listCallBack {[]}
 * @param action
 * @return {(function(*, *): Promise<void>)|*}
 */
export const adapterHttps = (listCallBack , action) => async (req, res) => {
  const params = { ...req.body, ...req.query, ...req.params };
  try {
    const info = req.headers?.info ? JSON.parse(req.headers.info) : null;
    const c = new Controller("VI");
    if(!info) {
      c.mess = "Lỗi info device"
      return         res.json(c.end());
    }
    c.info = info;
    c.token = req.headers?.authorization?.slice(7) || "";
    for (let listCallBackElement of listCallBack) {
      if (listCallBackElement instanceof Upload) {
        if(listCallBackElement.uploadFileType === "array" || listCallBackElement.uploadFileType === "fields"){
          await new Promise((resolve, reject) => {
            listCallBackElement.uploadFile()(req, res, ()=> {
              Object.keys(req.body).forEach(value => params[value]= req.body[value])
              params.files =req.files
              resolve()
            })
          })
          continue
        }
        await new Promise((resolve, reject) => {
          listCallBackElement.uploadFile()(req, res, ()=> {
            Object.keys(req.body).forEach(value => params[value]= req.body[value])
            params.file =req.file
            resolve()
          })
        })
        continue
      } else {
        await listCallBackElement(params, c);
      }
      if (c.v()) return res.json(c.end());
    }
    switch (c.type_return) {
      case "REDIRECT_LICK" :
      case "JSON"   : return res.json(c.end());
      case "FILE_EXEL" : return resExcel(res,  c.status , c.mess , c.data ,c.rest)
    }
  } catch (error) {
    console.log(error)
    addLogRp(
        "errorCheck",
        {
          error: convertError(error),
          param: params,
          url :req.originalUrl,
        },
        60 * 60 * 4
    );
    sendToTelegram("errorCheck",JSON.stringify({
      error: convertError(error),
      param: params,
      url :req.originalUrl,
    },))
    res.json(_res("có lỗi xảy ra vui lòng thử lại sau"));
  }
};
