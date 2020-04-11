import {createServer} from 'http';
import express from 'express';
import chalk from 'chalk';
import config from '../config';
import cors from 'cors';
import path from 'path';
import {createApolloServer} from '../gql/createApolloServer';
import {createDb, createMongoClient} from '../db';
import {getRootRouter} from './routes/getRootRouter';

/**
 * Starts HTTP-server
 * @returns {Promise<void>}
 */
export async function runHttpServer() {
  const {port, root, env} = config;

  // Connect mongo client
  const client = createMongoClient();
  await client.connect();

  // Create database
  const db = createDb(client);

  // Create Express-server
  const app = express();
  const server = createServer(app);

  // Create Apollo server
  const apolloServer = createApolloServer(db);

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
