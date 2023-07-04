import { MethodBase } from "@lib";

import {verifyToken} from "@middleware/vetifyToken";
import {
    addCampaign,
    countCampaign,
    deleteCampaign,
    getListCampaign,
    updateCampaign,
    getDetailCampaign
} from "@controller/campaignController";
class Campaign extends MethodBase {
    static config_middleware = {};
}
Campaign.update = {
    updateCampaign
}
Campaign.insert={
    addCampaign
}
Campaign.get =  {
    getListCampaign,
    countCampaign,getDetailCampaign
}

Campaign.delete = {
    deleteCampaign
}
Campaign.middleware  = [verifyToken]
export default Campaign;
