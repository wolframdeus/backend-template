import {ApolloServer} from 'apollo-server-express';
import {Context, RootTypeResolvers, SubscriptionTypeResolvers} from './types';
import {Database} from '../db/Database';
import config from '../config';

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
    introspection: config.env === 'development',
    resolvers: {
      Query,
      Mutation,
      Subscription,
    },
  });
}
