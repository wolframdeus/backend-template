import {createDb, createMongoClient, prepareDb} from './utils';
import {Collection} from './types';

/**
 * Инициализирует базу данных
 * @returns {Promise<void>}
 */
async function init() {
  const client = createMongoClient();
  await client.connect();
  const db = createDb(client);

  // Создаем все необходимые коллекции
  // await Promise.all(
  //   Object.values(Collection).map(name => db.createCollection(name)),
  // );

  // Создаем все необходимые индексы
  await prepareDb(db);
}

export default init;
