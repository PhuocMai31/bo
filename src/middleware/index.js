import { v4 as uuidv4 } from "uuid";

export const generateClientId = (req, res, next) => {
  req.reqID = uuidv4();
  return next();
};
