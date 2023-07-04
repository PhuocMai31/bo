import {MethodBase} from "@lib";
import {
    addGroupSale,
    deleteGroupSale,
    getDetailGroupSale,
    getListGroupSale,
    updateGroupSale
} from "@controller/groupSaleController";
import {verifyToken} from "@middleware/vetifyToken";

class Group_sale extends MethodBase{
    static config_middleware = {};
}
Group_sale.get={
    getListGroupSale,
    getDetailGroupSale
}
Group_sale.update={
    addGroupSale,
    updateGroupSale,
    deleteGroupSale
}
Group_sale.middleware=[verifyToken]
export default Group_sale
