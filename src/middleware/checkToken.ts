import { Request, Response, NextFunction } from "express";
import token from '../utils/token'

const checkToken = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization')
  if (!authorization) {}
  const parts = authorization?.split(' ')
  if (!parts || parts[0] !== 'Bot') {
    res.status(401).json({
      message: 'Unknown authorization type'
    })
    return
  }
  if (parts[1] !== token) {
    res.status(401).json({
      message: 'Bad token'
    })
    return
  }
  next()
}

export default checkToken
