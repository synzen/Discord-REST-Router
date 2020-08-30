import express from 'express'
import { RESTHandler, APIRequest } from '@synzen/discord-rest'
import checkToken from './middleware/checkToken'
import log from './utils/log'
import apiRouter from './api'
import errorHandler from './middleware/errorHandler'
import expressLogger from './middleware/expressLogger'
import expressErrorLogger from './middleware/expressErrorLogger'
import { port } from './utils/config'
import recordResponseTime from './middleware/recordResponseTime'
import Stats from './services/Stats'

const restHandler = new RESTHandler()

restHandler.on('rateLimit', (apiRequest: APIRequest) => {
  log.error(`Rate limit hit for ${apiRequest.toString()}`)
  Stats.addBucketRateLimitHit()
})

restHandler.on('globalRateLimit', (apiRequest, durationMs) => {
  log.error(`Global rate limit hit for ${apiRequest.toString()} (retry after ${durationMs}s)`)
  Stats.addGlobalRateLimitHit()
})

const app = express()

// Used to measure average response times
app.use(recordResponseTime)

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
  log.info(`Discord REST Router listening at http://localhost:${usePort}`)
})
