import {MethodBase} from "@lib";
import {addSale, deleteSale, updateSale} from "@controller/groupMemberController";

class Group_member extends MethodBase{
    static config_middleware = {};
}
Group_member.update={
    addSale,
    updateSale,
    deleteSale
}

export default Group_member;