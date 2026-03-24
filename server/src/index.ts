import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import crypto from "crypto";


import type { 
  IForm, IResponse, ICreateFormArgs, ISubmitResponseArgs 
} from "./types.js"; 

const forms: IForm[] = [];
const responses: IResponse[] = [];

const typeDefs = `#graphql
  type Question {
    id: ID!
    type: String!
    text: String!
    options: [String!]
  }

  type Form {
    id: ID!
    title: String!
    description: String
    questions: [Question!]!
  }

  type Answer {
    questionId: ID!
    value: String!
  }

  type Response {
    id: ID!
    formId: ID!
    answers: [Answer!]!
  }

  input QuestionInput {
    type: String!
    text: String!
    options: [String!]
  }

  input AnswerInput {
    questionId: ID!
    value: String!
  }

  type Query {
    forms: [Form!]!
    form(id: ID!): Form
    responses(formId: ID!): [Response!]!
  }

  type Mutation {
    createForm(title: String!, description: String, questions: [QuestionInput]): Form!
    submitResponse(formId: ID!, answers: [AnswerInput]): Response!
  }
`;

const resolvers = {
  Query: {
    forms: (): IForm[] => forms,
    form: (_parent: unknown, args: { id: string }): IForm | undefined =>
      forms.find((f) => f.id === args.id),
    responses: (_parent: unknown, args: { formId: string }): IResponse[] =>
      responses.filter((r) => r.formId === args.formId),
  },
  Mutation: {
    createForm: (_parent: unknown, args: ICreateFormArgs): IForm => {
      const newForm: IForm = {
        id: crypto.randomUUID(),
        title: args.title,
        description: args.description || null,
        questions: (args.questions || []).map((q) => ({
          id: crypto.randomUUID(),
          type: q.type,
          text: q.text,
          options: q.options || null,
        })),
      };
      forms.push(newForm);
      return newForm;
    },
    submitResponse: (_parent: unknown, args: ISubmitResponseArgs): IResponse => {
      const newResponse: IResponse = {
        id: crypto.randomUUID(),
        formId: args.formId,
        answers: (args.answers || []).map((a) => ({
          questionId: a.questionId,
          value: a.value,
        })),
      };
      responses.push(newResponse);
      return newResponse;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 3000 },
});

console.log(`Server ready at ${url}`);