import { Request, Response, NextFunction } from 'express';
import * as z from 'zod'
import APIError from '../utils/errors/APIError';

function validate(zodSchema: z.ZodObject<any>, part: 'body'|'params'|'query') {
  async function controller(req: Request, res: Response, next: NextFunction) {
    const content = req[part];
    try {
      zodSchema.parse(content)
      next();
    } catch (err) {
      const error: z.ZodError = err;
      const strings = error.errors.map((detail) => {
        if (detail.message === 'Required') {
          return `${detail.path.join('.')} is required`
        } else {
          return `${detail.message} in ${detail.path.join('.')}`
        }
      });
      next(new APIError('Validation error', 400, strings));
    }
  }
  return controller;
}

export default validate;
