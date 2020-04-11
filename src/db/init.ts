import {createDb, createMongoClient, prepareDb} from './utils';

/**
 * Initializes database
 * @returns {Promise<void>}
 */
export async function init() {
  const client = createMongoClient();
  await client.connect();
  const db = createDb(client);

  await prepareDb(db);
}
