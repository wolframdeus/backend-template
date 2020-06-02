import {config} from '../../config';
import {withErrorCatch} from './withErrorCatch';
import {AuthenticatedContext, Context} from '../types';
import {isSignValid} from '../../lib/utils';
import {AuthorizationError} from '../errors';

/**
 * Returns middleware which adds user id in context from request in case,
 * he is authorized. Otherwise, throws an error
 * @type {Resolver<unknown>}
 */
export function createWithAuthResolver(secretKey: string) {
  return withErrorCatch.createResolver(
    (root, _, context: Context) => {
      const {req} = context;
      const params = req.header('x-launch-params');

      if (typeof params === 'string') {
        const result = isSignValid(params, secretKey);

        if (result.valid) {
          (context as AuthenticatedContext).userId = result.userId;
          return root;
        }
      }
      throw new AuthorizationError();
    },
  );
}

export const withAuth = createWithAuthResolver(config.vkAppSecretKey);
