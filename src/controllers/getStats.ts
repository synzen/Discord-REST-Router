import { Request, Response } from "express";
import Stats from "../services/stats";

async function getStats (req: Request, res: Response) {
  res.json({
    averageResponseTime: Stats.averageResponseTime,
    highestResponseTime: Stats.highestResponseTime,
    bucketRateLimitHits: Stats.bucketRateLimitHits,
    globalRateLimitHits: Stats.globalRateLimitHits
  })
}

export default getStats
