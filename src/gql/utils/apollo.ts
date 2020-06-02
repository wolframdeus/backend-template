import {ErrorConfig, ApolloError} from 'apollo-errors';
import {config as envConfig} from '../../config';

/**
 * Creates GraphQL error
 * @param {string} name
 * @param {ErrorConfig} config
 * @returns {ApolloError}
 */
export function createError(
  name: string,
  config: Partial<ErrorConfig> = {},
) {
  return class ApolloComputedError extends ApolloError {
    constructor(overriddenConfig: Partial<ErrorConfig> = {}) {
      const isDev = envConfig.env !== 'production';
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
