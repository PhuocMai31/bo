import {adapterHttps} from "@middleware/adapterRouter";
import {contain} from "@util";
import {adapterMqtt} from "@middleware/adapterRouter";
import middleWearMqtt from "@middleware/middwearMqtt";

export class BaseRouter {
    static get = {};
    static list = {};
    static insert = {};
    static update = {};
    static delete = {};
    static import = {};
    static export = {};
    static middleware = [];
    static detail = {};

    static config_middleware = {};

    /**
     *
     * @param param
     * @param middleware
     * @returns {{init: boolean, fuc, middleware: *[]}|(*&{init: boolean, middleware: *[]})}
     */
    static init(param, ...middleware) {
        if (typeof param === "function")
            return {fuc: param, middleware, init: true};
        return {middleware, init: true, ...param};
    }
}

export class HttpRouter {
    constructor(link = "") {
        this.startLink = link;
    }

    middleWear = [];

    /**
     *
     * @type {string}
     */
    /**
     *
     * @type {Map<any, {controller , resLink}>}
     */

    use(...avg) {
        this.middleWear = avg;
    }

    /**
     *
     * @type {{link : string,controller : [] , method : string}[]}
     */
    list = [];

    /**
     *
     * @param string
     * @param avg []
     */
    on(string, ...avg) {
        if (avg.length === 1 && avg[0] instanceof HttpRouter) {
            avg[0].list.forEach(({link, controller, method, action}) => {
                this.list.push({
                    link: `${this.startLink}${string}${link}`,
                    controller: [...this.middleWear, ...controller],
                    method, action
                });
            });
        } else if (avg.length === 1)
            this.list.push({
                link: `${this.startLink}${string}`,
                controller: [...this.middleWear, ...avg],
                method: "get",
            });
        else if (avg[avg.length - 1] instanceof HttpRouter) {
            const itemPop = avg.pop();
            itemPop.list.forEach(({link, controller, method}) => {
                this.list.push({
                    link: `${this.startLink}${string}${link}`,
                    controller: [...this.middleWear, ...avg, ...controller],
                    method,
                });
            });
        } else
            this.list.push({
                link: `${this.startLink}${string}`,
                controller: [...this.middleWear, ...avg],
                method: "get",
            });
    }

    /**
     *
     * @param string {string}
     * @param avg
     */
    post(string, ...avg) {
        const action = Object.keys(methods).find((value, index) => string.startsWith(`${methods[value]}_`))
        if (action) {
            string = string.replace(action + "_", "")
        }
        if (avg.length === 1 && avg[0] instanceof HttpRouter) {
            avg[0].list.forEach(({link, controller, method}) => {
                this.list.push({
                    link: `${this.startLink}${string}${link}`,
                    controller: [...this.middleWear, ...controller],
                    method: "post",
                    action
                });
            });
        } else if (avg.length === 1)
            this.list.push({
                link: `${this.startLink}${string}`,
                controller: [...this.middleWear, ...avg],
                method: "post",
                action
            });
        else if (avg[avg.length - 1] instanceof HttpRouter) {
            const itemPop = avg.pop();
            itemPop.list.forEach(({link, controller, method}) => {
                this.list.push({
                    link: `${this.startLink}${string}${link}`,
                    controller: [...this.middleWear, ...avg, ...controller],
                    method: "post",
                    action
                });
            });
        } else
            this.list.push({
                link: `${this.startLink}${string}`,
                controller: [...this.middleWear, ...avg],
                method: "post",
                action
            });
    }

    get(string, ...avg) {
        if (avg.length === 1 && avg[0] instanceof HttpRouter) {
            avg[0].list.forEach(({link, controller, method}) => {
                this.list.push({
                    link: `${this.startLink}${string}${link}`,
                    controller: [...this.middleWear, ...controller],
                    method: "get",
                });
            });
        } else if (avg.length === 1) {
            this.list.push({
                link: `${this.startLink}${string}`,
                controller: [...this.middleWear, ...avg],
                method: "get",
            });
        } else if (avg[avg.length - 1] instanceof HttpRouter) {
            const itemPop = avg.pop();
            itemPop.list.forEach(({link, controller}) => {
                this.list.push({
                    link: `${this.startLink}${string}${link}`,
                    controller: [...this.middleWear, ...avg, ...controller],
                    method: "get",
                });
            });
        } else
            this.list.push({
                link: `${this.startLink}${string}`,
                controller: [...this.middleWear, ...avg],
                method: "get",
            });
    }

    /**
     * @param app
     * @return void
     */
    async runRouter(app) {
        this.list.forEach(({method, controller, link, action}) => {
            app[method](link, adapterHttps(controller, action));
        });
    }

    /**
     *
     * @param string
     * @param Config { MethodBase | {run : Function}}}
     */
    link(string, Config) {
        this.on(string, Config.run("/", HttpRouter));
    }
}

export class MethodBase extends BaseRouter {
    /**
     *
     * @param space
     * @param Router {HttpRouter|MqttRouter|any}
     * @return {HttpRouter|MqttRouter}
     */
    static run(space = "/", Router) {
        const router = new Router();
        const listKeys = Object.getOwnPropertyNames(this);
        for (let i = 0; i < listKeys.length; i++) {
            let _space = space
            if (listKeys[i] === "config_middleware") continue;
            if (listKeys[i] === "length") continue;
            if (listKeys[i] === "prototype") continue;
            if (listKeys[i] === "name") continue;
            let method = "on";
            const checkMethod = contain(Object.keys(BaseRouter), null, listKeys[i]);
            if (router instanceof HttpRouter) {
                method = getMethod(checkMethod, listKeys[i]);

            }
            if (methods[listKeys[i]]) {
                _space = listKeys[i] + "_" + _space
            }

            if (!checkMethod) throw new Error("không có method này " + listKeys[i]);
            let middleware = this.middleware;
            if (typeof this[listKeys[i]] === "function") {
                if (this.config_middleware[listKeys[i]])
                    middleware = this.config_middleware[listKeys[i]];
                if (listKeys[i] === "list") {
                    router[method]("", ...middleware, this[listKeys[i]]);
                }

                router[method](_space + listKeys[i], ...middleware, this[listKeys[i]]);
            } else if (typeof this[listKeys[i]] === "object") {
                for (const key of Object.keys(this[listKeys[i]])) {
                    if (typeof this[listKeys[i]][key] === "function") {
                        if (this.config_middleware[key])
                            middleware = this.config_middleware[key];
                        router[method](_space + key, ...middleware, this[listKeys[i]][key]);
                    }
                }
            }
        }
        return router;
    }
}

function getMethod(checkMethod, key) {
    let method = "get";
    if (checkMethod) {
        switch (key) {
            case "list":
            case "get":
            case "export":
                method = "get";
                break;
            default:
                method = "post";
                break;
        }
    }
    return method;
}

export class MqttRouter {
    constructor(link = "") {
        this.startLink = link;
    }

    client;
    startLink = "";
    middleWear = [];
    /**
     *
     * @type {string}
     */
    resLink = "";
    /**
     *
     * @type {Map<any, {controller , resLink}>}
     */

    map = new Map();

    use(...avg) {
        this.middleWear = avg;
    }

    /**
     *
     * @type {{link : string,controller : []}[]}
     */
    list = [];

    run() {
        this.list.forEach(async (value) => {
            this.map.set(value.link, {
                controller: value.controller,
                resLink: this.resLink + value.link.replace(this.startLink, ""),
            });
        });
    }

    /**
     *
     * @param string
     * @param avg []
     */
    on(string, ...avg) {
        if (avg.length === 1 && avg[0] instanceof MqttRouter) {
            avg[0].list.forEach(({link, controller}) => {
                this.list.push({
                    link: `${this.startLink}${string}${link}`,
                    controller: [...this.middleWear, ...controller],
                });
            });
        } else if (avg.length === 1)
            this.list.push({
                link: `${this.startLink}${string}`,
                controller: [...this.middleWear, ...avg],
            });
        else if (avg[avg.length - 1] instanceof MqttRouter) {
            const itemPop = avg.pop();
            itemPop.list.forEach(({link, controller}) => {
                this.list.push({
                    link: `${this.startLink}${string}${link}`,
                    controller: [...this.middleWear, ...avg, ...controller],
                });
            });
        } else
            this.list.push({
                link: `${this.startLink}${string}`,
                controller: [...this.middleWear, ...avg],
            });
    }

    /**
     *
     * @param topic {string}
     * @param mess
     * @return void
     */
    async runRouter(topic, mess) {
        const list = topic.split("/");
        const user_id = Number(list.splice(1, 1).pop());
        const client_id = list.splice(3, 1).pop();
        topic = list.join("/");
        const router = this.map.get(topic);
        if (router) {
            const data = await adapterMqtt(
                mess,
                topic,
                middleWearMqtt(...router.controller),
                user_id
            );

            const list2 = router.resLink.split("/");
            list2.splice(1, 0, user_id);
            list2.splice(4, 0, client_id);
            const back_url = list2.join("/");
            this.client.publish(back_url, JSON.stringify(data));
        }
    }

    /**
     *
     * @param string
     * @param Config { MethodBase | {run : Function}}}
     */
    link(string, Config) {
        this.on(string, Config.run("_", MqttRouter));
    }
}

export const methods = {
    insert: "insert",
    update: "update",
    delete: "delete"
}
