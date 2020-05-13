import {Request} from 'express';
import {Database} from '../../db/Database';
import {PubSub} from 'apollo-server-express';
import {Resolver} from 'apollo-resolvers';
import {VKAPIInterface} from 'vkontakte-api';

/**
 * Type returned for subscriptions
 */
export type PubSubAsyncIteratorType = AsyncIterator<any, any, any>;

/**
 * Context base
 */
export interface Context {
  /**
   * Database instance
   */
  db: Database;
  /**
   * PubSub instance
   */
  pubSub: PubSub;
  /**
   * VKAPI instance
   */
  vkAPI: VKAPIInterface;
  /**
   * Incoming request
   */
  req: Request;
}

/**
 * Context where user is verified
 */
export interface AuthenticatedContext extends Context {
  userId: number;
}

/**
 * Resolvers description of type
 */
export type RootTypeResolvers<Type extends {}> = {
  [K in keyof Type]: Resolver<Type[K]>;
}

/**
 * Resolvers description of Subscription type
 */
export type SubscriptionTypeResolvers<Type extends {}> = {
  [K in keyof Type]: {
    resolver?: Resolver<Type[K]>;
    subscribe: Resolver<PubSubAsyncIteratorType>;
  };
};
