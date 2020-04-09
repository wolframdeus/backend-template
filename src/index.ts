import {runHttpServer} from './http/runHttpServer';
import {fork, isMaster} from 'cluster';
import os from 'os';
import config from './config';
import initDb from './db/init';

(async () => {
  if (config.env !== 'production') {
    // Восстанавливаем структуру БД
    await initDb();
    return runHttpServer();
  }

  if (isMaster) {
    // Восстанавливаем структуру БД
    await initDb();

    // В продакшене запускаем максимальное кол-во кластеров сколько позволяет
    // процессор
    const cpuCount = os.cpus().length;

    for (let i = 0; i < cpuCount; i++) {
      fork();
    }
  } else {
    return runHttpServer();
  }
})();
