import { ArrRedis } from "@lib/redis";
import {
  getDetailFirebaseServiceAccountMd,
  getListFirebaseTokenPushMd,
} from "@model";
import { sendFcmMessage } from "@lib";

export const notifyQueen = new ArrRedis("notifyQueen");

notifyQueen.callbackCron =async ({ title, body, id_sender, type_sender, user_id  }) => {
    const firebaseInfo = await getDetailFirebaseServiceAccountMd({
        code: "qsland",
    });
    const tokenPush = await getListFirebaseTokenPushMd({ user_id });
    tokenPush.forEach((value, index) => {
        sendFcmMessage(
            value.token,
            title,
            body,
            {
                id_sender,
                type_sender,
            },
            value.bundle_id,
            value.bundle_id,
            {
                PROJECT_ID: firebaseInfo.project_id,
                client_email: firebaseInfo.client_email,
                private_key: firebaseInfo.private_key,
            }
        );
    });
}

export  default  notifyQueen