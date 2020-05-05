const winston = require('winston')
require('winston-daily-rotate-file')
require('date-utils')

const DailyRotateFile = new winston.transports.DailyRotateFile({
  level: 'silly',
  filename: 'logs/%DATE%.log',
  zippedArchive: true,
  format: winston.format.printf(
    (info) =>
      `[${new Date().getTime()}] [${info.level.toUpperCase()}] ${info.message}`
  ),
})

const Console = new winston.transports.Console()

const transports = [DailyRotateFile, Console]

const colorizer = winston.format.colorize()

const logLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    verbose: 4,
    debug: 5,
    silly: 6,
  },
  colors: {
    error: 'red',
    warn: 'yellow',
    info: 'blue',
    http: 'green',
    verbose: 'gray',
    debug: 'cyan',
    silly: 'yellow',
  },
}
winston.addColors(logLevels)
const logger = winston.createLogger({
  level: 'silly',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.simple(),
    winston.format.printf((info) =>
      colorizer.colorize(
        info.level,
        `[${new Date().toFormat('HH24:MI:SS')}] [${info.level.toUpperCase()}] ${
          info.message
        }`
      )
    )
  ),
  transports: transports,
})
module.exports = logger
