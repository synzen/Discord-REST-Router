import { Request, Response } from "express";
import Stats from '../services/Stats'

async function getStats (req: Request, res: Response) {
  res.json({
    averageResponseTime: Stats.getAverageResponseTime(),
    highestResponseTime: Stats.highestResponseTime,
    bucketRateLimitHits: Stats.bucketRateLimitHits,
    globalRateLimitHits: Stats.globalRateLimitHits
  })
}

export default getStats
