import { Request, Response, NextFunction } from "express";
import expressWinston from 'express-winston'
import isProductionEnv from "../utils/isProductionEnv";
import log from "../utils/log";
import requestIp from 'request-ip'

const expressLogger = (req: Request, res: Response, next: NextFunction) => {
  if (!isProductionEnv) {
    expressWinston.logger({
      winstonInstance: log,
      // Authorization header contains the bot token
      headerBlacklist: ['authorization'],
      expressFormat: true,
    })(req, res, next)
  } else {
    res.once('finish', () => {
      const ip = requestIp.getClientIp(req)
      log.info(`${ip} ${res.statusCode} ${req.originalUrl} | body: ${JSON.stringify(req.body, null, 2)}`)
    })
    next()
  }
}

export default expressLogger
