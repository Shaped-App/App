import { Controller, Get } from '@nestjs/common';
import { TestService, AppService } from './app.service';
import ApiFactory from './api/import';


function getApi(description: string) {
  return ApiFactory.getInstance().getApi("v1.0", description);
}
@Controller()
export class AppController {
  constructor(private readonly testService: TestService, 
    private readonly appService: AppService) {}

  @Get(ApiFactory.getInstance().getApi("test", "/test1/test2/get"))
  getTest(): string {
    return this.testService.getTest();
  }

  @Get(getApi("/browse/question-list/get"))
  getBrowseQuestionList(): string {
    return this.appService.getBrowseQuestionList();
  }

  @Get(getApi("/browse/question-list/get"))
  getBrowseQuestion(): string {
    return this.appService.getBrowseQuestion();
  }
}
