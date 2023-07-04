import {MethodBase} from "@lib";
import {
    addSale,
    deleteSale,
    getDetailGroupMember,
    getListGroupMember,
    updateSale
} from "@controller/groupMemberController";
import {verifyToken} from "@middleware/vetifyToken";

class Group_member extends MethodBase{
    static config_middleware = {};
}
Group_member.get = {
    getListGroupMember   ,
}

Group_member.update={
    addSale,
    updateSale,
    deleteSale
}
Group_member.middleware = [verifyToken]
export default Group_member;
