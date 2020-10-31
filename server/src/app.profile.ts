import { Injectable } from '@nestjs/common';
import * as Dtos from './app.dtos';
import { authGetUser, getAnswersOfQuestion, getAPIQuestionsFromIDs, getUIDFromTokenTest, makeAnswer, postResponseToAnswer } from './firebase/functions';

@Injectable()
export class ProfileService {

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