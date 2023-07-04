import {MethodBase} from "@lib";
import {addPermissionGroupPermission} from "@controller/permissionGroupPermissionController";
import {verifyToken} from "@middleware/vetifyToken";


class Permission_group_permission extends MethodBase{
    static config_middleware = {};
}

Permission_group_permission.insert={
    addPermissionGroupPermission
}
Permission_group_permission.middleware=[verifyToken]
export default Permission_group_permission
