import * as qs from 'querystring';
import * as crypto from 'crypto';

/**
 * Result of sign validation
 */
export type SignValidationResult =
  { valid: false }
  | { valid: true; userId: number };

/**
 * Checks if sign sent along with VK Mini Apps parameters is valid
 * @param queryString
 * @param encryptKey
 */
export function isSignValid(
  queryString: string,
  encryptKey: string,
): SignValidationResult {
  const query = qs.parse(queryString);
  const ordered = Object.keys(query)
    .sort()
    .reduce<Record<string, string>>((acc, key) => {
      const value = query[key];
      // Берем только ключи начинающиеся с vk_
      if (key.slice(0, 3) === 'vk_' && typeof value === 'string') {
        acc[key] = value;
      }
      return acc;
    }, {});

  const stringParams = qs.stringify(ordered);
  const paramsHash = crypto
    .createHmac('sha256', encryptKey)
    .update(stringParams)
    .digest()
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=$/, '');

  if (paramsHash !== query.sign) {
    return {valid: false};
  }
  return {valid: true, userId: Number(query.vk_user_id)};
}
