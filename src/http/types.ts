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
  /**
   * States if http server is ran in single thread mode
   */
  singleThreadMode: boolean;

  /**
   * Env config
   */
  config: Config;
}
