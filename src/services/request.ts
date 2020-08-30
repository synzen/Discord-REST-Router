import { Response } from "node-fetch";
import { RESTHandler } from '@synzen/discord-rest'
import DiscordAPIError from "../utils/errors/DiscordAPIError";
import config from '../utils/config';

const tryParseFetchError = async (res: Response) => {
  try {
    const json = await res.json()
    return json
  } catch (err) {
    return {}
  }
}

const request = async (restHandler: RESTHandler, method: string, url: string, body: Record<string, unknown>) => {
  const res = await restHandler.fetch(url, {
    method,
    headers: {
      Authorization: `Bot ${config.token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  })
  if (!res.ok) {
    const discordResponse = await tryParseFetchError(res)
    throw new DiscordAPIError(`Bad status code (${res.status}) from Discord`, 400, {
      status: res.status,
      body: discordResponse
    })
  }
}


export default request
