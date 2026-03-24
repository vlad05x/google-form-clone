export interface IQuestion {
  id: string;
  type: string;
  text: string;
  options: string[] | null;
}

export interface IForm {
  id: string;
  title: string;
  description: string | null;
  questions: IQuestion[];
}

export interface IAnswer {
  questionId: string;
  value: string;
}

export interface IResponse {
  id: string;
  formId: string;
  answers: IAnswer[];
}

export interface IQuestionInput {
  type: string;
  text: string;
  options?: string[] | null;
}

export interface ICreateFormArgs {
  title: string;
  description?: string | null;
  questions?: IQuestionInput[] | null;
}

export interface IAnswerInput {
  questionId: string;
  value: string;
}

export interface ISubmitResponseArgs {
  formId: string;
  answers?: IAnswerInput[] | null;
}