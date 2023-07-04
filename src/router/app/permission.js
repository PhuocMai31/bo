import {getDetailPermission} from "@controller/permissionController";


import {MethodBase} from "@lib";
import {
    addGroupSale,
    deleteGroupSale,
    getDetailGroupSale,
    getListGroupSale,
    updateGroupSale
} from "@controller/groupSaleController";
import {verifyToken} from "@middleware/vetifyToken";

class Permission extends MethodBase{
    static config_middleware = {};
}
Permission.get={
    getDetailPermission,
}
Permission.middleware=[verifyToken]
export default Permission
