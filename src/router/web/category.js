import {
    addBuilding,
    addCategories, countCategories, getDetailCategories, getListBuilding,
    getListCategories, updateBuilding,
    updateCategories
} from "@controller/categoryController";
import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";
import {deleteCompany} from "@controller/companyController";
import {Upload} from "@middleware/multer";

class Category extends MethodBase {
    static config_middleware = {};
}

Category.get = {
    getListCategories,
    countCategories,
    getDetailCategories,
    getListBuilding
}

Category.insert= {
    addCategories,
    addBuilding
}

Category.update = {
    updateCategories,
    updateBuilding
}
Category.delete = {

}
Category.middleware = [verifyToken]
Category.config_middleware.addCategories=[new Upload([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 8 }
],"fields")]
Category.config_middleware.updateCategories=[new Upload([
    { name: 'avatar', maxCount: 1 },
    { name: 'gallery', maxCount: 8 }
],"fields")]

export default Category;
