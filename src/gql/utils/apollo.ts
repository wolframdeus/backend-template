import {ErrorConfig, ApolloError} from 'apollo-errors';
import config from '../../config';

const isDev = config.env !== 'production';

/**
 * Создает ошибку GraphQL.
 * @param {string} name
 * @param {ErrorConfig} config
 * @returns {ApolloError}
 */
export function createError(
  name: string,
  config: ErrorConfig = {message: ''},
) {
  return class ApolloComputedError extends ApolloError {
    constructor(overriddenConfig: ErrorConfig = {message: ''}) {
      const conf = {
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
