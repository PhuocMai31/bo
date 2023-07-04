import { getNowTimeStamp,dateNowDataBase  } from "@util";
import { rdPushList } from "@repository";
import { getPubPermissionsByRouteName } from "@repository";

export const pushLogAdm = async (reqID, originalUrl, route_name) => {
  if (route_name) {
  }
  const pubPer = route_name
    ? await getPubPermissionsByRouteName(route_name)
    : null;
  await pushLog(reqID, {
    tool_id: pubPer ? pubPer.id : 0,
    time: dateNowDataBase(),
    url: `${process.env.DOMAIN}${originalUrl}`,
    type: 1,
    timestamp: getNowTimeStamp(11),
    end: false,
    request_id: reqID,
  });
};
export const pushLogApp = async (reqID, originalUrl) => {
  await pushLog(reqID, {
    tool_id: 0,
    time: dateNowDataBase(),
    url: `${process.env.DOMAIN}${originalUrl}`,
    type: 2,
    timestamp: getNowTimeStamp(11),
    end: false,
    request_id: reqID,
  });
};

export const pushLogEnd = async (
  reqID,
  { building_id, param, error, status, response }
) => {
  if (param?.pword) param.pword = "**********";
  await pushLog(reqID, {
    building_id,
    param,
    error,
    status,
    end: true,
    response: response || "",
  });
};
export const pushLog = async (reqID, param) => {
  if (reqID) await rdPushList(reqID, param);
};
