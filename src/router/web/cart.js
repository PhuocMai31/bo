import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";
import {addCart, countCart, getDetailCart, getListCart, updateCart, deleteCart} from "@controller/cartController";
import {Upload} from "@middleware/multer";

class Cart extends MethodBase {
    static config_middleware = {};
}

Cart.update = {
    updateCart,
    deleteCart
}
Cart.insert = {
    addCart
}
Cart.get = {
    getListCart,
    countCart,
    getDetailCart
}

Cart.middleware = [verifyToken]
Cart.config_middleware.addCart=[new Upload("file"),verifyToken]
Cart.config_middleware.updateCart=[new Upload("file"),verifyToken]
export default Cart;
