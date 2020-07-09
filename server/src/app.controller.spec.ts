import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { TestService, AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [TestService, AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Success!"', () => {
      expect(appController.getTest()).toBe('Success!');
    });
  });
});
