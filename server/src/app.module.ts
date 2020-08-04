import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TestService, BrowseService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TestService, BrowseService],
})
export class AppModule {}
