import {StandardResponse} from "../dto/StandardResponse";
import {NotFoundError} from "../types/error/NotFoundError";
import {UnAuthorizedError} from "../types/error/UnAuthorizedError";
import {Response} from "express";
import {CommonError} from "../types/error/CommonError";
import {badRequest, notFound, unauthorized} from "../utils/constants";

const errorHandler = (err: any, req: any, res: Response, next:any) => {
  if (err instanceof NotFoundError) {
    return res.status(notFound).send({
      statusCode: notFound,
      msg: err.message,
    });
  }
  if (err instanceof CommonError) {
    return res.status(badRequest).send({
      statusCode: badRequest,
      msg: err.message,
    });
  }
  if (err instanceof UnAuthorizedError) {
    return res.status(unauthorized).send({
      statusCode: unauthorized,
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
