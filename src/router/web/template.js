import {
    addTemplate,
    countTemplate,
    getDetailTemplate,
    getListTemplate,
    updateTemplate
} from "@controller/templateController";
import {MethodBase} from "@lib";
import {verifyToken} from "@middleware/vetifyToken";
class Template extends MethodBase{
    static config_middleware = {};
}
Template.get = {
    getListTemplate,
    getDetailTemplate,
    countTemplate
}
Template.insert = {
    addTemplate
}
Template.update = {
    updateTemplate
}
Template.middleware = [verifyToken]
export default Template;
