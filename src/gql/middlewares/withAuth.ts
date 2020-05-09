import {AuthenticatedContext, Context} from '../types';
import {isSignValid} from '../../http/utils';
import {AuthorizationError} from '../errors';
import {withErrorCatch} from './withErrorCatch';
import {config} from '../../config';

/**
 * Middleware which adds user id in context from request
 * @type {Resolver<unknown>}
 */
export const withAuth = withErrorCatch.createResolver(
  (root, _, context: Context) => {
    const {req} = context;
    const params = req.header('x-launch-params');

    if (typeof params === 'string') {
      const result = isSignValid(params, config.vkAppSecretKey);

      if (result.valid) {
        (context as AuthenticatedContext).userId = result.userId;
        return root;
      }
    }
    throw new AuthorizationError();
  },
);
