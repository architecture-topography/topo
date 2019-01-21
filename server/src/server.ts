const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers").default;
const { importSchema } = require("graphql-import");
import queries from "./queries";

const typeDefs = importSchema(require.resolve("./schema.graphql"));

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ queries })
});
