import {ErrorConfig, ApolloError} from 'apollo-errors';
import {withErrorCatch} from '../middlewares/withErrorCatch';
import {AuthenticatedContext, Context} from '../types';
import {isSignValid} from '../../lib/utils';
import {AuthorizationError} from '../errors';

/**
 * Creates GraphQL error
 * @param {string} name
 * @param isDev
 * @param {ErrorConfig} config
 * @returns {ApolloError}
 */
export function createError(
  name: string,
  isDev = false,
  config: Partial<ErrorConfig> = {},
) {
  return class ApolloComputedError extends ApolloError {
    constructor(overriddenConfig: Partial<ErrorConfig> = {}) {
      const conf: ErrorConfig = {
        message: '',
        ...config,
        ...overriddenConfig,
        options: {
          showPath: isDev,
          showLocations: isDev,
        },
      };
      super(name, conf, conf);
    }
  };
}
