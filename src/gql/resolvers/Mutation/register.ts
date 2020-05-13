import {withAuth} from '../../middlewares/withAuth';
import {Mutation} from '../../types/schema';
import {AuthenticatedContext} from '../../types';

/**
 * Registers user in system
 * @type {Resolver<Query.user>}
 */
export const registerResolver = withAuth.createResolver(
  async (_, __, context: AuthenticatedContext): Promise<Mutation.register> => {
    const {vkAPI, userId} = context;
    // NOTE: Remove this logic in production due to it is for test purposes
    //  only. It is required to check if user is already registered in this
    //  application via some database or kind of it.
    const userIsRegistered = false;

    if (!userIsRegistered) {
      // Getting user information from VKontakte
      const user = await vkAPI.users.get({
        userIds: [userId],
        fields: [],
      });

      // Here we can do with this information whatever we want
    }

    return true;
  },
);