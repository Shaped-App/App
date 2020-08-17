import { Injectable } from '@nestjs/common';
import * as Dtos from './app.dtos';

@Injectable()
export class TestService {
  getTest(): string {
    return 'Success!';
  }
}

@Injectable()
export class BrowseService {
  getBrowseQuestionList(body: Dtos.getQuestionListInDto): Dtos.getQuestionListOutDto {
    return {qids: [{qid: "hello", question: "question", userAnswered: true, created: "today"}]};
  }

  getBrowseQuestion(body: Dtos.getQuestionInDto): Dtos.getQuestionOutDto {
    return {questions: [{qid: "hello", question: "question", userAnswered: true, created: "today"}]};
  }

  getBrowseAnswerList(body: Dtos.getAnswerListInDto): Dtos.getAnswerListOutDto {
    return {aids: [{qid: "hello", aid: "goodbye", answer: "wowee", created: "today"}]};
  }

  getBrowseAnswer(body: Dtos.getAnswerInDto): Dtos.getAnswerOutDto {
    return {answers: [{qid: "hello", aid: "goodbye", answer: "wowee", created: "today"}]};
  }

  postBrowseAnswer(body: Dtos.postAnswerInDto): Dtos.postAnswerOutDto {
    return {answer: {qid: "hello", aid: "goodbye", answer: "wowee", created: "today"}};
  }

  postBrowseResponse(body: Dtos.postResponseInDto): Dtos.postResponseOutDto {
    return {qid: "hello", aid: "goodbye", time: "today", responsesLeft: 5};
  }

  getBrowseResponseLimit(body: Dtos.getResponseLimitInDto): Dtos.getResponseLimitOutDto {
    return {responsesLeft: 5};
  }
}

