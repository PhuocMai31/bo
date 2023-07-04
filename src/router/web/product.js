import {MethodBase} from "@lib";

import {verifyToken} from "@middleware/vetifyToken";
import {
    countProduct,
    getDetailProduct, getListBuilding, getListHistoryProduct,
    getListProduct,
    importProduct,
    updateProduct
} from "@controller/productController";
import {Upload} from "@middleware/multer";



class Product extends MethodBase{
    static config_middleware = {};
}
Product.get={
    getListHistoryProduct,
    getListProduct,
    getDetailProduct,
    getListBuilding,
    countProduct,

}
Product.insert={
    importProduct
}
Product.update={
    updateProduct
}
Product.middleware=[verifyToken]
Product.config_middleware.importProduct = [ new Upload("file"),verifyToken]
Product.config_middleware.updateProduct = [ new Upload("file"),verifyToken]

export default Product