import {runHttpServer} from './http/runHttpServer';
import {fork, isMaster, Worker} from 'cluster';
import os from 'os';
import {config} from './config';
import {createDb, createMongoClient, initDatabase} from './db';
import {VKAPI, VKAPIMaster, VKAPISlave} from 'vkontakte-api';
import {yellow} from 'chalk';
import {Config} from './http/types';

/**
 * Initializes dev variant of server
 * @returns {Promise<void>}
 */
async function initDev(config: Config) {
  const {
    port, root, dbHost, dbPort, dbName, vkAppServiceKey, vkApiRequestsPerSecond,
    staticBaseUrl,
  } = config;

  // Create structure of database
  const db = await initDatabase(dbHost, dbPort, dbName);

  // Run HTTP server
  return runHttpServer({
    port,
    root,
    isDev: true,
    vkAPI: new VKAPI({
      requestsPerSecond: vkApiRequestsPerSecond,
      accessToken: vkAppServiceKey,
    }),
    staticBaseUrl,
    db,
  });
}

/**
 * Application main entry function. Initializes clusters, HTTP and Apollo
 * server
 * @returns {Promise<void>}
 */
async function init(config: Config) {
  // Output config
  console.log(yellow('Config:'), config);

  if (config.env === 'development') {
    return initDev(config);
  }

  const {
    dbName, dbPort, dbHost, vkAppServiceKey, vkApiRequestsPerSecond, port, root,
    staticBaseUrl,
  } = config;
  const vkAPI = isMaster
    ? new VKAPI({
      requestsPerSecond: vkApiRequestsPerSecond,
      accessToken: vkAppServiceKey,
    })
    : new VKAPISlave();

  if (isMaster) {
    // Output config
    console.log(yellow('Config is fine:'), config);

    // Create structure of database
    await initDatabase(dbHost, dbPort, dbName);

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
    const client = createMongoClient(dbHost, dbPort);
    await client.connect();

    // In slaves, we do create HTTP server
    return runHttpServer({
      port,
      root,
      isDev: false,
      vkAPI,
      staticBaseUrl,
      db: createDb(client, dbName),
    });
  }
}

init(config).catch(e => {
  console.error(e);
  process.exit(1);
});
