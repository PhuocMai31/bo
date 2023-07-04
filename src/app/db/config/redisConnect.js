import dotenv from "dotenv";
import Redis from "ioredis";
import {convertError, sendToTelegram} from "@util";

dotenv.config();
const user = process.env.REDIS_USER || "";
const pass = process.env.REDIS_PASSWORD || "";
const host = process.env.REDIS_HOST;
const post = process.env.REDIS_PORT;
/**
 *
 * @type {Redis}
 */
export const client = (() => {
  if (post && host) {
    const redis = new Redis({
      port: post, // Redis port
      host: host, // Redis host
      username: user || "", // needs Redis >= 6
      password: pass || "",
      db: 0, // Defaults to 0
    });
    redis.on("error", (err) => {
      sendToTelegram("error connect redis"  ,JSON.stringify(convertError(err)));
    });
    redis.on("connect", () => {
      sendToTelegram("connect redis");
    });
    return redis;
  }
  console.log("khong tim thay ket noi redis");
  return { status: "close" };
})();
//
//
//
// export const client2 = new Redis({
//   port: process.env.REDIS_HOST_LARAVEL, // Redis port
//   host: process.env.REDIS_PORT_LARAVEL, // Redis host
//   username: "", // needs Redis >= 6
//   password: process.env.REDIS_PASSWORD_LARAVEL || "",
//   db: 0, // Defaults to 0
// });

// createClient({ url: `redis://${}:${ || ""}@${}:${}` });

