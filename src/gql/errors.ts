import {createError} from './utils';
import {ApolloError} from './types';

export const AuthorizationError = createError(ApolloError.Authorization);
export const UserNotFoundError = createError(ApolloError.UserNotFound);
export const UnknownError = createError(ApolloError.Unknown);
