import {Request} from 'express';
import {Database} from '../../db/Database';
import {Resolver} from 'apollo-resolvers';

/**
 * Общие свойства контекста
 */
export interface Context {
  db: Database;
  req: Request;
}

/**
 * Контекст в котором пользователь верифицирован
 */
export type AuthenticatedContext = Context & {
  userId: number;
}

/**
 * Описание резолверов типа
 */
export type RootTypeResolvers<Type extends {}> = {
  [K in keyof Type]: Resolver<Type[K]>;
}

/**
 * Описание резолверов для типа Subscription
 */
export type SubscriptionTypeResolvers<Type extends {}> = {
  [K in keyof Type]: {
    resolver?: Resolver<Type[K]>;
    subscription: Resolver<Type[K]>;
  };
};
