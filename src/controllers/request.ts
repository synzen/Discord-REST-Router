import { Request, Response } from "express";
import { RESTHandler } from '@synzen/discord-rest'
import request from "../services/request";
import * as z from 'zod'
import requestBodySchema from "../schemas/requestBody";

async function requestController (req: Request, res: Response) {
  const restHandler = req.app.get('restHandler') as RESTHandler
  const { url, method, body } = req.body as z.infer<typeof requestBodySchema>
  await request(restHandler, method, url, body)
  res.status(204).end()
}

export default requestController
