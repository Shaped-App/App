import * as Dtos from './app.dtos';
import { Body, Injectable } from '@nestjs/common';
import { IncomingMessage } from 'http';


@Injectable()
export class ProfileService {

  // Profile services
  // @Get(getApi("/profile/info/get"))

  getInfo() : Dtos.getProfileInfoOutDto {
    return {
      "info": {
        uid: "",
        email: "",
        phone_number: 3,
        //TODO:
        // profile_pic: image_id,
        gender: "",
        first_name: "",
        full_name: "",
        birthday: "time",
        zipcode: 3,
        looking_for_friend: false,
        looking_for_relationship: false,
        mile_distance: 3,
        age_low: 3,
        age_high: 3,
        about: "",
        bible_verse: "",
      }
    }
  }
  async getProfileInfo(@Body() body: Dtos.getProfileInfoInDto): Promise<Dtos.getProfileInfoOutDto> {
    return this.getInfo();
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

  createProfile() : Dtos.postCreateProfileInfoOutDto {
    return {
      new_uid: "uid"
    };
  }

  // @Post(getApi("/profile/create/post"))
  async postProfileCreate(@Body() body: Dtos.postCreateProfileInDto): Promise<Dtos.postCreateProfileInfoOutDto> {
    return this.createProfile();
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