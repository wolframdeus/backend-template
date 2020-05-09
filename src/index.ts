import {runHttpServer} from './http/runHttpServer';
import {fork, isMaster} from 'cluster';
import os from 'os';
import {config} from './config';
import {init as initDb} from './db/init';

(async () => {
  if (config.env !== 'production') {
    // Recreate structure of database
    await initDb();
    return runHttpServer();
  }

  if (isMaster) {
    // Recreate structure of database
    await initDb();

    // Create maximum count of clusters process supports
    const cpuCount = os.cpus().length;

    for (let i = 0; i < cpuCount; i++) {
      fork();
    }
  } else {
    return runHttpServer();
  }
})();
