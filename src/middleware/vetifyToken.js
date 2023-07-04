import { rdGet } from "@lib";
import { checkToken } from "@repository";
import {getPermission} from "@controller/permissionController";

/**
 * @param p
 * @param c {Controller}
 */
export const verifyToken = async (p, c) => {
  if (!c.token) {
    c.mess = "mã xác thực không tìm thấy";
    c.status = false;
    return;
  }
  const userInfo = await rdGet(c.token);
  if (userInfo) {
    c.userInfo = userInfo;
    c.user_id = userInfo.user_id;
    await getPermission(p,c)
    c.rest.permission = c.p
    return;
  }
  const check = await checkToken(c.token, c.info.client_id);
  if (!check.status) {
    c.status = check.status;
    c.mess = check.mess;
    return
  }
  c.userInfo = check.data;
  c.user_id = check.data.userInfo.user_id;
  await getPermission(p,c)
  c.rest.permission = c.p
};
