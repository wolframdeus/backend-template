import {Query} from '../../types/schema';
import {PersonalizedContext} from '../../types';
import {withUser} from '../../middlewares/withUser';

/**
 * Returns current user
 * @type {Resolver<Query.user>}
 */
export const userResolver = withUser.createResolver(
  async (_, __, context: PersonalizedContext): Promise<Query.user> => {
    const {_id, vkUserId, lastName, firstName} = context.user;

    return {
      id: _id.toHexString(),
      vkUserId,
      name: `${firstName} ${lastName}`,
    };
  },
);
