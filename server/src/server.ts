import { ApolloServer } from "apollo-server";
const resolvers = require("./resolvers").default;
import { importSchema } from "graphql-import";
import queries from "./queries";

const typeDefs = importSchema(require.resolve("./schema.graphql"));

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ queries })
});
