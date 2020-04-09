/**
 * Тип среды запуска
 */
export type EnvironmentType = 'production' | 'development';

/**
 * Серверный конфиг
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

/**
 * Результат проверки подписи
 */
export type SignValidationResult =
  { valid: false }
  | ({ valid: true; userId: number });
