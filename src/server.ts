import mongoose from 'mongoose';
import app from './app';
import config from './config';
import { errorLogger, successLogger } from './shared/logger';
import { Server } from 'http';
import { RedisClint } from './shared/redis';
import subscribeToEvents from './app/events';

process.on('uncaughtException', error => {
  errorLogger.error(error);
  process.exit(1);
});

let server: Server;
async function main() {
  try {
    await RedisClint.connect().then(() => {
      subscribeToEvents();
    });
    await mongoose.connect(config.database_url as string);
    successLogger.info('Database is connected Successfully');

    server = app.listen(config.prot, () => {
      successLogger.info(`Application is listening on port ${config.prot}`);
    });
  } catch (error) {
    errorLogger.error('Failed to connect database', error);
  }

  process.on('unhandledRejection', err => {
    if (server) {
      server.close(() => {
        errorLogger.error(err);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

main();

process.on('SIGTERM', () => {
  successLogger.info('Sigterm is received');
  if (server) {
    server.close();
  }
});
