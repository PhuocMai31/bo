import {MethodBase} from "@lib";
import {getListGroupCustomer} from "@controller/groupCustomerController";
import {verifyToken} from "@middleware/vetifyToken";


class Group_customer extends MethodBase{
    static config_middleware = {};
}
Group_customer.get={
    getListGroupCustomer
}
Group_customer.middleware = [verifyToken]
export default Group_customer;
