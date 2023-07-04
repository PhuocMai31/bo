import {CronJob} from "cron";
import {runRecallCustomer} from "@cron/recallCustomer";
import allotmentCustomerQueen from "@cron/allotmentCustomerCron";
import notifyQueen from "@cron/notifyCron";


const createCronJob = (time, callback, start = true) => {
    return new CronJob(time, callback, null, start, "Asia/Ho_Chi_Minh");
};

createCronJob("0 */1 * * * *", () => {
    if (process.env.NODE_ENV === "local") {
        return
    }

    runRecallCustomer.run()
    allotmentCustomerQueen.runCronJob()
    notifyQueen.runCronJob()
});
