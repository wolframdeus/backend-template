import {ApolloServer} from 'apollo-server-express';
import {Context, RootTypeResolvers, SubscriptionTypeResolvers} from './types';
import {Database} from '../db/Database';

// Здесь необходимо импортировать типы Query, Mutation и Subscription из
// bridge и заменить ниже объявленные. Также, необходимо импортировать
// текстовое представление схемы и использовать в typeDefs
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
 * Создает ApolloServer
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
    resolvers: {
      Query,
      Mutation,
      Subscription,
    },
  });
}
