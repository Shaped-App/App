import { Injectable } from '@nestjs/common';
import * as Dtos from './app.dtos';
import { getAnswersOfQuestion, getAPIQuestionsFromIDs, getUIDFromToken, getUIDFromTokenTest, makeAnswer, postResponseToAnswer } from './firebase/functions';
import { getTokenFromUIDTest } from './firebase/test_functions';


@Injectable()
export class TestService {
  async postTokenTest(token: Dtos.UIDToken) : Promise<Dtos.postTokenOutDto> {
    return {
      time: "timetype",
      uid: await getUIDFromTokenTest(token)
    };
  }
  async getTokenTest(uid: Dtos.UID) : Promise<Dtos.getTokenOutDto> {
    return {
      time: "timeType",
      token: await getTokenFromUIDTest(uid),
      uid: uid
    }
  }

  getTest(): string {
    return 'Success!';
  }
}

@Injectable()
export class BrowseService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getBrowseQIDsFromTime(time: Dtos.APITime): Promise<Array<Dtos.QID>> {
    // const qids = await QuestionCollection.orderBy("created").limit(10).get()
    return ["aGixGhyA1S5LZYyXXCcE", "7ahZDKrDfQEhDZO5Br9R"];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAnswerIDsForQuestion(questionID: Dtos.QID, time: Dtos.APITime): Promise<Array<Dtos.QID>> {
    return ["9GW3CScIcvl9ZEuwCxEb"];
  }

  // @Get(getApi('/browse/question-list/get'))
  async getBrowseQuestionList(body: Dtos.getQuestionListInDto): Promise<Dtos.getQuestionListOutDto> {
    const qids = await this.getBrowseQIDsFromTime(body.time)
    return {
      time: "timeType",
      qids: await getAPIQuestionsFromIDs(body.token, qids)
    }
  }

  // @Get(getApi('/browse/question/get'))
  async getBrowseQuestion(body: Dtos.getQuestionInDto): Promise<Dtos.getQuestionOutDto> {
    return {
      time: "timeType",
      questions: await getAPIQuestionsFromIDs(body.token, body.qids)
    }
  }

  // @Get(getApi('/browse/answer-list/get'))
  async getBrowseAnswerList(body: Dtos.getAnswerListInDto): Promise<Dtos.getAnswerListOutDto> {
    const aids = await this.getAnswerIDsForQuestion(body.qid, body.time);
    return {
      time: "timeType",
      aids: await getAnswersOfQuestion(body.qid, aids)
    }
  }

  // @Get(getApi('/browse/answer/get'))
  async getBrowseAnswer(body: Dtos.getAnswerInDto): Promise<Dtos.getAnswerOutDto> {
    const questionID: string = body.qid;
    const answerIDs: string[] = body.aids;
    const answerFirebase = await getAnswersOfQuestion(questionID, answerIDs);
    return {
      time: "timeType",
      answers: answerFirebase
    };
  }

  // @Post(getApi('/browse/answer/post'))
  async postBrowseAnswer(body: Dtos.postAnswerInDto): Promise<Dtos.postAnswerOutDto> {
    const userID: Dtos.UID = await getUIDFromToken(body.token);
    const questionID: Dtos.QID = body.qid;
    const answerText: string = body.answer;

    //?  using client-submitted time or server made time?
    // const time: Dtos.APITime = body.time;
    return {
      time: "timeType",
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
    return {
      time: "timeType",
      responsesLeft: 5
    };
  }

}
