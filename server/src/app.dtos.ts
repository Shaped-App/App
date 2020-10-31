//? to export or not to export
export type QID = string;
export type AID = string;
export type UID = string;
export type Token = string;
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

export interface getTokenInDto {
  token: Token;
}
export interface getTokenOutDto {
  uid: UID;
}
export interface getQuestionListInDto {
  time: Time;
}

export interface getQuestionListOutDto {
  qids: APIQuestion[];
}

export interface getQuestionInDto {
  qids: QID[];
}

export interface getQuestionOutDto {
  questions: APIQuestion[];
}

export interface getAnswerListInDto {
  time: Time,
  qid: QID;
}

export interface getAnswerListOutDto {
  aids: APIAnswer[];
}

export interface getAnswerInDto {
  qid: QID,
  aids: AID[];
}

export interface getAnswerOutDto {
  answers: APIAnswer[];
}

export interface postAnswerInDto {
  qid: QID,
  answer: string,
  time: Time;
}

export interface postAnswerOutDto {
  answer: APIAnswer;
}

export interface postResponseInDto {
  qid: QID,
  aid: AID,
  response: string,
  time: Time;
}

export interface postResponseOutDto {
  qid: QID,
  aid: AID,
  time: Time,
  responsesLeft: ResponsesLeft;
}

export interface getResponseLimitInDto {
  time: Time;
}

export interface getResponseLimitOutDto {
  responsesLeft: ResponsesLeft;
}

export interface getProfileInfoInDto { 
  uid: UID;
}
export interface getProfileInfoOutDto { 
  info: {
    uid: UID,
    email: string,
    phone_number: number,
    //TODO:
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
    about: string,
    bible_verse: string,
  }
}

export interface postProfileInfoInDto {
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
export interface postProfileInfoOutDto { 
  time: Time;
}

export interface postCreateProfileInDto { 
  new_user_info: {
    email: string,
    phone_number: number,
    //TODO: 
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
}
export interface postCreateProfileInfoOutDto { 
  new_uid: UID;
}

export interface getProfileRecentAnswersInDto { 
    uid: UID,
    time: Time;
}
export interface getProfileRecentAnswersOutDto { 
    answers: {
        [index: string]: APIAnswer
    }
}

export interface getProfileInterestsInDto { 
  uid: UID;
  time: Time;
}
export interface getProfileInterestsOutDto { 
  interests: string[];
}

export interface postProfileInterestsInDto { 
  interests: string[];
  time: Time;
}
export interface postProfileInterestsOutDto { 
  time: Time;
}
