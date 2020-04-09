import {createResolver} from 'apollo-resolvers';
import {isInstance} from 'apollo-errors';
import {UnknownError} from '../errors';

/**
 * Аварийный распознаватель. Форматирует ошибку в случае если она не была
 * отловлена
 * @type {Resolver<unknown>}
 */
export const withErrorCatch = createResolver(
  null,
  (root, args, context, error) => {
    return isInstance(error) ? error : new UnknownError();
  },
);
