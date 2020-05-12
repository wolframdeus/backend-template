import {ApolloServer} from 'apollo-server-express';
import {
  Context,
  CreateApolloServerOptions,
  RootTypeResolvers,
  SubscriptionTypeResolvers,
} from './types';
import {formatError} from 'graphql';

/**
 * Here we should import types Query, Mutation and Subscription from bridge
 * and replace these below. Moreover, it is needed to import text
 * representation of schema and use it in typeDefs.
 */
type Query = {};
type Mutation = {};
type Subscription = {};
const schema = `
type Query {
  test: Boolean!
}
type Mutation {
  test: Boolean!
}
type Subscription {
  test: Boolean!
}
`;

/**
 * Creates ApolloServer
 * @returns {ApolloServer}
 * @param options
 */
export function createApolloServer(options: CreateApolloServerOptions) {
  const {db, vkAPI, isDev} = options;
  const Query: RootTypeResolvers<Query> = {};
  const Mutation: RootTypeResolvers<Mutation> = {};
  const Subscription: SubscriptionTypeResolvers<Subscription> = {};

  return new ApolloServer({
    typeDefs: schema,
    context: (ctx): Context => ({...ctx, db, vkAPI}),
    // Introspection query is allowed only in development mode. We are
    // not allowing anyone to research our API
    introspection: isDev,
    formatError,
    resolvers: {
      Query,
      Mutation,
      Subscription,
    },
  });
}
