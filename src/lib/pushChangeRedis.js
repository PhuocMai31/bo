import { departmentRedis } from "@repository";
import { servicePriceRedis } from "@repository";
import { sendToTelegram } from "@util";
import { client2 } from "./redis";
export const listenEventRedis = () => {
  client2.subscribe(servicePriceRedis.key1, (err, key) => {
    if (err)
      return sendToTelegram({
        event: `error redis remove key ${servicePriceRedis.key1}`,
        description: JSON.stringify(err),
      });
    client2.del(`${servicePriceRedis.key1}_${key}`);
  });
  client2.subscribe(departmentRedis.key2, (err, key) => {
    if (err)
      return sendToTelegram({
        event: `error redis remove key ${departmentRedis.key2}`,
        description: JSON.stringify(err),
      });
    client2.del(`${departmentRedis.key2}_${key}`);
  });
  client2.subscribe(departmentRedis.key1, (err, key) => {
    if (err)
      return sendToTelegram({
        event: `error redis remove key ${departmentRedis.key1}`,
        description: JSON.stringify(err),
      });
    client2.del(`${departmentRedis.key1}_${key}`);
  });
};
