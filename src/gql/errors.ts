import {createError} from './utils';
import {ApolloError} from './types';

export const AuthorizationError = createError(ApolloError.Authorization, {
  message: 'Authorization required',
});
export const UserNotFoundError = createError(ApolloError.UserNotFound, {
  message: 'User was not found',
});
export const UnknownError = createError(ApolloError.Unknown, {
  message: 'Unknown error occurred',
});
