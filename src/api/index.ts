import express from 'express'
import requestController from '../controllers/request'
import validate from '../middleware/validate'
import requestBodySchema from '../schemas/requestBody'
import asyncRouteWrapper from '../utils/asyncRouteWrapper'

const apiRouter = express.Router()

apiRouter.post(`/request`, [
  validate(requestBodySchema, 'body')
], asyncRouteWrapper(requestController))

export default apiRouter
