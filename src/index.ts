import {runHttpServer} from './http/runHttpServer';
import {fork, isMaster, Worker} from 'cluster';
import os from 'os';
import {config} from './config';
import {init as initDb} from './db/init';
import {VKAPI, VKAPIMaster} from 'vkontakte-api';
import {yellow} from 'chalk';

(async () => {
  const {env, vkAppServiceKey, vkApiRequestsPerSecond} = config;

  if (env === 'development') {
    // Output config
    console.log(yellow('Config is fine:'), config);

    // Recreate structure of database
    await initDb();
    return runHttpServer({singleThreadMode: true, config});
  }

  if (isMaster) {
    // Output config
    console.log(yellow('Config is fine:'), config);

    // Recreate structure of database
    await initDb();

    // Create maximum count of clusters process supports
    const cpuCount = os.cpus().length;
    const workers: Worker[] = [];

    for (let i = 0; i < cpuCount; i++) {
      workers.push(fork());
    }

    // In master we do create VKAPI instance, because slaves should
    // communicate with single its instance
    new VKAPIMaster({
      threads: workers,
      client: new VKAPI({
        requestsPerSecond: vkApiRequestsPerSecond,
        accessToken: vkAppServiceKey,
      }),
    });
  } else {
    return runHttpServer({singleThreadMode: false, config});
  }
})();
