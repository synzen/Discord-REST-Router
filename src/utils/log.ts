import winston from 'winston'

const log = winston.createLogger({
  transports: [
    new winston.transports.Console(),
  ],
  format: winston.format.combine(
    winston.format.prettyPrint(),
    winston.format.simple()
  )
})

export default log
