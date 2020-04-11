/**
 * Actually is MongoDB's ObjectId. If you want to use generated _id in your
 * code, you have to extend your entity with CollectionEntity. We have to use
 * "any" because mongodb's types require it
 */
type ReplacedObjectId = any;

/**
 * Represents default collection entity
 */
export interface CollectionEntity {
  _id: ReplacedObjectId;
}
