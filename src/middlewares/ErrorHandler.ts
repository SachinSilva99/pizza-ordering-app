import {StandardResponse} from "../dto/StandardResponse";
import {NotFoundError} from "../types/error/NotFoundError";
import {UnAuthorizedError} from "../types/error/UnAuthorizedError";
import {Response} from "express";

const errorHandler = (err: any, req: any, res: Response, next:any) => {
  if (err instanceof NotFoundError) {
    return res.status(err.statusCode || 404).send({
      statusCode: err.statusCode || 404,
      msg: err.message,
    });
  }
  if (err instanceof UnAuthorizedError) {
    return res.status(err.statusCode || 401).send({
      statusCode: err.statusCode || 401,
      msg: err.message,
    });
  }
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const response: StandardResponse<string> = {
    statusCode: statusCode,
    msg: message
  }
  return res.status(statusCode).send(response);
}
export default errorHandler;
