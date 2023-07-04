

import {verifyToken} from "@middleware/vetifyToken";
import {
    countProduct,
    getDetailProduct,
    getListProduct,
    importProduct,
    updateProduct,
    getListBuilding, getListApartment
} from "@controller/productController";
import {Upload} from "@middleware/multer";
import {MethodBase} from "@lib";



class Product extends MethodBase{
    static config_middleware = {};
}
Product.get={
    getListProduct,
    getDetailProduct,
    countProduct,
    getListBuilding,
    getListApartment
}
Product.insert={
    importProduct
}
Product.update={
    updateProduct
}
Product.middleware=[verifyToken]
Product.config_middleware.importProduct = [ new Upload("file")]
Product.config_middleware.updateProduct = [ new Upload("file")]

export default Product