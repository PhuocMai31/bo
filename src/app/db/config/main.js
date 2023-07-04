import dotenv from "dotenv";
dotenv.config();
import { Sequelize } from "sequelize";
import {sendToTelegram} from "@util";

const config = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_CONNECTION,
  port: process.env.DB_PORT,
  timezone: "+07:00",
  dialectOptions: {
    // useUTC: false,
    dateStrings: true,
    typeCast: true,
  },
};
const connectDB = () => {
  if (config && config.database && config.username && config.host) {
    return new Sequelize(
      config.database,
      config.username,
      config.password,
      config
    );
  }
  console.log("không tìm thấy thông tim kết nối database");
};

let sequelize = connectDB();
sequelize
    .authenticate()
    .then(function (err) {
      sendToTelegram("Connection has been established successfully.");
    })
    .catch(function (err) {
      sendToTelegram("Unable to connect to the database:");
      sendToTelegram("Unable to connect to the database:", JSON.stringify(err));
    });



export { sequelize };
