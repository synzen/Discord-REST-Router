import { Request, Response, NextFunction } from "express";
import Stats from "../services/stats";

const recordResponseTime = (req: Request, res: Response, next: NextFunction) => {
  // Only record response times of Discord API requests
  if (req.originalUrl !== '/api/request') {
    next()
    return
  }
  const start = new Date().getTime()
  res.once('finish', () => {
    const end = new Date().getTime()
    Stats.recordResponseTime(end - start)
  })
  next()
}

export default recordResponseTime
