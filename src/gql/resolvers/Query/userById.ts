import {withAuth} from '../../middlewares/withAuth';
import {Query} from '../../types';
import {UserNotFoundError} from '../../errors';

/**
 * Returns user by id
 * @type {Resolver<Query.user>}
 */
export const userByIdResolver = withAuth.createResolver(
  (_, args: Query.userById.Arguments): Query.userById => {
    const {userId} = args;

    if (userId !== 1) {
      throw new UserNotFoundError();
    }

    return {
      id: 1,
      name: 'Best programmer ever!',
    };
  },
);
