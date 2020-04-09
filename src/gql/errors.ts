import {createError} from './utils/apollo';
import {ApolloError} from './types';

export const AuthorizationError = createError(ApolloError.Authorization);

export const UnknownError = createError(ApolloError.Unknown);
