import {ApolloServer} from 'apollo-server-express';
import {Context, RootTypeResolvers, SubscriptionTypeResolvers} from './types';
import {Database} from '../db/Database';
import {config} from '../config';
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
 * @param {Database} db
 * @returns {ApolloServer}
 */
export function createApolloServer(db: Database) {
  const Query: RootTypeResolvers<Query> = {};
  const Mutation: RootTypeResolvers<Mutation> = {};
  const Subscription: SubscriptionTypeResolvers<Subscription> = {};

  return new ApolloServer({
    typeDefs: schema,
    context: (ctx): Context => ({...ctx, db}),
    // Introspection query is allowed only in development mode. We are
    // not allowing anyone to research our API
    introspection: config.env === 'development',
    formatError,
    resolvers: {
      Query,
      Mutation,
      Subscription,
    },
  });
}
