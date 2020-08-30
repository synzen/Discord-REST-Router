import express from 'express'
import requestController from '../controllers/request'
import validate from '../middleware/validate'
import requestBodySchema from '../schemas/requestBody'
import asyncRouteWrapper from '../utils/asyncRouteWrapper'
import getStats from '../controllers/getStats'

const apiRouter = express.Router()

apiRouter.post(`/request`, [
  validate(requestBodySchema, 'body')
], asyncRouteWrapper(requestController))

apiRouter.get('/stats', getStats)

export default apiRouter
