import {MethodBase} from "@lib";
import {
    addPermissionGroup,
    countPermissionGroup, delPermissionGroup, getDetailPermission,
    getListPermissionGroup,
    updatePermissionGroup
} from "@controller/permissionController";
import {verifyToken} from "@middleware/vetifyToken";
import {getDetailPermissionGroup} from "@controller/permissionGroupMember";
import {Upload} from "@middleware/multer";


class Permission_group extends MethodBase{
    static config_middleware = {};
}

Permission_group.get = {
    getListPermissionGroup,
    getDetailPermissionGroup,
    countPermissionGroup,
    getDetailPermission
}

Permission_group.insert= {
    addPermissionGroup,
    updatePermissionGroup
}
Permission_group.delete = {
    delPermissionGroup
}
Permission_group.middleware=[verifyToken]

Permission_group.config_middleware.update=[new Upload("file")]
export default Permission_group
