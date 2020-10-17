import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { TestService, BrowseService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [TestService, BrowseService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Success!"', () => {
      expect(appController.getTest()).toBe('Success!');
    });
  });
});
