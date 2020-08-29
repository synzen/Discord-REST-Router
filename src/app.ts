import express from 'express'
import { RESTHandler, APIRequest } from '@synzen/discord-rest'
import checkToken from './middleware/checkToken'
import log from './utils/log'
import apiRouter from './api'
import errorHandler from './middleware/errorHandler'
import expressLogger from './middleware/expressLogger'
import expressErrorLogger from './middleware/expressErrorLogger'
import { port } from './utils/config'

const restHandler = new RESTHandler()

restHandler.on('rateLimit', (apiRequest: APIRequest) => {
  log.error(`Rate limit hit for ${apiRequest.toString()}`)
})

restHandler.on('globalRateLimit', (durationMs) => {
  log.error(`Global rate limit hit for ${durationMs}`)
})

const app = express()

app.use(express.json())

// Log routes
app.use(expressLogger)

// Set application variables
app.set('restHandler', restHandler)

// Middleware to authenticate all requests
app.use(checkToken)

// Routes
app.get('/ping', (req, res) => res.status(204).end())
app.use(`/api`, apiRouter)

// Error logging
app.use(expressErrorLogger)

// Custom error handler
app.use(errorHandler)

const usePort = port || 3000
app.listen(usePort, () => {
  console.log(`Example app listening at http://localhost:${usePort}`)
})
