import {MethodBase} from "@lib";
import {
    addPermissionToolCategory,
    getListPermissionToolCate,
    getListPermissionToolCateBy
} from "@controller/permissionCategoryToolController";
import {verifyAccount} from "@controller";
import {verifyToken} from "@middleware/vetifyToken";

class Permission_category_tool extends MethodBase{
    static config_middleware = {};
}

Permission_category_tool.get = {
    getListPermissionToolCateBy,
    getListPermissionToolCate
}

Permission_category_tool.insert={
    addPermissionToolCategory
}
Permission_category_tool.middleware=[verifyToken]
export default Permission_category_tool
