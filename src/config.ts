import {Config, EnvironmentType} from './http/types';

const env = process.env.ENVIRONMENT || 'production';
const port = Number(process.env.PORT);
const root = process.env.ROOT;
const dbHost = process.env.DB_HOST;
const dbPort = Number(process.env.DB_PORT);
const dbName = process.env.DB_NAME;
const vkAppSecretKey = process.env.VK_APP_SECRET_KEY;
const staticBaseUrl = process.env.STATIC_BASE_URL;
const cdnBaseUrl = process.env.CDN_BASE_URL;

/**
 * Checks if value is EnvironmentType
 * @param value
 * @returns {value is EnvironmentType}
 */
function isEnvironmentType(value: any): value is EnvironmentType {
  const envs: EnvironmentType[] = ['production', 'development'];
  return envs.includes(value);
}

/**
 * Creates error text about incorrect environment variable
 * @param {string} envName
 * @returns {string}
 */
function getErrorText(envName: string) {
  return `Environment variable ${envName} not passed`;
}

if (!isEnvironmentType(env)) {
  throw new Error(getErrorText('ENVIRONMENT'));
}
if (!cdnBaseUrl) {
  throw new Error(getErrorText('CDN_BASE_URL'));
}
if (!staticBaseUrl) {
  throw new Error(getErrorText('STATIC_BASE_URL'));
}
if (Number.isNaN(port)) {
  throw new Error(getErrorText('PORT'));
}
if (!root) {
  throw new Error(getErrorText('ROOT'));
}
if (!dbHost) {
  throw new Error(getErrorText('DB_HOST'));
}
if (!dbPort) {
  throw new Error(getErrorText('DB_PORT'));
}
if (!dbName) {
  throw new Error(getErrorText('DB_NAME'));
}
if (!vkAppSecretKey) {
  throw new Error(getErrorText('VK_APP_SECRET_KEY'));
}

const config: Config = {
  env, port, root, dbHost, dbPort, dbName, vkAppSecretKey, staticBaseUrl
};

export default config;
