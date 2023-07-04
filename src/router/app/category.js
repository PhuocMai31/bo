import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";
import {getDetailCategories, getListCategories} from "@controller/categoryController";


class Category extends MethodBase{
    static config_middleware = {};
}
Category.get={
    getListCategories,
    getDetailCategories,
}
Category.middleware = [verifyToken]
export default Category
