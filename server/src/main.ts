import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ApiFactory from './api/import';
import db from './firebase/model';

function init() {
  ApiFactory.getInstance(); // Load APIs from JSON
  db; // Load Firebase connection
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
init();
bootstrap();
