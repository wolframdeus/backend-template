import {User} from './entities';

/**
 * List of collections in a project
 */
export enum CollectionEnum {
  Users = 'users'
}

/**
 * Description of data types in each collection. Key is a value from Collection
 * enum and value is a description of value inside a collection
 */
export interface DbSchema {
  [CollectionEnum.Users]: User;
}

export type DbSchemaKey = keyof DbSchema;
