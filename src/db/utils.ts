import config from '../config';
import {MongoClient} from 'mongodb';
import {Database} from './Database';

/**
 * Creates mongo client
 * @returns {MongoClient}
 */
export function createMongoClient(): MongoClient {
  const {dbHost, dbPort} = config;
  const connectionString = `mongodb://${dbHost}:${dbPort}`;
  return new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}

/**
 * Creates wrapper to work with database
 * @param client
 */
export function createDb(client: MongoClient): Database {
  return new Database(client.db(config.dbName))
}

/**
 * Creates required structure for database
 * @param {Database} db
 * @returns {Promise<void>}
 */
export async function prepareDb(db: Database) {
}
