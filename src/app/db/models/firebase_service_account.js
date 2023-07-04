import { ModelBase } from "@config/ModelBase";

class Firebase_service_account extends ModelBase {
  id;
  client_email;
  code;
  private_key;
  project_id;
  updated_at;
  created_at;
  deleted_at;
}
Firebase_service_account.init("firebase_service_account", {
  id: { type: "int(11)", primaryKey: true, autoIncrement: true },
  client_email: { type: "varchar(255)" },
  code: { type: "varchar(100)" },
  private_key: { type: "text" },
  project_id: { type: "varchar(255)" },
  updated_at: { type: "datetime" },
  created_at: { type: "datetime" },
  deleted_at: { type: "datetime" },
});

/**
 *
 * @param params {Firebase_service_account|any}
 * @param transaction {any}
 * @return {Promise<Firebase_service_account>}
 */
export const addFirebaseServiceAccountMd = (params, transaction = false) => {
  return Firebase_service_account.create(params, { transaction });
};

/**
 *
 * @param attr {Firebase_service_account|any}
 * @param where {Firebase_service_account|any}
 * @param transaction {any}
 * @return {Promise<Firebase_service_account>}
 */
export const updateFirebaseServiceAccountMd = (
  attr,
  where,
  transaction = false
) => {
  return Firebase_service_account.findOneAndUpdate(attr, where, transaction);
};

/**
 *
 * @param where {Firebase_service_account|any}
 * @param transaction {any}
 * @param limit {any}
 * @param page {any}
 * @param order {any}
 * @param group {any}
 * @param attr {any}
 * @return {Promise<Firebase_service_account[]>}
 */
export const getListFirebaseServiceAccountMd = (
  where,
  transaction,
  limit,
  page,
  order,
  group,
  attr
) => {
  return Firebase_service_account.findArr(
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
 * @param where {Firebase_service_account|any}
 * @param transaction {any}
 * @return {Promise<Firebase_service_account>}
 */
export const getDetailFirebaseServiceAccountMd = (
  where,
  transaction = false
) => {
  return Firebase_service_account.findItem(where, transaction);
};

/**
 *
 * @param where {Firebase_service_account|any}
 * @param transaction {any}
 * @return {Promise<[]>}
 */
export const delFirebaseServiceAccountMd = (where, transaction = false) => {
  return Firebase_service_account.del(where, transaction);
};

export default Firebase_service_account;
