

type QID = string;
type AID = string;
type UID = string;
type Time = string; // subject to change
type ResponsesLeft = number;

export interface Question {
  qid: QID, 
  question: string, 
  created: Time,
  userAnswered: boolean,
  creator?: UID
}

export interface Answer {
  aid: AID,
  answer: string, 
  created: Time,
  creator?: UID
}

export interface getQuestionListInDto {
  time: Time
}

export interface getQuestionListOutDto {
  qids: Question[]
}

export interface getQuestionInDto {
  qids: QID[]
}

export interface getQuestionOutDto {
  questions: Question[]
}

export interface getAnswerListInDto {
  time: Time,
  qid: QID
}

export interface getAnswerListOutDto {
  aids: Answer[]
}

export interface getAnswerInDto {
  aids: AID[]
}

export interface getAnswerOutDto {
  answers: Answer[]
}

export interface postAnswerInDto {
  qid: QID, 
  answer: string,
  time: Time
}

export interface postAnswerOutDto {
  qid: QID, 
  aid: AID,
  time: Time
}

export interface postResponseInDto {
  qid: QID, 
  aid: AID, 
  response: string,
  time: Time
}

export interface postResponseOutDto {
  qid: QID, 
  aid: AID, 
  time: Time,
  responsesLeft: ResponsesLeft
}

export interface getResponseLimitInDto {
  time: Time
}

export interface getResponseLimitOutDto {
  responsesLeft: ResponsesLeft
}