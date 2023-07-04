import {MethodBase} from "@lib";

import {verifyToken} from "@middleware/vetifyToken";
import {getListCampaign} from "@controller/campaignController";

class Campaign extends MethodBase{
    static config_middleware = {};
}
Campaign.get={
    getListCampaign
}
Campaign.middleware = [verifyToken]
export default Campaign