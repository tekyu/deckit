import winston from 'winston';
import config from '../../config';

const transports1 = [];
if (process.env.NODE_ENV !== 'development') {
  transports1.push(new winston.transports.Console());
} else {
  transports1.push(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.cli(),
        winston.format.splat(),
      ),
    }),
  );
}

// custom levels?

const LoggerInstance = winston.createLogger({
  level: config.logs.level,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.json(),
  ),
  transports: transports1,
});

export default LoggerInstance;

// 2.0

const {
  format: {
    combine, timestamp, printf, splat, label,
  },
  transports,
} = winston;

const myFormat = printf(({
  level, message, label, timestamp,
}) => `${timestamp} [${label}] ${level}: ${message}`);

export const loggers = {
  vjson: winston.createLogger({
    format: combine(
      label({ label: 'right meow!' }),
      timestamp(),
      myFormat,
    ),
    transports: [new transports.Console()],
  }),
};
