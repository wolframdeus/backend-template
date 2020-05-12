import {Request} from 'express';
import {Database} from '../../db/Database';
import {Resolver} from 'apollo-resolvers';
import {VKAPIInterface} from 'vkontakte-api';

/**
 * Context base
 */
export interface Context {
  db: Database;
  vkAPI: VKAPIInterface;
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
    subscription: Resolver<Type[K]>;
  };
};
