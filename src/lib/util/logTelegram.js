import {addLogRp} from "@lib";
import axios from "axios";
import pm2 from "pm2";
import {dateNowDataBase} from "./formatDate";
//
// /**
//  * @param {string} message
//  * @returns {Promise<unknown>}
//  */
// /**
//  *
//  * @param processTele
//  * @param event
//  * @param description
//  * @param timestamp
//  * @param param
//  * @return void
//  */
// export async function sendToTelegram({
//                                          processTele,
//                                          event,
//                                          description,
//                                          timestamp,
//                                          param,
//                                      }) {
//     try {
//         let link = processTele
//             ? processTele.indexOf("?") === -1
//                 ? processTele
//                 : processTele.slice(0, processTele.indexOf("?"))
//             : "";
//         const message = `
//      <b>buiding Api :${process.env.DOMAIN} </b>
//      <a href="${process.env.DOMAIN}${link}"> ${link}</a>
//     <b> ${event}: ${description} </b>
//     <b> ${param}: ${param} </b>
//     <i>${timestamp}</i>
//     `;
//         const chat_id = process.env.CHAT_ID;
//         const bot_token = "bot5175382144:AAEFgtXE4DDkGigkt7-x8yV9ahn3EAmgb-4";
//         const url = `https://api.telegram.org/${bot_token}/sendMessage?chat_id=${chat_id}&text=${message}&parse_mode=html`;
//         const res = await axios.post(url);
//     } catch (error) {
//         await addLogRp("sendLogError", error);
//     }
// }

/**
 *
 * @param title
 * @param desc
 * @param chatId
 * @param botToken
 * @return void
 * */
export async function sendToTelegram(
    title,
    desc = "",
    chatId = false,
    botToken = false
) {
    try {
        const message = `
    <b>buiding Api :${process.env.DOMAIN} </b>
    <b>title: ${title} </b>
    <b>detail: ${desc} </b>
    <i>${dateNowDataBase()}</i>
    `;

        const chat_id = chatId || process.env.CHAT_ID;
        const bot_token =
            botToken || "bot5175382144:AAEFgtXE4DDkGigkt7-x8yV9ahn3EAmgb-4";
        const url = `https://api.telegram.org/${bot_token}/sendMessage?chat_id=${chat_id}&text=${message}&parse_mode=html`;
        const res = await axios.post(url);
    } catch (error) {
    }
}

export const listenError = () => {
    const listAsset = ["eFarm"]
    pm2.launchBus(function (err, bus) {
        try {
            bus.on("log:err", async (data) => {
                if (listAsset.some((value) => value.like(data.process.name))) {
                    await addLogRp("sever:err", data, 30 * 60);
                    await sendToTelegram({
                        processTele: data.process.name,
                        event: "error",
                        description: "error sever",
                        timestamp: new Date(data.at),
                    });
                }
            });
            bus.on("pm2:kill", async (data) => {
                await sendToTelegram({
                    processTele: "PM2",
                    event: "kill",
                    description: data.msg,
                    timestamp: Date.now(),
                });
            });
        } catch (e) {
        }
    });
};
