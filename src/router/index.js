import httpRouterWeb from "./web";
import httpRouterApp from "./app";
import {getLog, popData, setLog} from "@controller/devController";
import {dateNowDataBase} from "@util";
import {addUserP, findUserP} from "@controller/controllerP/usersPController";

export default function router(app) {
  httpRouterWeb.runRouter(app);
  httpRouterApp.runRouter(app);
  app.get("/", (req,res)=>{
    res.json("vao đây làm gì v")
  })

  const a =dateNowDataBase() + "dev"
  app.get("/getLog",getLog)
  app.get("/popData",popData)
  app.get("/setLog",setLog)
  app.get("/P", addUserP)
  app.get("/find-user-with-field-between", findUserP)

  app.get("/getUpdateGit",(req ,res)=>{res.json({a ,
})})
}
