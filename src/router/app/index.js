import { HttpRouter } from "@lib";
import Auth from "../Auth/auth";
import Customer from "./customer";
import Address from "./address";
import Source from "./source";
import Group_customer from "./group_customer";
import Sale_violation from "./sale_violation";
import Campaign from "./campaign";
import User from "./user";
import Exchange from "./exchange";
import Category from "./category";
import TokenPush from "./tokenPush";
import Group_sale from "./group_sale";
import Campaign_sale from "./campaign_sale";
import Cart from "./cart";
import Product from "./product";
import Bill from "./bill";
import Permission_group_member from "./permission_group_member";
import Sale_policy from "./sale_policy";
import Required from "./required";
import Permission from "./permission";


const httpRouterApp = new HttpRouter("/app");
httpRouterApp.link("/auth", Auth);
httpRouterApp.link("/customer", Customer);
httpRouterApp.link("/address", Address);
httpRouterApp.link("/source",Source);
httpRouterApp.link("/group_sale",Group_sale);
httpRouterApp.link("/group_customer",Group_customer);
httpRouterApp.link("/sale_violation",Sale_violation);
httpRouterApp.link("/campaign",Campaign);
httpRouterApp.link("/exchange",Exchange);
httpRouterApp.link("/user",User);
httpRouterApp.link("/category",Category);
httpRouterApp.link("/tokenPush",TokenPush);
httpRouterApp.link("/campaign_sale",Campaign_sale);
httpRouterApp.link("/permission_group_member",Permission_group_member);
httpRouterApp.link("/product",Product);
httpRouterApp.link("/cart",Cart);
httpRouterApp.link("/bill",Bill);
httpRouterApp.link("/sale_policy",Sale_policy);
httpRouterApp.link("/required",Required);
httpRouterApp.link("/permission",Permission);



export default httpRouterApp;
