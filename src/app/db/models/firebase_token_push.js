import { ModelBase } from "@config/ModelBase";

class Firebase_token_push extends ModelBase {
  id;
  user_id;
  token;
  client_id;
  type_device;
  bundle_id;
  updated_at;
  created_at;
  deleted_at;
}
Firebase_token_push.init("firebase_token_push", {
  id: { type: "int(11)", primaryKey: true, autoIncrement: true },
  user_id: { type: "int(11)" },
  token: { type: "varchar(500)" },
  client_id: { type: "varchar(200)" },
  type_device: { type: "tinyint(1)" },
  bundle_id: { type: "varchar(50)" },
  updated_at: { type: "datetime" },
  created_at: { type: "datetime" },
  deleted_at: { type: "datetime" },
});

/**
 *
 * @param params {Firebase_token_push|any}
 * @param transaction {any}
 * @return {Promise<Firebase_token_push>}
 */
export const addFirebaseTokenPushMd = (params, transaction = false) => {
  return Firebase_token_push.create(params, { transaction });
};

/**
 *
 * @param attr {Firebase_token_push|any}
 * @param where {Firebase_token_push|any}
 * @param transaction {any}
 * @return {Promise<Firebase_token_push>}
 */
export const updateFirebaseTokenPushMd = (attr, where, transaction = false) => {
  return Firebase_token_push.findOneAndUpdate(attr, where, transaction);
};

/**
 *
 * @param where {Firebase_token_push|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Firebase_token_push[]>}
 */
export const getListFirebaseTokenPushMd = (
  where,
  transaction,
  limit,
  page,
  order,
  group,
  attr
) => {
  return Firebase_token_push.findArr(
    where,
    transaction,
    limit,
    page,
    order,
    group,
    attr
  );
};

/**
 *
 * @param where {Firebase_token_push|any}
 * @param transaction {any}
 * @return {Promise<Firebase_token_push>}
 */
export const getDetailFirebaseTokenPushMd = (where, transaction = false) => {
  return Firebase_token_push.findItem(where, transaction);
};

/**
 *
 * @param where {Firebase_token_push|any}
 * @param transaction {any}
 * @return {Promise<[]>}
 */
export const delFirebaseTokenPushMd = (where, transaction = false) => {
  return Firebase_token_push.del(where, transaction);
};

export default Firebase_token_push;
