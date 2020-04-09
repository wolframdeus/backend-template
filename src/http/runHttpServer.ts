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
 * Запускает HTTP-сервер
 * @returns {Promise<void>}
 */
export async function runHttpServer() {
  const {port, root, env} = config;

  // Подключаем mongo
  const client = createMongoClient();
  await client.connect();

  // Создаем БД
  const db = createDb(client);

  // Создаем Express-сервер
  const app = express();
  const server = createServer(app);
  const apolloServer = createApolloServer(db);

  app.use(cors());

  // В дев среде отдаем статику
  if (env !== 'production') {
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
      'Started listening on ' + chalk.yellow('http://localhost:' + port + root),
    );
  });
}
