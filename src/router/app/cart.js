import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";
import {
    addCart,
    countCart,
    getDetailCart,
    getListCart,
    getListCartV2,
    getListCartV3,
    updateCart
} from "@controller/cartController";

class Cart extends MethodBase {
    static config_middleware = {};
}
Cart.get = {
    getListCart  : getListCartV2,
    getDetailCart,
    getListCartV3,

}



Cart.middleware = [verifyToken]
export default Cart;
