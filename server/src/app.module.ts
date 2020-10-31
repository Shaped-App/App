import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ProfileService } from './app.profile';
import { TestService, BrowseService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [TestService, BrowseService, ProfileService],
})
export class AppModule {}
