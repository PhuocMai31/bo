import serialize from "serialize-javascript";
import {deserialize, error_no, makeid, sendToTelegram, throwErrorNo} from "@util";
import { client } from "@config/redisConnect";
import { pushLogError } from "./debug";
import { $ } from "./lodash";
/**
 //  * set key value
 * @param  key {String}
 * @param value  {Object}
 * @param  EX {Number}
 * @return void
 */
export const rdSet = (key, value, EX = 30 * 24 * 60 * 60) => {
  return timeoutRedis(() => {
    client.set(key, serialize(value), "EX", EX);
  }, key);
};

/**
 //  * del an key cache
 * @param {*} key
 * @return {void}
 */
export const rdDel = (key) => {
  return timeoutRedis(() => client.del(key), key);
};

/**
 //  * set expire for an key
 * @param {string} key
 * @param {Number} EX
 */
export const rdExpire = (key, EX) => {
  client.expire(key, EX);
};

export const timeoutRedis = async (callBack, key) => {
  return new Promise(async (resolve, reject) => {
    const t = setTimeout(() => {
      reject(error_no.redis);
    }, 10000);
    const value = await callBack();
    clearTimeout(t);
    resolve(value);
  }).catch((e) => {
    return throwErrorNo(e);
  });
};
/**
 //  * get
 * @param {*} key
 */
export const rdGet = (key) => {
  return timeoutRedis(async () => {
    const value = await client.get(key);
    if (value) return deserialize(value);
    return value;
  }, key);
};

/**
 //  * get
 * @param {String} key
 */
export const rdGetList = (key) => {
  return timeoutRedis(async () => {
    const value = await client.lrange(key, 0, -1);
    return value;
  }, key);
};

/**
 //  * get
 * @param {*} key
 */
export const rdPushList = (key, value) => {
  return timeoutRedis(async () => {
    return client.lpush(key, serialize(value));
  }, key);
};

/**
 //  * get second
 * @param {*} key
 * @returns Promise seconds of an key
 */
export const rdCheckExpire = (key) => {
  return timeoutRedis(() => client.ttl(key));
};
/**
 *
 * @param key
 * @param sqlCallback
 * @param time {Boolean|Number}
 * @return {Promise<any>}
 */
export const cacheRedis = async (key, sqlCallback, time = false) => {
  let result = await rdGet(key);
  if (!result) {
    result = await sqlCallback();
    if (result === null || result.length === 0) return result;
    await rdSet(key, result, time || 3 * 24 * 60 * 60);
  }
  return result;
};
export const rdPushKey = async (key, value) => {
  const key2 = `${key}_${makeid(9)}_${Date.now()}`;
  await timeoutRedis(async () => {
    return client.lpush(key, key2);
  }, key);
  await rdSet(key2, value);
};
/**
 *
 * @param key
 * @param sqlCallback
 * @param time
 * @return {Object}
 */
export const cacheRd = async (key, sqlCallback, time = 12) => {
  let result = await rdGet(key);
  if (!result) {
    result = await sqlCallback();
    if (result === null || result.length === 0) return result;
    await rdSet(key, result, time * 60 * 60);
  }
  return result;
};
/**
 *
 * @param key
 * @return void
 */
export const ClearCachesRd = (key) => {
  rdDel(key);
};

export const rdRpopList = (key) => {
  return timeoutRedis(() => {
    return client.rpop(key);
  }, key);
};

export class ArrRedis {
  constructor(name) {
    this.name = name;
    this.status = false;
  }
  getLen() {
    return client.llen(this.name);
  }
  async getAll() {
    const list = await rdGetList(this.name);
    return list.map((value) => deserialize(value));
  }
  /**
   *
   * @param value
   * @return void
   */
  async push(value) {
    if (!value) return;
    return rdPushKey(this.name, value);
  }

  async pop() {
    const dataPop = await rdRpopList(this.name);
    const data = await rdGet(dataPop);
    await rdDel("dataPop");
    return data;
  }

  /**
   *
   * @return void
   */
  async runCronJob() {
    if (this.status === true) return;
    let len = await this.getLen();
    if (len <= 0) {
      this.status = false;
      return;
    }
    this.status = true;
    const reRun = [];
    do {
      const data = await this.pop();
      len -= 1;
      try {
        await this.callbackCron(data);
      } catch (error) {
        reRun.push(data);
        pushLogError(
            "error" + this.name,
            error,
            "error  cronjob:" + this.name,
            data
        );
        sendToTelegram("error " + this.name);
      }
    } while (len > 0);
    if (reRun.length) {
      for (let reRunElement of reRun) {
        await this.push(reRunElement);
      }
    }
    this.status = false;
  }
  callbackCron() {}
}
/**
 *
 * @param id
 * @param key
 * @return {string}
 */
export const genTokenById = (id, key = "") => {
  try {
    const date = new Date().getTime();
    return btoa(`${id}${key}${date}${$.makeId(5)}`);
  } catch (error) {
    throw new Error("save token to redis error");
  }
};
