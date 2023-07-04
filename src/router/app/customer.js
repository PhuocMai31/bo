import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";
import {
    addCustomer,
    countAllottedCustomersOfSale,
    countCustomerOverviewOfManager,
    countCustomersAllocatedByMonth,
    getCountCustomerV2,
    getDetailCustomer,
    getDetailCustomerStatus,
    getListCustomerV2,
    updateCustomer
} from "@controller/customerController";
import {Upload} from "@middleware/multer";
import {
    addSaleCustomerCampaignHistoryTakeCare, getListSaleCustomerCampaignHistory
} from "@controller/saleCustomerCampaignHistoryController";


class Customer extends MethodBase {
    static config_middleware = {};
}

Customer.get = {
    getListCustomer: getListCustomerV2,
    getDetailCustomer,
    getListSaleCustomerCampaignHistory,
    getCountCustomer :getCountCustomerV2,
    getDetailCustomerStatus,
    countCustomersAllocatedByMonth,
    countAllottedCustomersOfSale,
    countCustomerOverviewOfManager,
}
Customer.update = {
    updateCustomer
}
Customer.insert = {
    addCustomer,
    addSaleCustomerCampaignHistoryTakeCare
}
Customer.middleware = [verifyToken]
Customer.config_middleware.updateCustomer = [new Upload([
    {name: 'cmt_img_before', maxCount: 1},
    {name: 'cmt_img_after', maxCount: 1}
], "fields"), verifyToken]
Customer.config_middleware.addCustomer = [new Upload([
    {name: 'cmt_img_before', maxCount: 1},
    {name: 'cmt_img_after', maxCount: 1}
], "fields"), verifyToken]
export default Customer;
