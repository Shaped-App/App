import admin from 'firebase-admin';
import * as Dtos from './app.dtos';
import { Body, Injectable } from '@nestjs/common';
import { getRecentAnswers, getUserInfoFromUID, makeUser, setUserInfo } from './firebase/functions';


@Injectable()
export class ProfileService {

  // Profile services

  // @Get(getApi("/profile/info/get"))
  async getProfileInfo(@Body() body: Dtos.getProfileInfoInDto): Promise<Dtos.getProfileInfoOutDto> {
    const user = await getUserInfoFromUID(body.uid);
    console.log(user);
    return {
      time: this.getTime(),
      info: user
    };
  }

  // @Post(getApi("/profile/info/post"))
  async postProfileInfo(@Body() body: Dtos.postProfileInfoInDto): Promise<Dtos.postProfileInfoOutDto> {
    const user = await setUserInfo(body.token, body.updating_info);
    return {
      time: this.getTime(),
    }
  }

  async createUser(token: Dtos.UIDToken, info: Dtos.APIUserInfo): Promise<Dtos.APIUser> {
    const user: Dtos.APIUser = await makeUser(token, info);
    return user;
  }

  // @Post(getApi("/profile/create/post"))
  async postProfileCreate(@Body() body: Dtos.postCreateProfileInDto): Promise<Dtos.postCreateProfileInfoOutDto> {
    //TODO: stop if uid already exists
    const user: Dtos.APIUser = await this.createUser(body.token, body.new_user_info);
    return {
      time: this.getTime(),
      new_uid: user.uid
    };
  }

  getAnswers(answers: Array<Dtos.APIAnswer>): Dtos.getProfileRecentAnswersOutDto {
    console.log("answers: ", answers);
    const answerMap = {};
    answers.forEach( answer => {
      answerMap[answer.aid] = answer;
    });
    return {
      time: this.getTime(),
      answers: answerMap
    };
    // return {
    //   time: this.getTime(),
    //   answers: {
    //     "aid":
    //     {
    //       qid: "qid",
    //       aid: "aid",
    //       answer: "answer text",
    //       created: "time",
    //       creator: "creator"
    //     }
    //   }
    // };
  }

  // @Get(getApi("/profile/recent-answers/get"))
  async getProfileRecentAnswers(@Body() body: Dtos.getProfileRecentAnswersInDto): Promise<Dtos.getProfileRecentAnswersOutDto> {
    //TODO: assert valid token
    // should check in all profile, service.ts
    // body.token
    const dateMillis: number = Date.parse(body.time);
    const ts = admin.firestore.Timestamp.fromMillis(dateMillis);
    const answers = await getRecentAnswers(body.uid, ts, body.size, body.page);
    console.log("answers: ", answers);
    return this.getAnswers(answers);
  }

  getTime(): string {
    return "timeType";
  }

  getInterests(): Dtos.getProfileInterestsOutDto {
    return {
      time: this.getTime(),
      interests: ["talking", "dating", "reading books", "example-hypen"]
    }
  }

  postInterests(): Dtos.postProfileInterestsOutDto {
    return {
      time: this.getTime()
    }
  }

  // @Get(getApi("/profile/interests/get"))
  async getProfileInterests(@Body() body: Dtos.getProfileInterestsInDto): Promise<Dtos.getProfileInterestsOutDto> {
    return this.getInterests();
  }

  // @Post(getApi("/profile/interests/post"))
  async postProfileInterests(@Body() body: Dtos.postProfileInterestsInDto): Promise<Dtos.postProfileInterestsOutDto> {
    return this.postInterests();
  }

}