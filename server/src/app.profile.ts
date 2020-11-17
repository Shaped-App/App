import * as Dtos from './app.dtos';
import { Body, Injectable } from '@nestjs/common';
import { getUserInfoFromUID, makeUser } from './firebase/functions';


@Injectable()
export class ProfileService {

  // Profile services

  // @Get(getApi("/profile/info/get"))
  async getProfileInfo(@Body() body: Dtos.getProfileInfoInDto): Promise<Dtos.getProfileInfoOutDto> {
    const info = getUserInfoFromUID(body.uid);
    console.log(info);
    return info;
  }

  postInfo(): Dtos.postProfileInfoOutDto {
    return {
      time: "time"
    };
  }

  // @Post(getApi("/profile/info/post"))
  async postProfileInfo(@Body() body: Dtos.postProfileInfoInDto): Promise<Dtos.postProfileInfoOutDto> {
    return this.postInfo();
  }

  // @Post(getApi("/profile/create/post"))
  async postProfileCreate(@Body() body: Dtos.postCreateProfileInDto): Promise<Dtos.postCreateProfileInfoOutDto> {
    const user: Dtos.APIUser = await makeUser(body.new_user_info);
    return {
      new_uid: user.uid
    };
  }

  getAnswers(): Dtos.getProfileRecentAnswersOutDto {
    return {
      answers: {
        "aid":
        {
          qid: "qid",
          aid: "aid",
          answer: "answer text",
          created: "time",
          creator: "creator"
        }
      }
    };
  }

  // @Get(getApi("/profile/recent-answers/get"))
  async getProfileRecentAnswers(@Body() body: Dtos.getProfileRecentAnswersInDto): Promise<Dtos.getProfileRecentAnswersOutDto> {
    return this.getAnswers();
  }

  getInterests(): Dtos.getProfileInterestsOutDto {
    return {
      interests: ["talking", "dating", "reading books", "example-hypen"]
    }
  }

  postInterests(): Dtos.postProfileInterestsOutDto {
    return {
      time: "time"
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