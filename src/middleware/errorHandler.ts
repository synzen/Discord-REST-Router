import { Request, Response, NextFunction } from "express"
import APIError from "../utils/errors/APIError"
import DiscordAPIError from "../utils/errors/DiscordAPIError"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof APIError) {
    res.status(error.code).json({
      message: error.message,
      errors: error.errors || []
    })
  } else if (error instanceof DiscordAPIError) {
    // log.error(error.message)
    res.status(400).json({
      message: error.message,
      discord: true,
      discordResponse: error.response
    })
  } else {
    // log.error(error.message)
    res.status(500).json({
      message: 'Internal server error'
    })
  }
}

export default errorHandler
