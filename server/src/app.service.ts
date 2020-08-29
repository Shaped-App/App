import { Injectable } from '@nestjs/common';
import * as Dtos from './app.dtos';
import { authGetUser, getAnswersOfQuestion, getAPIQuestionsFromIDs, makeAnswer, postResponseToAnswer } from './firebase/functions';
import admin from 'firebase-admin';


@Injectable()
export class TestService {
  getTest(): string {
    return 'Success!';
  }
}

@Injectable()
export class BrowseService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getBrowseQIDsFromTime(time: Dtos.Time): Promise<Array<Dtos.QID>> {
    // const qids = await QuestionCollection.orderBy("created").limit(10).get()
    return ["aGixGhyA1S5LZYyXXCcE", "7ahZDKrDfQEhDZO5Br9R"];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAnswerIDsForQuestion(questionID: Dtos.QID, time: Dtos.Time): Promise<Array<Dtos.QID>> {
    return ["9GW3CScIcvl9ZEuwCxEb"];
  }

  // @Get(getApi('/browse/question-list/get'))
  async getBrowseQuestionList(body: Dtos.getQuestionListInDto): Promise<Dtos.getQuestionListOutDto> {
    const qids = await this.getBrowseQIDsFromTime(body.time)
    return {
      qids: await getAPIQuestionsFromIDs(qids)
    }
  }

  // @Get(getApi('/browse/question/get'))
  async getBrowseQuestion(body: Dtos.getQuestionInDto): Promise<Dtos.getQuestionOutDto> {
    return {
      questions: await getAPIQuestionsFromIDs(body.qids)
    }
  }

  // @Get(getApi('/browse/answer-list/get'))
  async getBrowseAnswerList(body: Dtos.getAnswerListInDto): Promise<Dtos.getAnswerListOutDto> {
    const aids = await this.getAnswerIDsForQuestion(body.qid, body.time);
    return {
      aids: await getAnswersOfQuestion(body.qid, aids)
    }
  }

  // @Get(getApi('/browse/answer/get'))
  async getBrowseAnswer(body: Dtos.getAnswerInDto): Promise<Dtos.getAnswerOutDto> {
    const questionID: string = body.qid;
    const answerIDs: string[] = body.aids;
    const answerFirebase = await getAnswersOfQuestion(questionID, answerIDs);
    return {
      answers: answerFirebase
    };
  }

  // @Post(getApi('/browse/answer/post'))
  async postBrowseAnswer(body: Dtos.postAnswerInDto): Promise<Dtos.postAnswerOutDto> {
    const userID: Dtos.UID = await authGetUser();
    const questionID: Dtos.QID = body.qid;
    const answerText: string = body.answer;

    //?  using client-submitted time or server made time?
    // const time: Dtos.Time = body.time;
    return {
      answer: await makeAnswer(userID, questionID, answerText)
    }
  }

  // @Post(getApi('/browse/response/post'))
  async postBrowseResponse(body: Dtos.postResponseInDto): Promise<Dtos.postResponseOutDto> {
    const aid = body.aid;
    const qid = body.qid;
    return await postResponseToAnswer(qid, aid);
  }

  // @Get(getApi('/browse/response-limit/get'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getBrowseResponseLimit(body: Dtos.getResponseLimitInDto): Dtos.getResponseLimitOutDto {
    return { responsesLeft: 5 };
  }

}
