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