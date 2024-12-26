import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { ValidationPipe } from './pipes/validation.pipe';

dotenv.config();
const start = async () => {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type,Authorization',
  });

  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT, () =>
    console.log(`Server started on port ${process.env.PORT}`),
  );
};

start();