/**
 * Список ошибок которые может возвращать сервер
 */
export enum ApolloError {
  Authorization = 'AuthorizationError',
  AdminRightsRequired = 'AdminRightsRequiredError',
  FindUsersLimit = 'FindUsersLimitError',
  Unknown = 'UnknownError',
  UserNotFound = 'UserNotFoundError',
}
