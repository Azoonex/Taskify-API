import { buildSchema } from "type-graphql";
import { BookResolver } from "./modules/book/book.resolver";

export async function createSchema() {
  return await buildSchema({
    resolvers: [BookResolver],
    validate: true,
  });
}
