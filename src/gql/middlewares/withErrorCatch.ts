import {createResolver} from 'apollo-resolvers';
import {isInstance} from 'apollo-errors';
import {UnknownError} from '../errors';

/**
 * Emergency resolver. Catches error if it was not caught before
 * @type {Resolver<unknown>}
 */
export const withErrorCatch = createResolver(
  null,
  (root, args, context, error) => {
    return isInstance(error) ? error : new UnknownError();
  },
);
