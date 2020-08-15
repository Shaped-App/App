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

  @Get(ApiFactory.getInstance().getApi('test', '/test1/test2/get'))
  getTest(): string {
    return this.testService.getTest();
  }

  @Get(getApi('/browse/question-list/get'))
  async getBrowseQuestionList(@Body() body: Dtos.getQuestionListInDto): Promise<Dtos.getQuestionListOutDto> {
    console.log("question list input", body);
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

  @Post(getApi('/browse/response/post'))
  postBrowseResponse(@Body() body: Dtos.postResponseInDto): Promise<Dtos.postResponseOutDto> {
    return processRequest(this.browseService.postBrowseResponse, body);
  }

  @Get(getApi('/browse/response-limit/get'))
  getBrowseResponseLimit(@Body() body: Dtos.postResponseInDto): Promise<Dtos.postResponseOutDto> {
    return processRequest(this.browseService.getBrowseResponseLimit, body);
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
}
