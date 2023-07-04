import { MethodBase } from "@lib";

import {verifyToken} from "@middleware/vetifyToken";
import {

} from "@controller/campaignController";
import {
    addCampaignSale, countCampaignSale,
    getDetailCampaignSale,
    getListCampaignSale,
    updateCampaignSale
} from "@controller/campaignSaleController";
class Campaign_sale extends MethodBase {
    static config_middleware = {};
}


Campaign_sale.update = {
    updateCampaignSale
}


Campaign_sale.insert={
    addCampaignSale
}
Campaign_sale.get =  {
    getDetailCampaignSale,
    getListCampaignSale,
    countCampaignSale
}


Campaign_sale.delete = {
}
Campaign_sale.middleware  = [verifyToken]
export default Campaign_sale;
