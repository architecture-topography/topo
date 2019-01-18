const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers").default;
const { importSchema } = require("graphql-import");
const queries = require("./queries");
const { driver, testDriver } = require("./neo");

const typeDefs = importSchema(require.resolve("./schema.graphql"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ queries: queries(driver) })
});

const testServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ queries: queries(testDriver) })
});

module.exports = { server, testServer };
