/**
 * Список коллекций в проекте
 */
export enum Collection {
}

/**
 * Описание типов данных в каждой из коллекций. В качестве ключа значение
 * из Collection, а значения - какое-либо описание сущности
 */
export interface DbSchema {
}

export type DbSchemaKey = keyof DbSchema;
