import {Collection, CollectionCreateOptions, Db} from 'mongodb';
import {DbSchema, DbSchemaKey} from './types';

/**
 * Class which is a wrapper around mongo db
 */
export class Database {
  private readonly db: Db;

  public constructor(db: Db) {
    this.db = db;
  }

  /**
   * Creates new collection
   * @param {Name} name
   * @param options
   * @returns {Promise<Collection<DbSchema[Name]>>}
   */
  public createCollection<Name extends DbSchemaKey>(
    name: Name,
    options?: CollectionCreateOptions,
  ): Promise<Collection<DbSchema[Name]>> {
    return this.db.createCollection<DbSchema[Name]>(String(name), options);
  }

  /**
   * Returns collection
   * @param {Name} name
   * @returns {Collection<DbSchema[Name]>}
   */
  public collection<Name extends DbSchemaKey>(
    name: Name,
  ): Collection<DbSchema[Name]> {
    return this.db.collection<DbSchema[Name]>(String(name));
  }
}
