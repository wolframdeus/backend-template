import {createError} from './utils/apollo';
import {ApolloError} from './types';

export const AuthorizationError = createError(ApolloError.Authorization);

export const AdminRightsRequiredError =
  createError(ApolloError.AdminRightsRequired);

export const UnknownError = createError(ApolloError.Unknown);

export const UserNotFoundError = createError(ApolloError.UserNotFound);

export const FindUsersLimitError = createError(ApolloError.FindUsersLimit);
