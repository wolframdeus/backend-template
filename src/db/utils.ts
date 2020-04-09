import config from '../config';
import {MongoClient} from 'mongodb';
import {Database} from './Database';
import {Collection} from './types';

/**
 * Создает клиент mongo
 * @returns {MongoClient}
 */
export function createMongoClient(): MongoClient {
  const {dbPort, dbHost} = config;
  const connectionString = `mongodb://${dbHost}:${dbPort}`;
  return new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

/**
 * Создаем обертку для работы с БД относительно клиента.
 * @param client
 */
export function createDb(client: MongoClient): Database {
  return new Database(client.db(config.dbName))
}

/**
 * Создает ноебходимые индексы в БД
 * @param {Database} db
 * @returns {Promise<void>}
 */
export async function prepareDb(db: Database) {
}
