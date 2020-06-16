export declare namespace Query {
    /**
     * Returns current user information
     */
    type user = User | null;
    /**
     * Returns user by specified user id
     */
    type userById = User;
    namespace userById {
        interface Arguments {
            userId: any;
        }
    }
}
export interface Query {
    user: Query.user;
    userById: Query.userById;
}
/**
 * Project common user
 */
export declare namespace User {
    /**
     * User id
     */
    type id = any;
    /**
     * VKontakte unique identifier
     */
    type vkUserId = number;
    /**
     * Full user name
     */
    type name = string;
}
export interface User {
    id: User.id;
    vkUserId: User.vkUserId;
    name: User.name;
}
export declare namespace Mutation {
    /**
     * Registers user. Returns his identifier
     */
    type register = number;
}
export interface Mutation {
    register: Mutation.register;
}
export declare namespace Subscription {
    /**
     * Subscribes for current user information updates
     */
    type user = User | null;
}
export interface Subscription {
    user: Subscription.user;
}
declare const schema: string;
export default schema;
