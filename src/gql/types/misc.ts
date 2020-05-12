import {Database} from '../../db/Database';
import {VKAPIInterface} from 'vkontakte-api';

/**
 * Options required to create Apollo server
 */
export interface CreateApolloServerOptions {
  /**
   * Mongo db
   */
  db: Database;

  /**
   * Instance of VK API
   */
  vkAPI: VKAPIInterface;

  /**
   * States if deploy environment of server is "development"
   */
  isDev: boolean;
}
