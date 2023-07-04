import { MethodBase } from "@lib";
import {
    addCompany, countCompany,
    deleteCompany,
    getDetailCompany,
    getListCompany,
    updateCompany
} from "@controller/companyController";
import {verifyToken} from "@middleware/vetifyToken";
import {Upload} from "@middleware/multer";
import {getPermission} from "@controller/permissionController";

class Company extends MethodBase {
    static config_middleware = {};
}
Company.get={
    getListCompany,
    getDetailCompany,
    countCompany
}

Company.update={
    addCompany,
    updateCompany,
    deleteCompany
}

Company.middleware = [verifyToken ]
Company.config_middleware.addCompany = [new Upload("file"),verifyToken]
Company.config_middleware.updateCompany = [new Upload("file"),verifyToken]

export default Company;
