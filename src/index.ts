import {runHttpServer} from './http/runHttpServer';
import {fork, isMaster, Worker} from 'cluster';
import os from 'os';
import {config} from './config';
import {init as initDb} from './db/init';
import {VKAPI, VKAPIMaster, VKAPISlave} from 'vkontakte-api';
import {yellow} from 'chalk';

/**
 * Initializes project
 * @returns {Promise<void>}
 */
const init = async () => {
  const {
    env, vkAppServiceKey, vkApiRequestsPerSecond, port, root, staticBaseUrl,
  } = config;
  const isDev = env === 'development';
  const vkAPI = isDev || isMaster
    ? new VKAPI({
      requestsPerSecond: vkApiRequestsPerSecond,
      accessToken: vkAppServiceKey,
    })
    : new VKAPISlave();

  if (isDev) {
    // Output config
    console.log(yellow('Config is fine:'), config);

    // Recreate structure of database
    await initDb();

    // Run HTTP server
    return runHttpServer({port, root, isDev, vkAPI, staticBaseUrl});
  }

  if (isMaster) {
    // Output config
    console.log(yellow('Config is fine:'), config);

    // Recreate structure of database
    await initDb();

    // Create maximum count of clusters OS supports
    const cpuCount = os.cpus().length;
    const workers: Worker[] = [];

    for (let i = 0; i < cpuCount; i++) {
      workers.push(fork());
    }

    // In master we do create VKAPI instance, because slaves should
    // communicate with single its instance, which is VKAPIMaster
    new VKAPIMaster({threads: workers, client: vkAPI});
  } else {
    return runHttpServer({port, root, isDev, vkAPI, staticBaseUrl});
  }
};

init().catch(e => {
  console.error(e);
  process.exit(1);
});
