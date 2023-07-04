import {MethodBase} from "@lib";
import {
    addPermissionGroupMember,
    getListPermission,
    getListPermissionGroupMember
} from "@controller/permissionGroupMember";
import {verifyToken} from "@middleware/vetifyToken";


class Permission_group_member extends MethodBase{
    static config_middleware = {};
}

Permission_group_member.get = {
    getListPermission
}

Permission_group_member.insert= {
    addPermissionGroupMember
}
Permission_group_member.middleware=[verifyToken]
export default Permission_group_member
