import { createLogger, format, transports } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';

const {
  combine, timestamp, printf,
} = format;

const myFormat = printf((info) => {
  const { timestamp, message, level } = info;
  const args = info[Symbol.for('splat') as any];
  return `${timestamp} ${level}: Event ${message.trim()} received with parameters of: \n ${JSON.stringify(args[0], null, 4)}`;
});

const myFormatSent = printf((info) => {
  const { timestamp, message, level } = info;
  const args = info[Symbol.for('splat') as any];
  return `${timestamp} ${level}: Event ${message.trim()} sent with parameters of: \n ${JSON.stringify(args[0], null, 4)}`;
});

const infoFormat = printf((info) => {
  const { timestamp, message, level } = info;
  const args = info[Symbol.for('splat') as any];
  return `${timestamp} ${level}: ${message.trim()} \n ${args?.length > 0 ? JSON.stringify(args[0], null, 4) : ''}`;
});

const dailyRotateTransport: DailyRotateFile = new DailyRotateFile({
  filename: 'application-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
  dirname: './logs',
});

const loggers = {
  info:
    createLogger({
      level: 'info',
      transports: [new transports.Console({
        format: format.combine(
          format.colorize(),
          timestamp({ format: 'HH:mm:ss' }),
          infoFormat,
        ),
      }),
        dailyRotateTransport,
      ],
    }),
  warn:
    createLogger({
      level: 'warn',
      transports: [new transports.Console({
        format: format.combine(
          format.colorize(),
          timestamp({ format: 'HH:mm:ss' }),
          infoFormat,
        ),
      }),
        dailyRotateTransport,
      ],
    }),
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
      }),
        dailyRotateTransport,
      ],
    }),
    sent: createLogger({
      level: 'verbose',
      format: combine(
        format.splat(),
        timestamp({ format: 'HH:mm:ss' }),
        myFormatSent,
      ),
      transports: [new transports.Console({
        format: format.combine(
          format.colorize({ all: true }),
          timestamp({ format: 'HH:mm:ss' }),
          myFormatSent,
        ),
      }),
        dailyRotateTransport,
      ],
    }),
  },

};

export { loggers };
