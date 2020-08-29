import { Request, Response, NextFunction } from "express";
import config from '../utils/config'

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization')
  const parts = authorization?.split(' ')
  if (!parts || parts[0] !== 'Bot') {
    res.status(401).json({
      message: 'Unknown authorization type'
    })
    return
  }
  if (parts[1] !== config.token) {
    res.status(401).json({
      message: 'Bad token'
    })
    return
  }
  next()
}

export default checkToken
