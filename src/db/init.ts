import {createDb, createMongoClient, prepareDb} from './utils';

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
