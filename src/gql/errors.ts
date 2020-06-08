import {createError} from './utils';
import {ApolloError} from './types';
import {config} from '../config';

const isDev = config.env === 'development';

export const AuthorizationError = createError(ApolloError.Authorization, isDev, {
  message: 'Authorization required',
});
export const UserNotFoundError = createError(ApolloError.UserNotFound, isDev, {
  message: 'User was not found',
});
export const UserDeactivatedError = createError(ApolloError.UserDeactivated, isDev, {
  message: 'User is deactivated',
});
export const UnknownError = createError(ApolloError.Unknown, isDev, {
  message: 'Unknown error occurred',
});
