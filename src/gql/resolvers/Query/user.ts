import {withAuth} from '../../middlewares/withAuth';
import {Query} from '../../types/schema';

/**
 * Returns current user
 * @type {Resolver<Query.user>}
 */
export const userResolver = withAuth.createResolver(
  async (): Promise<Query.user> => {
    return {
      id: 1,
      name: 'Best programmer ever!'
    };
  },
);
