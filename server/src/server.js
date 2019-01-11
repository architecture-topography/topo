const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers").default;
const { importSchema } = require("graphql-import");
const queries = require("./queries");

const typeDefs = importSchema(require.resolve("./schema.graphql"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ queries })
});

module.exports = { server };
