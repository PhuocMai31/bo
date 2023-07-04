import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";
import {

    addCustomer,
    deleteCustomer,
    getCountCustomer,
    getDetailCustomer,
    getListCustomer,
    importCustomer,
    updateCustomer,
    expListCustomer,
    importCustomerByFile,
    getListCustomerRecall,
    countCustomerRecall,
    thuHoiKhachHang,
    getDetailCustomerStatus, countCustomersAllocatedByMonth, countCustomerOverviewOfManager
} from "@controller/customerController";
import {Upload} from "@middleware/multer";
import {
    addSaleCustomerCampaignHistoryTakeCare, getListSaleCustomerCampaignHistory
} from "@controller/saleCustomerCampaignHistoryController";

class Customer extends MethodBase {
    static config_middleware = {};
}


Customer.get = {
    getListCustomer,
    getDetailCustomer ,
    getListSaleCustomerCampaignHistory   ,
    getCountCustomer,
    expListCustomer,
    getListCustomerRecall,
    countCustomerRecall,
    getDetailCustomerStatus,
    countCustomersAllocatedByMonth,
    countCustomerOverviewOfManager
}
Customer.update = {
    updateCustomer,
    thuHoiKhachHang
}
Customer.insert = {
    addCustomer,
    addSaleCustomerCampaignHistoryTakeCare                  ,
    importCustomer,
    importCustomerByFile,
}
Customer.delete = {deleteCustomer}
Customer.middleware = [verifyToken]
Customer.config_middleware.updateCustomer =[new Upload([
    { name: 'cmt_img_before', maxCount: 1 },
    { name: 'cmt_img_after', maxCount: 1 }
],"fields"), verifyToken]
Customer.config_middleware.addCustomer = [new Upload([
    { name: 'cmt_img_before', maxCount: 1 },
    { name: 'cmt_img_after', maxCount: 1 }
],"fields"), verifyToken]
Customer.config_middleware.testFile = [new Upload("file")]
Customer.config_middleware.importCustomer = [new Upload("file"), verifyToken]
Customer.config_middleware.importCustomerByFile = [new Upload("file")]

export default Customer;
