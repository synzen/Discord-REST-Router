import fs from 'fs'
import path from 'path'
const configPath = path.join(__dirname, '..', '..', 'config.json')
const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'))

export const { token, port } = config

if (!token) {
  throw new Error('No token found')
}

export default config
