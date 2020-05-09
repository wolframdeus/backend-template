import {Config, EnvironmentType} from './http/types';

const port = Number(process.env.PORT);
const root = process.env.ROOT || '/';
const dbHost = process.env.DB_HOST;
const dbPort = Number(process.env.DB_PORT);
const dbName = process.env.DB_NAME;
const env = process.env.ENVIRONMENT || 'production';
const staticBaseUrl = process.env.STATIC_BASE_URL || '/static';
const genDirPath = process.env.GEN_DIR_PATH;
const publicBaseUrl = process.env.PUBLIC_BASE_URL;
const vkAppSecretKey = process.env.VK_APP_SECRET_KEY;
const vkApiRequestsPerSecond = process.env.VK_API_REQUESTS_PER_SECOND
  ? Number(process.env.VK_API_REQUESTS_PER_SECOND)
  : 3;
const vkAppServiceKey = process.env.VK_APP_SERVICE_KEY;

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
  return `Environment variable ${envName} not passed or has incorrect format`;
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
if (!isEnvironmentType(env)) {
  throw new Error(getErrorText('ENVIRONMENT'));
}
if (!staticBaseUrl) {
  throw new Error(getErrorText('STATIC_BASE_URL'));
}
if (!genDirPath) {
  throw new Error(getErrorText('GEN_DIR_PATH'));
}
if (!publicBaseUrl) {
  throw new Error(getErrorText('PUBLIC_BASE_URL'));
}
if (!vkAppServiceKey) {
  throw new Error(getErrorText('VK_APP_SERVICE_KEY'));
}
if (Number.isNaN(vkApiRequestsPerSecond)) {
  throw new Error(getErrorText('VK_API_REQUESTS_PER_SECOND'));
}
if (!vkAppSecretKey) {
  throw new Error(getErrorText('VK_APP_SECRET_KEY'));
}

export const config: Config = {
  port,
  root,
  dbHost,
  dbPort,
  dbName,
  env,
  staticBaseUrl,
  genDirPath,
  publicBaseUrl,
  vkAppSecretKey,
  vkAppServiceKey,
  vkApiRequestsPerSecond,
};
