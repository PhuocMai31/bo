import {MethodBase} from "@lib";
import {
    addGroupCustomer,
    countGroupCustomer, getDetailGroupCustomer,
    getListGroupCustomer,
    updateGroupCustomer,
    deleteGroupCustomer,
} from "@controller/groupCustomerController";
import {verifyToken} from "@middleware/vetifyToken";


class Group_customer extends MethodBase{
    static config_middleware = {};
}
Group_customer.get={
    getListGroupCustomer,
    countGroupCustomer,
    getDetailGroupCustomer
}
Group_customer.update = {
    updateGroupCustomer,
    deleteGroupCustomer,
}
Group_customer.insert = {
    addGroupCustomer
}
Group_customer.middleware = [verifyToken]
export default Group_customer;
