import { Response } from "node-fetch";
import { RESTHandler } from '@synzen/discord-rest'
import DiscordAPIError from "../utils/errors/DiscordAPIError";
import token from '../utils/token';

const tryParseFetchError = async (res: Response) => {
  try {
    const json = await res.json()
    console.log('json here', json)
    return json.message
  } catch (err) {
    return null
  }
}

const request = async (restHandler: RESTHandler, method: string, url: string, body: Object) => {
  const res = await restHandler.fetch(url, {
    method,
    headers: {
      Authorization: `Bot ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (!res.ok) {
    const message = await tryParseFetchError(res)
    throw new DiscordAPIError(message || `Bad status code (${res.status}) from Discord`, res.status)
  }
}


export default request
