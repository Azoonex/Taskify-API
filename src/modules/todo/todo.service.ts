import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchema } from "type-graphql";
import { TodoResolver } from "./TodoResolver";

async function bootstrap() {
  const schema = await buildSchema({
    resolvers: [TodoResolver],
    validate: true,
  });

  const server = new ApolloServer({ schema });

  const { url } = await server.listen(4000);
  console.log(`🚀 Server ready at: ${url}`);
}

bootstrap().catch(err => {
  console.error(err);
});
