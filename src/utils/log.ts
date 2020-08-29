import winston from 'winston'
import isProductionEnv from './isProductionEnv'

const productionLog = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'combined.log',
      level: 'info'
    }),
    new winston.transports.File({
      filename: 'error.log',
      level: 'error'
    }),
    new winston.transports.Console({
      level: 'info',
      format: winston.format.combine(
        winston.format.simple(),
        winston.format.timestamp()
      )
    })
  ]
})

const devLog = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.timestamp()
  )
})

const log = isProductionEnv ? productionLog : devLog

export default log
