import {CollectionEntity} from './CollectionEntity';

export interface User extends CollectionEntity {
  /**
   * User identifier sent from VKontakte
   */
  vkUserId: number;

  /**
   * First name
   */
  firstName: string;

  /**
   * Last name
   */
  lastName: string;
}
