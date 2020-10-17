import { Body, Controller, Get, Post } from '@nestjs/common';
import ApiFactory from './api/import';
import * as Dtos from './app.dtos';
import { BrowseService, TestService } from './app.service';

function getApi(description: string) {
  return ApiFactory.getInstance().getApi('v1.0', description);
}

@Controller()
export class AppController {
  constructor(private readonly testService: TestService,
    private readonly browseService: BrowseService) { }

  @Post('/test/tokenTest')
  postTokenTest(@Body() body: Dtos.getTokenInDto): Promise<Dtos.getTokenOutDto> {
    console.log("body is");
    console.log(body);
    console.log("body end");
    return this.testService.getTokenTest(body.token);
  }

  @Get(ApiFactory.getInstance().getApi('test', '/test1/test2/get'))
  getTest(): string {
    return this.testService.getTest();
  }

  @Get(getApi('/browse/question-list/get'))
  async getBrowseQuestionList(@Body() body: Dtos.getQuestionListInDto): Promise<Dtos.getQuestionListOutDto> {
    return this.browseService.getBrowseQuestionList(body);
  }

  @Get(getApi('/browse/question/get'))
  async getBrowseQuestion(@Body() body: Dtos.getQuestionInDto): Promise<Dtos.getQuestionOutDto> {
    console.log("question input", body);
    return this.browseService.getBrowseQuestion(body);
  }

  // @Post("/makeQuestion")
  // makeQuestion(@Body() myDto: MyDto): Promise<object> {
  //   console.log(myDto)

  //   return this.browseService.makeQuestion(myDto.questionText);
  // }

  @Get(getApi('/browse/answer-list/get'))
  getBrowseAnswerList(@Body() body: Dtos.getAnswerListInDto): Promise<Dtos.getAnswerListOutDto> {
    return this.browseService.getBrowseAnswerList(body);
    // return this.browseService.getBrowseAnswer(getAnswerDTO.qid, getAnswerDTO.aids);
  }

  @Get(getApi('/browse/answer/get'))
  getBrowseAnswer(@Body() body: Dtos.getAnswerInDto): Promise<Dtos.getAnswerOutDto> {
    return this.browseService.getBrowseAnswer(body);
    // return this.browseService.getBrowseAnswer(getAnswerDTO.qid, getAnswerDTO.aids);
  }

  @Post(getApi('/browse/answer/post'))
  postBrowseAnswer(@Body() body: Dtos.postAnswerInDto): Promise<Dtos.postAnswerOutDto> {
    return this.browseService.postBrowseAnswer(body);
    // return this.browseService.postBrowseAnswer(userID, body.qid, body.answer, body.time);
  }

  @Post(getApi('/browse/response/post'))
  async postBrowseResponse(@Body() body: Dtos.postResponseInDto): Promise<Dtos.postResponseOutDto> {
    return this.browseService.postBrowseResponse(body);
  }

  @Get(getApi('/browse/response-limit/get'))
  async getBrowseResponseLimit(@Body() body: Dtos.getResponseLimitInDto): Promise<Dtos.getResponseLimitOutDto> {
    return this.browseService.getBrowseResponseLimit(body);
  }
}
