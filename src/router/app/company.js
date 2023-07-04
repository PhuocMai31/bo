import { MethodBase } from "@lib";
import {addCompany, deleteCompany, getListCompany, updateCompany} from "@controller/companyController";
import {verifyToken} from "@middleware/vetifyToken";
import {getPermission} from "@controller/permissionController";

class Company extends MethodBase {
    static config_middleware = {};
}
Company.get={
    getListCompany
}

Company.update={
    addCompany,
    updateCompany,
    deleteCompany
}

Company.middleware = [verifyToken ,getPermission]
export default Company;
