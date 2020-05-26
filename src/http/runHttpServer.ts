import {createServer} from 'http';
import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import path from 'path';
import {createApolloServer} from '../gql/createApolloServer';
import {createDb, createMongoClient} from '../db';
import {getRootRouter} from './routes/getRootRouter';

import {RunHttpServerOptions} from './types';

/**
 * Starts HTTP-server
 * @returns {Promise<void>}
 */
export async function runHttpServer(options: RunHttpServerOptions) {
  const {
    port, root, isDev, staticBaseUrl, vkAPI,
  } = options;

  // Connect mongo client
  const client = createMongoClient();
  await client.connect();

  // Create database
  const db = createDb(client);

  // Create Express-server
  const app = express();
  const server = createServer(app);

  // Create Apollo server
  const apolloServer = createApolloServer({db, isDev, vkAPI});

  app.use(cors());

  // Send static in dev mode
  if (isDev) {
    app.use(
      staticBaseUrl,
      express.static(path.resolve(__dirname, '../../static')),
    );
  }

  app.use(express.json({}));
  app.use(express.urlencoded({extended: false}));
  app.use(root, getRootRouter(apolloServer));

  server.listen(port, () => {
    console.log(
      'Server started on ' + chalk.yellow('http://localhost:' + port + root),
    );
  });
}
