import {VKAPIInterface} from 'vkontakte-api';

/**
 * Deploy environment type
 */
export type EnvironmentType = 'production' | 'development';

/**
 * Server config
 */
export interface Config {
  port: number;
  root: string;
  dbName: string;
  dbHost: string;
  dbPort: number;
  env: EnvironmentType;
  staticBaseUrl: string;
  genDirPath: string;
  publicBaseUrl: string;
  vkAppSecretKey: string;
  vkApiRequestsPerSecond: number;
  vkAppServiceKey: string;
}

/**
 * Http server run options
 */
export interface RunHttpServerOptions {
  port: number;
  root: string;
  isDev: boolean;
  staticBaseUrl: string;
  vkAPI: VKAPIInterface;
}
