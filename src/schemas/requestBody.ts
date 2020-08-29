import * as z from 'zod'

const requestBodySchema = z.object({
  method: z.string(),
  url: z.string(),
  body: z.any()
})

export default requestBodySchema
