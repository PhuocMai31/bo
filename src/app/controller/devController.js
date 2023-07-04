import {addLogRp, getLogRp, rdRpopList, rdSet} from "@lib";
import {getDetailBoV2GroupSaleMd, getListBoV2GroupSaleMd} from "@model/bo_v2_group_sale";
import {getDetailBoV2GroupMemberMd, getListBoV2GroupMemberMd, updateBoV2GroupMemberMd} from "@model/bo_v2_group_member";
import {getDetailGroupSale} from "@controller/groupSaleController";
import {
    addBoV2PermissionGroupMemberMd,
    getDetailBoV2PermissionGroupMemberMd,
    getListBoV2PermissionGroupMemberMd, updateBoV2PermissionGroupMemberMd
} from "@model";
import {addBoV2PermissionGroupPermissionMd} from "@model/bo_v2_permission_group_permission";
import {addWardMd} from "@model/ward";
import {getListBoV2CampaignMd} from "@model/bo_v2_campaign";

export const getLog = async (req, res) => {
    const {table} = req.query;
    const list = await getLogRp(table);
    res.json(list);
};
export const setLog = async (req, res) => {
    const {table, data} = req.query;
    await addLogRp(table, data);
    res.json({setlog: "success"});
};

export const popData = async (req, res) => {
    const {table} = req.query;
    const data = await rdRpopList(table);
    res.json(data);
};
export const asyncGroupMember = async () => {
    const members = await getListBoV2GroupMemberMd({})
    for (let member of members) {
        const checkBanHang = await getDetailBoV2PermissionGroupMemberMd({staff_object_id: "nhanvienbanhang"})
        if (checkBanHang === null) {
            await addBoV2PermissionGroupMemberMd({
                user_id: member.user_id,
                exchange_id: member.exchange_id,
                staff_object_id: "nhanvienbanhang",
                company_id: member.company_id,
                status: 1
            })
        }

    }
}


export const asyncGroupMemberV2 = async () => {
    const sale = await getListBoV2GroupSaleMd({})
    for (let boV2GroupSale of sale) {
        const members = await getListBoV2GroupMemberMd({group_sale_id: boV2GroupSale.id})
        for (let member of members) {
            await updateBoV2GroupMemberMd({
                company_id: boV2GroupSale.company_id,
                exchange_id: boV2GroupSale.exchange_id
            }, {id: member.id})
        }
    }
}
export  const asyncCustomerFinalDate= async  ()=> {
    const customers = await getListBoV2CustomerMd({})
    for (let customer of customers) {
        const history = await getDetailBoV2SaleCustomerCampaignHistoryMd({customer_id : customer.id , action : "cham_soc"} , false,false,[["created_at",  "desc"]])
        if(history){
           await updateBoV2CustomerMd({ final_time_care : history.created_at} , {id : customer.id})
        }
    }
}


export  const asyncMember = async  ()=> {
       const mm  =await  getListBoV2PermissionGroupMemberMd({

       })
    for (let boV2GroupMember of mm) {
        if(boV2GroupMember.staff_object_id === "giamdocsan") {
           await updateBoV2PermissionGroupMemberMd({scope_type : "department" , scope_id : boV2GroupMember.exchange_id} , {id : boV2GroupMember.id})
        }
        if(boV2GroupMember.staff_object_id === "truongnhom") {
            const g = await getDetailBoV2GroupMemberMd({user_id : boV2GroupMember.user_id})
            await updateBoV2PermissionGroupMemberMd({scope_type : "group" , scope_id :  g.group_sale_id } , {id : boV2GroupMember.id})

        }
        if(boV2GroupMember.staff_object_id === "truongphong") {
            await  updateBoV2PermissionGroupMemberMd({scope_type : "department" , scope_id : boV2GroupMember.exchange_id}, {id : boV2GroupMember.id})

        }
    }
}


export  const asyncMember2 = async ()=> {
    const campagin = await  getListBoV2CampaignMd({})
    for (let boV2Campaign of campagin) {
        /**
         *
         * @type {[]}
         */
        const userManager = JSON.parse(boV2Campaign.user_id_manager)
        for (let userManagerElement of userManager) {
            await addBoV2PermissionGroupMemberMd({
                staff_object_id : "quanlychiendich",
                scope_type : "campaign",
                scope_id : boV2Campaign.id,
                user_id : userManagerElement,
            })
        }
    }
}
