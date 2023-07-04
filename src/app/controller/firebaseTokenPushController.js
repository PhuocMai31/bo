import {
  addFirebaseTokenPushMd,
  getDetailFirebaseTokenPushMd,
  updateFirebaseTokenPushMd,
} from "@model";

/**
 * @param p
 * @param c {Controller}
 */
export const addFirebaseTokenPush = async ({ token_push }, c) => {
  c.runValid({ token_push });
  if (c.v()) return;
  const tokenPush = await getDetailFirebaseTokenPushMd({
    user_id: c.user_id,
    client_id: c.info.client_id,
  });
  c.mess = "oke";
  if (tokenPush) {
    c.data = await updateFirebaseTokenPushMd(
      { token: token_push },
      { user_id: c.user_id, client_id: c.info.client_id }
    );
    return;
  }
  c.data = await addFirebaseTokenPushMd({
    token: token_push,
    user_id: c.user_id,
    client_id: c.info.client_id,
    bundle_id: c.info.bundle_id,
    type_device: c.info.os === "ios" ? 1 : 2,
  });
};
