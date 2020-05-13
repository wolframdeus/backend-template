import {ApolloServer, PubSub} from 'apollo-server-express';
import {
  Context,
  CreateApolloServerOptions,
  RootTypeResolvers,
  SubscriptionTypeResolvers,
  schema,
  Query,
  Mutation,
  Subscription,
} from './types';
import {formatError} from 'graphql';

import {userResolver} from './resolvers/Query/user';
import {userByIdResolver} from './resolvers/Query/userById';
import {registerResolver} from './resolvers/Mutation/register';
import {userSubscription} from './resolvers/Subscription/user';

/**
 * Creates ApolloServer
 * @returns {ApolloServer}
 * @param options
 */
export function createApolloServer(options: CreateApolloServerOptions) {
  const {db, vkAPI, isDev} = options;
  const pubSub = new PubSub();

  const query: RootTypeResolvers<Query> = {
    user: userResolver,
    userById: userByIdResolver,
  };
  const mutation: RootTypeResolvers<Mutation> = {
    register: registerResolver,
  };
  const subscription: SubscriptionTypeResolvers<Subscription> = {
    user: {subscribe: userSubscription},
  };

  return new ApolloServer({
    typeDefs: schema,
    context: (ctx): Context => ({...ctx, db, vkAPI, pubSub}),
    // Introspection query is allowed only in development mode. We are
    // not allowing anyone to research our API
    introspection: isDev,
    formatError,
    resolvers: {
      Query: query,
      Mutation: mutation,
      Subscription: subscription,
    },
  });
}
