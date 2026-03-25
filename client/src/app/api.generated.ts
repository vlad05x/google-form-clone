import { baseApi } from './baseApi';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Answer = {
  __typename?: 'Answer';
  questionId: Scalars['ID']['output'];
  value: Scalars['String']['output'];
};

export type AnswerInput = {
  questionId: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};

export type Form = {
  __typename?: 'Form';
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  questions: Array<Question>;
  title: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createForm: Form;
  submitResponse: Response;
};


export type MutationCreateFormArgs = {
  description?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<InputMaybe<QuestionInput>>>;
  title: Scalars['String']['input'];
};


export type MutationSubmitResponseArgs = {
  answers?: InputMaybe<Array<InputMaybe<AnswerInput>>>;
  formId: Scalars['ID']['input'];
};

export type Query = {
  __typename?: 'Query';
  form?: Maybe<Form>;
  forms: Array<Form>;
  responses: Array<Response>;
};


export type QueryFormArgs = {
  id: Scalars['ID']['input'];
};


export type QueryResponsesArgs = {
  formId: Scalars['ID']['input'];
};

export type Question = {
  __typename?: 'Question';
  id: Scalars['ID']['output'];
  options?: Maybe<Array<Scalars['String']['output']>>;
  text: Scalars['String']['output'];
  type: Scalars['String']['output'];
};

export type QuestionInput = {
  options?: InputMaybe<Array<Scalars['String']['input']>>;
  text: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type Response = {
  __typename?: 'Response';
  answers: Array<Answer>;
  formId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
};

export type CreateFormMutationVariables = Exact<{
  title: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  questions?: InputMaybe<Array<InputMaybe<QuestionInput>> | InputMaybe<QuestionInput>>;
}>;


export type CreateFormMutation = { __typename?: 'Mutation', createForm: { __typename?: 'Form', id: string } };

export type SubmitResponseMutationVariables = Exact<{
  formId: Scalars['ID']['input'];
  answers?: InputMaybe<Array<InputMaybe<AnswerInput>> | InputMaybe<AnswerInput>>;
}>;


export type SubmitResponseMutation = { __typename?: 'Mutation', submitResponse: { __typename?: 'Response', id: string } };

export type GetFormsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetFormsQuery = { __typename?: 'Query', forms: Array<{ __typename?: 'Form', id: string, title: string, description?: string | null }> };

export type GetFormByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetFormByIdQuery = { __typename?: 'Query', form?: { __typename?: 'Form', id: string, title: string, description?: string | null, questions: Array<{ __typename?: 'Question', id: string, type: string, text: string, options?: Array<string> | null }> } | null };

export type GetResponsesQueryVariables = Exact<{
  formId: Scalars['ID']['input'];
}>;


export type GetResponsesQuery = { __typename?: 'Query', responses: Array<{ __typename?: 'Response', id: string, answers: Array<{ __typename?: 'Answer', questionId: string, value: string }> }> };


export const CreateFormDocument = `
    mutation CreateForm($title: String!, $description: String, $questions: [QuestionInput]) {
  createForm(title: $title, description: $description, questions: $questions) {
    id
  }
}
    `;
export const SubmitResponseDocument = `
    mutation SubmitResponse($formId: ID!, $answers: [AnswerInput]) {
  submitResponse(formId: $formId, answers: $answers) {
    id
  }
}
    `;
export const GetFormsDocument = `
    query GetForms {
  forms {
    id
    title
    description
  }
}
    `;
export const GetFormByIdDocument = `
    query GetFormById($id: ID!) {
  form(id: $id) {
    id
    title
    description
    questions {
      id
      type
      text
      options
    }
  }
}
    `;
export const GetResponsesDocument = `
    query GetResponses($formId: ID!) {
  responses(formId: $formId) {
    id
    answers {
      questionId
      value
    }
  }
}
    `;

const injectedRtkApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    CreateForm: build.mutation<CreateFormMutation, CreateFormMutationVariables>({
      query: (variables) => ({ document: CreateFormDocument, variables })
    }),
    SubmitResponse: build.mutation<SubmitResponseMutation, SubmitResponseMutationVariables>({
      query: (variables) => ({ document: SubmitResponseDocument, variables })
    }),
    GetForms: build.query<GetFormsQuery, GetFormsQueryVariables | void>({
      query: (variables) => ({ document: GetFormsDocument, variables })
    }),
    GetFormById: build.query<GetFormByIdQuery, GetFormByIdQueryVariables>({
      query: (variables) => ({ document: GetFormByIdDocument, variables })
    }),
    GetResponses: build.query<GetResponsesQuery, GetResponsesQueryVariables>({
      query: (variables) => ({ document: GetResponsesDocument, variables })
    }),
  }),
});

export { injectedRtkApi as api };
export const { useCreateFormMutation, useSubmitResponseMutation, useGetFormsQuery, useLazyGetFormsQuery, useGetFormByIdQuery, useLazyGetFormByIdQuery, useGetResponsesQuery, useLazyGetResponsesQuery } = injectedRtkApi;

