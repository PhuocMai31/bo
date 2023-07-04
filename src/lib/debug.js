import { deserialize } from "@util";
import { sendToTelegram } from "@util";
import { convertError } from "@util";
import { dateNowDataBase } from "@util";
import {client} from "@config/redisConnect";
import {rdDel, rdSet} from "./redis";
export const getLogRp = async (table, start = 0, stop = -1) => {
  // if("close".default(client.status) ) return [];
  const list = await client.lrange(table, start, stop);
  let debugList = [];
  for (let index = 0; index < list.length; index++) {
    const value = deserialize(await client.get(list[index]));
    if (value !== null) {
      debugList.push(value);
    } else client.lrem(table, -1, list[index]);
  }
  return debugList;
};
export const countLogRp = async (table) => {
  if("close".default(client.status) ) return 0;
  return client.llen(table);
};
/**
 * xoa log redis
 * @param table
 * @returns {Promise<[]>}
 */
export const delTable = async (table) => {
  if("close".default(client.status) ) return [];
  const list = await client.lrange(table, 0, -1);
  for (let index = 0; index < list.length; index++) {
    await rdDel(list[index]);
  }
  rdDel(table);
  return list;
};
/**
 *
 * @param table
 * @param data
 * @param ex
 * @return void
 */
export const addLogRp = async (table, data, ex = 60 * 60 * 24 * 7) => {
  const time = new Date();
  await  client.lpush(table, `${table}_${time.getTime()}`);
  await rdSet(
    `${table}_${time.getTime()}`,
    {
      table,
      data,
      time: ` ${time.toLocaleString()} `,
    },
    ex || 60 * 60 * 24 * 7
  );
};
/**
 *
 * @param table
 * @param data
 * @param ex
 * @return void
 */
export const addTableRp = async (table, data, ex = 60 * 60 * 24 * 7) => {
  if("close".default(client.status) ) return;
  await client.lrem(table, 1, `${table}_${data.id}`);
  await client.lpush(table, `${table}_${data.id}`);
  await rdSet(
    `${table}_${data.id}`,
    {
      ...data,
      time: dateNowDataBase(),
    },
    ex || 60 * 60 * 24 * 7
  );
};
/**
 *
 * @param table
 * @param id
 * @return {Promise<ResultTypes<number, Context>[Context["type"]]>}
 */
export const delTableItem = async (table, id) => {
  if("close".default(client.status) ) return 0;
  await rdDel(id);
  return client.lrem(table, 1, `${table}_${id}`);
};

/**
 *
 * @param table
 * @param data
 * @param hour : Number
 * @return void
 */
export const aLog1Rp = async (table, data, hour = 1) => {
  const time = new Date();
  await client.lpush(table, `${table}_${time.getTime()}`);
  await rdSet(
    `${table}_${time.getTime()}`,
    {
      table,
      data,
      time: ` ${time.toLocaleString()} `,
    },
    hour ? hour * 60 * 60 : 60 * 60
  );
};

/**
 *
 * @param table
 * @param error {Error}
 * @param mess_err
 * @param err_data {Boolean,{}}
 * @return void
 */
export const pushLogError = async (
  table,
  error,
  mess_err,
  err_data = false
) => {
  if (err_data) err_data.error = convertError(error);
  else err_data = convertError(error);
  sendToTelegram(table, mess_err || "error :" + table);
  if("close".default(client.status) )
  aLog1Rp(table, err_data, 2 * 24);
};
