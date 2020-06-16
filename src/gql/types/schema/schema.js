"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var schema = "\"Project common user\"\ntype User {\n  \"User id\"\n  id: ID!\n  \"VKontakte unique identifier\"\n  vkUserId: Int!\n  \"Full user name\"\n  name: String!\n}\n\ntype Query {\n  \"Returns current user information\"\n  user: User\n  \"Returns user by specified user id\"\n  userById(\n    \"Used unique identifier\"\n    userId: ID!\n  ): User!\n}\n\ntype Mutation {\n  \"Registers user. Returns his identifier\"\n  register: Int!\n}\n\n\ntype Subscription {\n  \"Subscribes for current user information updates\"\n  user: User\n}\n";
exports.default = schema;
