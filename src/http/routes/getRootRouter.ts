import {Router} from 'express';
import {ApolloServer} from 'apollo-server-express';

/**
 * Возвращает корневой роутер
 * @param {ApolloServer} apolloServer
 * @returns {Router}
 */
export function getRootRouter(apolloServer: ApolloServer) {
  const router = Router();

  router.use('/gql', apolloServer.getMiddleware({path: '/'}));

  return router;
}
