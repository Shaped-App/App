import { Body, Controller, Get, Post } from '@nestjs/common';
import ApiFactory from './api/import';
import { BrowseService, TestService } from './app.service';
import * as Dtos from './app.dtos';
import { QuestionCollection } from './firebase/model'

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

  async getBrowseQuestionList(@Body() body : Dtos.getQuestionListInDto): Promise<Dtos.getQuestionListOutDto> {
    console.log("question list input", body);
    return this.browseService.getBrowseQuestionList(body);
  }

  @Get(getApi('/browse/question/get'))
  async getBrowseQuestion(@Body() body: Dtos.getQuestionInDto): Promise<Dtos.getQuestionOutDto> {
    // console.log(request)
    console.log("question input", body)
    
    
    // console.log("qids", questionIDs);
    // const docList : Array<Question> = [];
    const docList = {};
    const doc = await QuestionCollection.orderBy("created when").limit(10).get()
    doc.forEach(function (snapshot) {
        // const ques: Question = doc.data();
        // doc.exists ? docList.push(ques) : null;
        // doc.exists ? docList.push(new Question(doc.data())) : null;
        snapshot.exists ? docList[snapshot.id] = snapshot.data() : null;
    })
    return docList;
    // return QuestionCollection.orderBy("created when").limit(10).get();
    // return this.browseService.getBrowseQuestion(params.qids[0]);
    // return this.browseService.getBrowseQuestion(request.questionID);
  }

  @Post("/makeQuestion")
  makeQuestion(@Body() myDto: MyDto): Promise<object> {
    // console.log(request)
    console.log(myDto)
    
    return this.browseService.makeQuestion(myDto.questionText);
    // return this.browseService.makeQuestion(myDto.userRef, myDto.questionText);
    // return this.browseService.getBrowseQuestion(request.questionID);
  }

  @Get(getApi('/browse/answer/get'))
  getBrowseAnswer(@Body() getAnswerDTO: getAnswerInDto): Promise<object> {
    return this.browseService.getBrowseAnswer(getAnswerDTO.qid, getAnswerDTO.aids);
  }

  @Post(getApi('/browse/answer/post'))
  postBrowseAnswer(@Body() postAnswerDTO: postAnswerInDto): Promise<object> {
    const userID = "FDr6IxDIO3GDkZMJ8hPy"
    return this.browseService.postBrowseAnswer(userID, postAnswerDTO.qid, postAnswerDTO.answer, postAnswerDTO.time);
  }
}
