import {Collection, Db} from 'mongodb';
import {DbSchema, DbSchemaKey} from './types';

export class Database {
  private readonly db: Db;

  public constructor(db: Db) {
    this.db = db;
  }

  /**
   * Создает новую коллекцю
   * @param {Name} name
   * @returns {Promise<Collection<DbSchema[Name]>>}
   */
  public createCollection<Name extends DbSchemaKey>(
    name: Name,
  ): Promise<Collection<DbSchema[Name]>> {
    return this.db.createCollection<DbSchema[Name]>(String(name));
  }

  /**
   * Возвращает коллекцию
   * @param {Name} name
   * @returns {Collection<DbSchema[Name]>}
   */
  public collection<Name extends DbSchemaKey>(
    name: Name,
  ): Collection<DbSchema[Name]> {
    return this.db.collection<DbSchema[Name]>(String(name));
  }
}
