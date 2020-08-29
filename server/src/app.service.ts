import { Injectable } from '@nestjs/common';
import * as Dtos from './app.dtos';
import { authGetUser, getAnswersOfQuestion, getAPIQuestionsFromIDs, makeAnswer } from './firebase/functions';


@Injectable()
export class TestService {
  getTest(): string {
    return 'Success!';
  }
}

@Injectable()
export class BrowseService {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getBrowseQIDsFromTime(time: Dtos.Time) : Promise<Array<Dtos.QID>> {
    // const qids = await QuestionCollection.orderBy("created").limit(10).get()
    return ["aGixGhyA1S5LZYyXXCcE", "7ahZDKrDfQEhDZO5Br9R"];
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async getAnswerIDsForQuestion(questionID: Dtos.QID, time: Dtos.Time) : Promise<Array<Dtos.QID>> {
    return ["9GW3CScIcvl9ZEuwCxEb"];
  }
  async getBrowseQuestionList(body: Dtos.getQuestionListInDto): Promise<Dtos.getQuestionListOutDto> {
    const qids = await this.getBrowseQIDsFromTime(body.time)
    return {
      qids: await getAPIQuestionsFromIDs(qids)
    }
  }

  async getBrowseQuestion(body: Dtos.getQuestionInDto): Promise<Dtos.getQuestionOutDto> {
    return {
      questions: await getAPIQuestionsFromIDs(body.qids)
    }
  }

  async getBrowseAnswerList(body: Dtos.getAnswerListInDto): Promise<Dtos.getAnswerListOutDto> {
    const aids = await this.getAnswerIDsForQuestion(body.qid, body.time);
    return {
      aids: await getAnswersOfQuestion(body.qid, aids)
    }
  }

  async getBrowseAnswer(body: Dtos.getAnswerInDto): Promise<Dtos.getAnswerOutDto> {
    const questionID: string = body.qid;
    const answerIDs: string[] = body.aids;
    const answerFirebase = await getAnswersOfQuestion(questionID, answerIDs);
    return {
      answers: answerFirebase
    };
  }

  async postBrowseAnswer(body: Dtos.postAnswerInDto): Promise<Dtos.postAnswerOutDto> {
    const userID: Dtos.UID = await authGetUser();
    const questionID: Dtos.QID = body.qid;
    const answerText: string = body.answer;

    //?  using client-submitted time or server made time?
    // const time: Dtos.Time = body.time;
    // const questionRef = QuestionCollection.doc(questionID);
    // const userRef = UserCollection.doc(userID);
    return {
      answer: await makeAnswer(userID, questionID, answerText)
    }
  }

  postBrowseResponse(body: Dtos.postResponseInDto): Dtos.postResponseOutDto {
    return { qid: "hello", aid: "goodbye", time: "today", responsesLeft: 5 };
  }

  getBrowseResponseLimit(body: Dtos.getResponseLimitInDto): Dtos.getResponseLimitOutDto {
    return { responsesLeft: 5 };
  }



}
