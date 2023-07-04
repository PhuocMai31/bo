import { HttpRouter } from "@lib";
import Auth from "../Auth/auth";
import Address from "./address";
import Customer from "./customer";
import User from "./user";
import Company from "./company";
import Exchange from "./exchange";
import Group_customer from "./group_customer";
import Group_member from "./group_member";
import Group_sale from "./group_sale";
import Source from "./source";
import Category from "./category";
import Campaign from "./campaign";
import Permission_group from "./permission_group";
import Permission_group_member from "./permission_group_member";
import Permission_group_permission from "./permission_group_permission";
import Permission_category_tool from "./permission_tool_category";
import Sale_violation from "./sale_violation";
import Test from "./test";
import sale_policy from "./sale_policy";
import Cart from "./cart";
import Product from "./product";
import Payment_info from "./payment_info";
import Investor from "./investor";
import Campaign_sale from "./campaign_sale";
import Template from "./template";
import Bill from "./bill";


const httpRouterWeb = new HttpRouter("/web");
httpRouterWeb.link("/auth", Auth);
httpRouterWeb.link("/address", Address);
httpRouterWeb.link("/customer", Customer);
httpRouterWeb.link("/user", User);
httpRouterWeb.link("/company", Company);
httpRouterWeb.link("/exchange", Exchange);
httpRouterWeb.link("/group_member", Group_member);
httpRouterWeb.link("/group_customer", Group_customer);
httpRouterWeb.link("/group_sale",Group_sale);
httpRouterWeb.link("/source",Source);
httpRouterWeb.link("/category",Category);
httpRouterWeb.link("/campaign",Campaign);
httpRouterWeb.link("/permission_group",Permission_group);
httpRouterWeb.link("/permission_group_member",Permission_group_member);
httpRouterWeb.link("/permission_group_permission",Permission_group_permission);
httpRouterWeb.link("/permission_tool_category",Permission_category_tool);
httpRouterWeb.link("/sale_violation",Sale_violation);
httpRouterWeb.link("/sale_policy",sale_policy);
httpRouterWeb.link("/test",Test);
httpRouterWeb.link("/cart",Cart);
httpRouterWeb.link("/product",Product);
httpRouterWeb.link("/payment_info",Payment_info);
httpRouterWeb.link("/investor",Investor);
httpRouterWeb.link("/campaign_sale",Campaign_sale);
httpRouterWeb.link("/template",Template);
httpRouterWeb.link("/bill",Bill);




export default httpRouterWeb;
