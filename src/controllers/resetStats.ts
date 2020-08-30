import { Request, Response } from "express";
import Stats from '../services/Stats'

async function resetStats (req: Request, res: Response) {
  res.json(Stats.toJSON())
}

export default resetStats
