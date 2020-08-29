import { Request, Response, NextFunction } from "express";
import expressWinston from 'express-winston'
import isProductionEnv from "../utils/isProductionEnv";
import log from "../utils/log";
import APIError from "../utils/errors/APIError";
import requestIp from 'request-ip'

const expressErrorLogger = (err: Error, req: Request, res: Response, next: NextFunction) => {
  if (isProductionEnv) {
    expressWinston.errorLogger({
      winstonInstance: log
    })(err, req, res, next)
  } else {
    res.once('finish', () => {
      const ip = requestIp.getClientIp(req)
      if (err instanceof APIError) {
        log.error(`${ip} ${res.statusCode} ${req.originalUrl}: ${err.name} (${err.message} - ${err.errors && err.errors.join(',')})`)
      } else {
        log.error(`${ip} ${res.statusCode} ${req.originalUrl}: ${err.name} (${err.message})`)
      }
    })
    next(err)
  }
}

export default expressErrorLogger
