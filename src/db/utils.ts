import {Collection, IndexOptions, MongoClient} from 'mongodb';
import {Database} from './Database';
import {CollectionEnum} from './types';

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
 * Creates index in case, it does not exist
 * @param fieldOrSpec
 * @param name
 * @param {IndexOptions} options
 * @param {Collection} collection
 * @returns {Promise<void>}
 */
async function createIndex(
  fieldOrSpec: string | any,
  name: string,
  options: IndexOptions,
  collection: Collection,
) {
  const exists = await collection.indexExists(name);

  if (!exists) {
    await collection.createIndex(fieldOrSpec, {name, ...options});
  }
}

/**
 * Creates users collection
 * @param {Database} db
 * @returns {Promise<void>}
 */
async function createUsersCollection(db: Database) {
  const collection = await db.createCollection(CollectionEnum.Users);
  await createIndex('vkUserId', 'vkUserId', {unique: true}, collection);
}

/**
 * Creates required structure for database (collection, indexes, etc.)
 * @param {Database} db
 * @returns {Promise<void>}
 */
export async function prepareDb(db: Database) {
  await createUsersCollection(db);
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
