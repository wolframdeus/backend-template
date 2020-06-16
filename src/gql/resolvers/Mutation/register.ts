import {withAuth} from '../../middlewares/withAuth';
import {Mutation} from '../../types/schema';
import {AuthenticatedContext} from '../../types';
import {UserDeactivatedError} from '../../errors';
import {CollectionEnum} from '../../../db/types';

/**
 * Registers user in system
 * @type {Resolver<Query.user>}
 */
export const registerResolver = withAuth.createResolver(
  async (_, __, context: AuthenticatedContext): Promise<Mutation.register> => {
    const {vkAPI, userId, db} = context;

    // Try to find user with same vkUserId
    const collection = db.collection(CollectionEnum.Users);
    const registeredUser = await collection.findOne({vkUserId: userId});

    // In case, no user found, register new one
    if (!registeredUser) {
      // Getting user information from VKontakte
      const [user] = await vkAPI.users.get({userIds: [userId]});

      // In case, user is banned or deleted, "deactivated" field exists in user
      if (!user || 'deactivated' in user) {
        throw new UserDeactivatedError();
      }

      // Here we can do whatever with this information we want. Just insert new
      // entity
      await collection.insertOne({vkUserId: userId});
    }

    return userId;
  },
);
