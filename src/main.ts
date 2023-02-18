import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  const PORT = 3000;
  app.use(session({
    secret: process.env.SESSION_SECRET,
  }))
  await app.listen(PORT, () => {
    console.log(`Server is listenning in port ${PORT}`);
  });
}

bootstrap();
