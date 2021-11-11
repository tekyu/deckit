import { createLogger, format, transports } from 'winston';

const {
  combine, timestamp, printf,
} = format;

const myFormat = printf((info) => {
  const { timestamp, message, level } = info;
  const args = info[Symbol.for('splat') as any];
  return `${timestamp} ${level}: Event ${message.trim()} received with parameters of: \n ${JSON.stringify(args[0], null, 4)}`;
});

const loggers = {
  event: {
    received: createLogger({
      level: 'verbose',
      format: combine(
        format.splat(),
        timestamp({ format: 'HH:mm:ss' }),
        myFormat,
      ),
      transports: [new transports.Console({
        format: format.combine(
          format.colorize({ all: true }),
          timestamp({ format: 'HH:mm:ss' }),
          myFormat,
        ),
      })],
    }),
  },
};

export { loggers };
