import {withAuth} from './withAuth';
import {UserNotFoundError} from '../errors';
import {AuthenticatedContext, PersonalizedContext} from '../types';
import {CollectionEnum} from '../../db/types';

/**
 * Adds user entity to context
 * @type {Resolver<any>}
 */
export const withUser = withAuth.createResolver(
  async (root, __, context: AuthenticatedContext) => {
    const {userId, db} = context;
    const user = await db
      .collection(CollectionEnum.Users)
      .findOne({vkUserId: userId});

    if (!user) {
      throw new UserNotFoundError();
    }
    (context as PersonalizedContext).user = user;
    return root;
  },
);
