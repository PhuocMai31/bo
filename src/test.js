import {Controller, ModelQuery} from "@lib";
import {asyncMember2} from "@controller/devController";
import {getListCustomer} from "@controller/customerController";
import {getDetailBoV2UserInfoMd, getListBoV2CustomerMd, updateBoV2CustomerMd} from "@model";
import {getDetailBoV2CampaignMd, getListBoV2CampaignMd, updateBoV2CampaignMd} from "@model/bo_v2_campaign";
import {getDetailSalePolicyRp, updateSalePolicyRp} from "@repository/salePolicyRepo";
import {updateSalePolicy} from "@controller/salePolicyController";
import {getListUser} from "@controller/userController";
import {mauHopDong, themHopDongTuVan} from "@controller/billController";
import {getListPermissionToolCateBy} from "@controller/permissionCategoryToolController";
import {updatePermissionGroup} from "@controller/permissionController";
import {Sequelize} from "sequelize";
import {sendToTelegram} from "@util";

const con = new Controller("VI")
con.user_id = 83
con.p.master = true
const test = async () => {

}
test()

