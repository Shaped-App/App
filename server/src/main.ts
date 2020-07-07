import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import ApiFactory from './api/import';

function init() {
  ApiFactory.getInstance();
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
init();
bootstrap();
