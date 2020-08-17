import { Controller, Get, Post, Body } from '@nestjs/common';
import { TestService, BrowseService } from './app.service';
import ApiFactory from './api/import';


function getApi(description: string) {
  return ApiFactory.getInstance().getApi('v1.0', description);
}

function processRequest(func: Function, body): string {
  return JSON.stringify(func(body));
}
@Controller()
export class AppController {
  constructor(private readonly testService: TestService, 
    private readonly browseService: BrowseService) {}

  @Get(ApiFactory.getInstance().getApi('test', '/test1/test2/get'))
  getTest(): string {
    return this.testService.getTest();
  }

  @Get(getApi('/browse/question-list/get'))
  getBrowseQuestionList(@Body() body): string {
    return processRequest(this.browseService.getBrowseQuestionList, body);
  }

  @Get(getApi('/browse/question/get'))
  getBrowseQuestion(@Body() body): string {
    return processRequest(this.browseService.getBrowseQuestion, body);
  }

  @Get(getApi('/browse/answer-list/get'))
  getBrowseAnswerList(@Body() body): string {
    return processRequest(this.browseService.getBrowseAnswerList, body);
  }

  @Get(getApi('/browse/answer/get'))
  getBrowseAnswer(@Body() body): string {
    return processRequest(this.browseService.getBrowseAnswer, body);
  }

  @Post(getApi('/browse/answer/post'))
  postBrowseAnswer(@Body() body): string {
    return processRequest(this.browseService.postBrowseAnswer, body);
  }

  @Post(getApi('/browse/response/post'))
  postBrowseResponse(@Body() body): string {
    return processRequest(this.browseService.postBrowseResponse, body);
  }

  @Get(getApi('/browse/response-limit/get'))
  getBrowseResponseLimit(@Body() body): string {
    return processRequest(this.browseService.getBrowseResponseLimit, body);
  }
}
