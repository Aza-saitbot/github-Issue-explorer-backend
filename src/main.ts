import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import * as dotenv from 'dotenv';

dotenv.config();
const start = async () => {
  const app = await NestFactory.create(AppModule);
  app.use(LoggerMiddleware);
  await app.listen(process.env.PORT, '0.0.0.0', () =>
    console.log(`Server started on port ${process.env.PORT}`),
  );
}

start()