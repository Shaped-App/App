//? to export or not to export
export type QID = string;
export type AID = string;
export type UID = string;
export type UIDToken = string;
export type APITime = string; // subject to change
export type ResponsesLeft = number;

export interface APIQuestion {
  qid: QID,
  question: string,
  created: APITime,
  userAnswered: boolean,
  creator?: UID;
}

export interface APIAnswer {
  qid: QID,
  aid: AID,
  answer: string,
  created: APITime,
  creator?: UID;
}

export interface APIUser extends APIUserInfo {
  uid: UID,
  // TODO: separate info that can and can't be updated
  // about: string,
  // bible_verse: string,
}

export interface APIUserInfo {
  email: string,
  phone_number: number,
  //TODO: use pictures
  // profile_pic: image_id,

  gender: string,
  first_name: string,
  full_name: string,
  birthday: APITime,

  zipcode: number,
  looking_for_friend: boolean,
  looking_for_relationship: boolean,
  mile_distance_low: number,
  mile_distance_high: number,
  age_low: number,
  age_high: number,
  about: string,
  bible_verse: string,
}

interface APIInDto {
  token: UIDToken
}

interface APIOutDto {
  time: APITime
}

export interface getTokenInDto {
  uid: UID
}
export interface getTokenOutDto extends APIOutDto {
  token: UIDToken;
  uid: UID;
}

export interface postTokenInDto extends APIInDto {
  uid: UID
}
export interface postTokenOutDto extends APIOutDto {
  uid: UID;
}

export interface getQuestionListInDto extends APIInDto {
  time: APITime;
}

export interface getQuestionListOutDto extends APIOutDto {
  qids: APIQuestion[];
}

export interface getQuestionInDto extends APIInDto {
  qids: QID[];
}

export interface getQuestionOutDto extends APIOutDto {
  questions: APIQuestion[];
}

export interface getAnswerListInDto extends APIInDto {
  time: APITime,
  qid: QID;
}

export interface getAnswerListOutDto extends APIOutDto {
  aids: APIAnswer[];
}

export interface getAnswerInDto extends APIInDto {
  qid: QID,
  aids: AID[];
}

export interface getAnswerOutDto extends APIOutDto {
  answers: APIAnswer[];
}

export interface postAnswerInDto extends APIInDto {
  qid: QID,
  answer: string,
  // time: APITime;
}

export interface postAnswerOutDto extends APIOutDto {
  answer: APIAnswer;
}

export interface postResponseInDto extends APIInDto {
  qid: QID,
  aid: AID,
  response: string,
  // time: APITime;
}

export interface postResponseOutDto extends APIOutDto {
  qid: QID,
  aid: AID,
  // time: APITime,
  responsesLeft: ResponsesLeft;
}

export type getResponseLimitInDto = APIInDto

export interface getResponseLimitOutDto extends APIOutDto {
  responsesLeft: ResponsesLeft;
}

export interface getProfileInfoInDto extends APIInDto {
  uid: UID;
}
export interface getProfileInfoOutDto extends APIOutDto {
  info: APIUser
}

export interface postProfileInfoInDto extends APIInDto {
  updating_info: {
    looking_for_friend: boolean,
    looking_for_relationship: boolean,
    mile_distance_low: number,
    mile_distance_high: number,
    age_low: number,
    age_high: number,
    about: string,
    bible_verse: string,
  }
}
export type postProfileInfoOutDto = APIOutDto

export interface postCreateProfileInDto extends APIInDto {
  new_user_info: APIUserInfo
}
export interface postCreateProfileInfoOutDto extends APIOutDto {
  new_uid: UID;
}

export interface getProfileRecentAnswersInDto extends APIInDto {
    uid: UID,
    // time: APITime;
}
export interface getProfileRecentAnswersOutDto extends APIOutDto {
    answers: {
        [index: string]: APIAnswer
    }
}

export interface getProfileInterestsInDto extends APIInDto {
  uid: UID;
  // time: APITime;
}
export interface getProfileInterestsOutDto extends APIOutDto {
  interests: string[];
}

export interface postProfileInterestsInDto extends APIInDto {
  interests: string[];
  // time: APITime;
}
export type postProfileInterestsOutDto = APIOutDto
