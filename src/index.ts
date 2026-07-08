import { ApolloServer } from "apollo-server";
import "reflect-metadata";
import { createSchema } from "./schema";

async function bootstrap() {
  const schema = await createSchema();
  const server = new ApolloServer({ schema });
  const { url } = await server.listen(4000);
  console.log(`Server ready at: ${url}`);
}

bootstrap().catch(console.error);
