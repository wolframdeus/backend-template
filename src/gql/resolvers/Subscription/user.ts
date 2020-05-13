import {withAuth} from '../../middlewares/withAuth';
import {AuthenticatedContext, PubSubAsyncIteratorType} from '../../types';
import {createUserUpdatedEventName} from '../../utils';

/**
 * Returns subscription on current user changes
 * @type {Resolver<AsyncIterator<any, any, any>>}
 */
export const userSubscription = withAuth.createResolver(
  (_, __, context: AuthenticatedContext): PubSubAsyncIteratorType => {
    const {userId, pubSub} = context;

    return pubSub.asyncIterator(createUserUpdatedEventName(userId));
  },
);
