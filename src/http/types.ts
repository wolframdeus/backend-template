/**
 * Deploy environment type
 */
export type EnvironmentType = 'production' | 'development';

/**
 * Server config
 */
export interface Config {
  env: EnvironmentType;
  port: number;
  root: string;
  dbName: string;
  dbHost: string;
  dbPort: number;
  vkAppSecretKey: string;
  staticBaseUrl: string;
}

