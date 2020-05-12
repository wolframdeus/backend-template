import {createServer} from 'http';
import express from 'express';
import chalk from 'chalk';
import cors from 'cors';
import path from 'path';
import {createApolloServer} from '../gql/createApolloServer';
import {createDb, createMongoClient} from '../db';
import {getRootRouter} from './routes/getRootRouter';

import {RunHttpServerOptions} from './types';
import {VKAPI} from 'vkontakte-api';
import {VKAPISlave} from 'vkontakte-api/dist/multithreading/VKAPISlave';

/**
 * Starts HTTP-server
 * @returns {Promise<void>}
 */
export async function runHttpServer(options: RunHttpServerOptions) {
  const {singleThreadMode, config} = options;
  const {port, root, env, vkApiRequestsPerSecond, vkAppServiceKey} = config;

  // Connect mongo client
  const client = createMongoClient();
  await client.connect();

  // Create database
  const db = createDb(client);

  // Create Express-server
  const app = express();
  const server = createServer(app);

  // Create Apollo server
  const apolloServer = createApolloServer({
    db,
    isDev: env === 'development',
    // In single thread mode, it is required to create instance of VKAPI.
    // Otherwise, master thread had to create it and here we are only
    // creating slave which communicates with master
    vkAPI: singleThreadMode
      ? new VKAPI({
        requestsPerSecond: vkApiRequestsPerSecond,
        accessToken: vkAppServiceKey,
      })
      : new VKAPISlave(),
  });

  app.use(cors());

  // Send static in dev mode
  if (env === 'development') {
    app.use(
      config.staticBaseUrl,
      express.static(path.resolve(__dirname, '../../static')),
    );
  }

  app.use(express.json({}));
  app.use(express.urlencoded({extended: false}));
  app.use(config.root, getRootRouter(apolloServer));

  server.listen(port, () => {
    console.log(
      'Server started on ' + chalk.yellow('http://localhost:' + port + root),
    );
  });
}
