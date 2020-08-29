import express from 'express'
import { RESTHandler, APIRequest } from '@synzen/discord-rest'
import checkToken from './middleware/checkToken'
import log from './utils/log'
import apiRouter from './api'
import errorHandler from './middleware/errorHandler'
import expressLogger from './middleware/expressLogger'
import expressErrorLogger from './middleware/expressErrorLogger'

const restHandler = new RESTHandler()

restHandler.on('rateLimit', (apiRequest: APIRequest) => {
  log.error(`Rate limit hit for ${apiRequest.toString()}`)
})

restHandler.on('globalRateLimit', () => {
  log.error(`Global rate limit hit`)
})

const app = express()
const port = 3000

app.use(express.json())

// Log routes
app.use(expressLogger)

// Set application variables
app.set('restHandler', restHandler)

// Middleware to authenticate API requests
app.use(checkToken)

// Routes
app.get('/ping', (req, res) => res.status(204).end())
app.use(`/api`, apiRouter)

// Error logging
app.use(expressErrorLogger)

// Custom error handler
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
