import mongoose from "mongoose";
import { addLogRp } from "../../../lib/debug";
import { sendToTelegram } from "@util";
export let connect = false;

export const connectMongoose = (url) => {
  try {
    const db = mongoose.createConnection(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    db.on("error", function (error) {
      console.log(
        `MongoDB :: connection ${this.name} ${JSON.stringify(error)}`
      );
      db.close().catch(() =>
        console.log(`MongoDB :: failed to close connection ${this.name}`)
      );
    });

    db.on("connected", function () {
      mongoose.set("debug", function (col, method, query, doc) {
        console.log(
          `MongoDB :: ${this.conn.name} ${col}.${method}(${JSON.stringify(
            query
          )},${JSON.stringify(doc)})`
        );
      });
      console.log(`MongoDB :: connected ${this.name}`);

      sendToTelegram({
        processTele: "connect mongoose ",
        event: "connect success",
        description: this.name,
      });
    });

    db.on("disconnected", function () {
      console.log(`MongoDB :: disconnected ${this.name}`);
    });
    return db;
  } catch (error) {
    addLogRp("error", error);
  }
};
const user = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const database = process.env.MONGO_DATABASE;
const post = process.env.MONGO_PORT;
const host = process.env.MONGO_HOST;
const account = user ? `${user}:${password}@` : "";
const url = `mongodb://${account}${host}:${post}/${database}`;
export const building_care = connectMongoose(url);
