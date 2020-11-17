//? to export or not to export
export type QID = string;
export type AID = string;
export type UID = string;
export type UIDToken = string;
export type Time = string; // subject to change
export type ResponsesLeft = number;

export interface APIQuestion {
  qid: QID,
  question: string,
  created: Time,
  userAnswered: boolean,
  creator?: UID;
}

export interface APIAnswer {
  qid: QID,
  aid: AID,
  answer: string,
  created: Time,
  creator?: UID;
}

export interface APIUser extends APIUserInfo {
  about: string,
  bible_verse: string,
}

export interface APIUserInfo {
  uid: UID,
  email: string,
  phone_number: number,
  //TODO: use pictures
  // profile_pic: image_id,
  gender: string,
  first_name: string,
  full_name: string,
  birthday: Time,
  zipcode: number,
  looking_for_friend: boolean,
  looking_for_relationship: boolean,
  mile_distance: number,
  age_low: number,
  age_high: number,
}

interface APIDto {
  token: UIDToken
}

export interface getTokenInDto extends APIDto {
  uid: UID
}
export interface getTokenOutDto extends APIDto {
  uid: UID;
}
export interface getQuestionListInDto extends APIDto {
  time: Time;
}

export interface getQuestionListOutDto extends APIDto {
  qids: APIQuestion[];
}

export interface getQuestionInDto extends APIDto {
  qids: QID[];
}

export interface getQuestionOutDto extends APIDto {
  questions: APIQuestion[];
}

export interface getAnswerListInDto extends APIDto {
  time: Time,
  qid: QID;
}

export interface getAnswerListOutDto extends APIDto {
  aids: APIAnswer[];
}

export interface getAnswerInDto extends APIDto {
  qid: QID,
  aids: AID[];
}

export interface getAnswerOutDto extends APIDto {
  answers: APIAnswer[];
}

export interface postAnswerInDto extends APIDto {
  qid: QID,
  answer: string,
  time: Time;
}

export interface postAnswerOutDto extends APIDto {
  answer: APIAnswer;
}

export interface postResponseInDto extends APIDto {
  qid: QID,
  aid: AID,
  response: string,
  time: Time;
}

export interface postResponseOutDto extends APIDto {
  qid: QID,
  aid: AID,
  time: Time,
  responsesLeft: ResponsesLeft;
}

export interface getResponseLimitInDto extends APIDto {
  time: Time;
}

export interface getResponseLimitOutDto extends APIDto {
  responsesLeft: ResponsesLeft;
}

export interface getProfileInfoInDto extends APIDto {
  uid: UID;
}
export interface getProfileInfoOutDto extends APIDto {
  info: APIUser
}

export interface postProfileInfoInDto extends APIDto {
  updating_info: {
    looking_for_friend: boolean,
    looking_for_relationship: boolean,
    mile_distance: number,
    age_low: number,
    age_high: number,
    about: string,
    bible_verse: string,
  }
}
export interface postProfileInfoOutDto extends APIDto {
  time: Time;
}

export interface postCreateProfileInDto extends APIDto {
  new_user_info: APIUserInfo
}
export interface postCreateProfileInfoOutDto extends APIDto {
  new_uid: UID;
}

export interface getProfileRecentAnswersInDto extends APIDto {
    uid: UID,
    time: Time;
}
export interface getProfileRecentAnswersOutDto extends APIDto {
    answers: {
        [index: string]: APIAnswer
    }
}

export interface getProfileInterestsInDto extends APIDto {
  uid: UID;
  time: Time;
}
export interface getProfileInterestsOutDto extends APIDto {
  interests: string[];
}

export interface postProfileInterestsInDto extends APIDto {
  interests: string[];
  time: Time;
}
export interface postProfileInterestsOutDto extends APIDto {
  time: Time;
}
