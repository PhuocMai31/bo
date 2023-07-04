import { resFail, response } from "@util";
import {LANGUAGE} from "@constant";
import { pushLogEnd } from "@lib";
import { convertError } from "@util";
import { Controller } from "@lib";

export const adapterMiddleware = (callback) => {
  return async (req, res, next) => {
    let data = req.data;
    const { files, file, ...param } = data;
    let { language } = data;
    try {
      const controller = new Controller(language);
      const resp = await callback(data, controller);
      resp[0] == false &&
        (await pushLogEnd(data.reqID, {
          building_id: data.building_id,
          param,
          error: resp[2],
          status: 0,
          response: JSON.stringify(resp),
        }));

      if (resp[0]) {
        data = Object.assign(data, resp[2]);

        req.data = data;
        return next();
      }

      return response(res, ...resp);
    } catch (e) {
      console.log(e);
      await pushLogEnd(data.reqID, {
        building_id: data.building_id,
        param,
        error: convertError(e),
        status: 0,
      });
      return resFail(LANGUAGE[language].error_system);
    }
  };
};
