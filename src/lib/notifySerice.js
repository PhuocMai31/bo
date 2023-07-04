import { google } from "googleapis";
import * as https from "https";

const HOST = "fcm.googleapis.com";
const MESSAGING_SCOPE = "https://www.googleapis.com/auth/firebase.messaging";
const SCOPES = [MESSAGING_SCOPE];
/**
 * Send HTTP request to FCM with given message.
 *  @param {String} token
 *  @param title
 *  @param body
 *  @param rest
 *  @param click_action
 *  @param category
 *  @param PROJECT_ID
 *  @param client_email
 *  @param private_key
 * @param {object} fcmMessage will make up the body of the request.
 */
export function sendFcmMessage(
  token,
  title,
  body,
  rest = {},
  click_action,
  category,
  { PROJECT_ID, client_email, private_key }
) {
  const PATH = "/v1/projects/" + PROJECT_ID + "/messages:send";
  const fcmMessage = buildNotify(
    token,
    title,
    body,
    rest,
    click_action,
    category
  );
  getAccessToken({ client_email, private_key }).then(function (accessToken) {
    const options = {
      hostname: HOST,
      path: PATH,
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    const request = https.request(options, function (resp) {
      resp.setEncoding("utf8");
      resp.on("data", function (data) {
        console.log("Message sent to Firebase for delivery, response:");
        console.log(data);
      });
    });

    request.on("error", function (err) {
      console.log("Unable to send message to Firebase");
      console.log(err);
    });

    request.write(JSON.stringify(fcmMessage));
    request.end();
  });
}

/**
 * Get a valid access token.
 */
function getAccessToken({ client_email, private_key }) {
  return new Promise(function (resolve, reject) {
    const jwtClient = new google.auth.JWT(
      client_email,
      null,
      private_key,
      SCOPES,
      null
    );
    jwtClient.authorize(function (err, tokens) {
      if (err) {
        reject(err);
        return;
      }
      resolve(tokens.access_token);
    });
  });
}

/**
 * Construct a JSON object that will be used to customize
 * the messages sent to iOS and Android devices.
 */
// function buildOverrideMessage() {
//   const fcmMessage = buildCommonMessage();
//   const apnsOverride = {
//     payload: {
//       aps: {
//         badge: 1,
//       },
//     },
//     headers: {
//       "apns-priority": "10",
//     },
//   };
//
//   const androidOverride = {
//     notification: {
//       click_action: "com.dxmb.bms",
//     },
//   };
//
//   fcmMessage["message"]["android"] = androidOverride;
//   fcmMessage["message"]["apns"] = apnsOverride;
//   fcmMessage.token =
//     "eAgDfMfPSQaCTvl2tlZvrP:APA91bEyeJ8KQr3CTxqRlfxpl_bZhzS-glu-J6RZI07DGQnvB5by6h0wwmsCRY2p9lWEfSPQCarO1Mw7cBK8szZA_nN0wRK2GejaDcUAdASa5P3ean32iSeWNIMOmcmYUJg9NTbAxNfo";
//   return fcmMessage;
// }

/**
 * Construct a JSON object that will be used to define the
 * common parts of a notification message that will be sent
 * to any app instance subscribed to the news topic.
 */
// function buildCommonMessage() {
//   return {
//     message: {
//       topic: "news",
//       notification: {
//         title: "FCM Notification",
//         body: "Notification from FCM",
//       },
//     },
//   };
// }
const buildNotify = (token, title, body, rest, click_action, category) => {
  Object.keys(rest).forEach((key) => {
    if (typeof rest[key] !== "string") rest[key] = `${rest[key]}`;
  });
  return {
    message: {
      token,
      notification: {
        body,
        title,
      },
      android: {
        notification: {},
      },
      apns: {
        payload: {
          aps: {},
        },
      },
      data: rest,
    },
  };
};
