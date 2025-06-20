import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
import { join } from 'path';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.enableCors(
    {
      origin: 'http://localhost:3001',
    },
  );
  await app.listen(process.env.PORT ?? 3000);
  console.log(`http://localhost:${process.env.PORT ?? 3000}`);
}
bootstrap();
