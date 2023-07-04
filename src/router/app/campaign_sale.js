import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";
import {countCampaignSale, getDetailCampaignSale, getListCampaignSale} from "@controller/campaignSaleController";

class Campaign_sale extends MethodBase{
    static config_middleware = {};
}
Campaign_sale.get={
    getListCampaignSale,
    countCampaignSale,
    getDetailCampaignSale
}
Campaign_sale.middleware = [verifyToken]
export default Campaign_sale