import { Request, Response, NextFunction } from "express"
import APIError from "../utils/errors/APIError"
import DiscordAPIError from "../utils/errors/DiscordAPIError"
import Stats from "../services/Stats"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof APIError) {
    res.status(error.code).json({
      message: error.message,
      errors: error.errors || []
    })
  } else if (error instanceof DiscordAPIError) {
    res.status(400).json({
      message: error.message,
      discord: true,
      discordResponse: error.response
    })
  } else {
    if (error.message === 'The user aborted a request.') {
      Stats.addAbortedRequest()
    }
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default errorHandler
