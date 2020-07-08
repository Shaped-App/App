import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TestService, AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TestService, AppService],
})
export class AppModule {}
