import {PubSubEventsEnum} from '../types';

/**
 * Returns UserUpdated event name
 * @returns {string}
 */
export function createUserUpdatedEventName(userId: number): string {
  return PubSubEventsEnum.UserUpdated + `-${userId}`;
}
