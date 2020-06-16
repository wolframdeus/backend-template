import {MongoClient} from 'mongodb';
import {Database} from './Database';

/**
 * Creates mongo client
 * @returns {MongoClient}
 */
export function createMongoClient(host: string, port: number): MongoClient {
  const connectionString = `mongodb://${host}:${port}`;
  return new MongoClient(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}

/**
 * Creates wrapper around mongo db to work with database
 * @param client
 * @param dbName
 */
export function createDb(client: MongoClient, dbName: string): Database {
  return new Database(client.db(dbName));
}

/**
 * Creates required structure for database (collection, indexes, etc.)
 * @param {Database} db
 * @returns {Promise<void>}
 */
// eslint-disable-next-line max-len
// eslint-disable-next-line @typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
export async function prepareDb(db: Database) {
}

/**
 * Creates database and its structure
 * @param {string} host
 * @param {number} port
 * @param {string} dbName
 * @returns {Promise<Database>}
 */
export async function initDatabase(host: string, port: number, dbName: string) {
  const client = createMongoClient(host, port);
  await client.connect();
  const db = createDb(client, dbName);

  await prepareDb(db);

  return db;
}
