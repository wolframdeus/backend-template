import {withAuth} from '../../middlewares/withAuth';
import {AuthenticatedContext, Query} from '../../types';
import {UserNotFoundError} from '../../errors';
import {CollectionEnum} from '../../../db/types';

/**
 * Returns user by id
 * @type {Resolver<Query.user>}
 */
export const userByIdResolver = withAuth.createResolver(
  async (
    _,
    args: Query.userById.Arguments,
    context: AuthenticatedContext,
  ): Promise<Query.userById> => {
    const {userId} = args;
    const {db} = context;
    const user = await db
      .collection(CollectionEnum.Users)
      .findOne({vkUserId: userId});

    if (!user) {
      throw new UserNotFoundError();
    }
    const {_id, vkUserId, lastName, firstName} = user;

    return {
      id: _id.toHexString(),
      vkUserId,
      name: `${firstName} ${lastName}`,
    };
  },
);
