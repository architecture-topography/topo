const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers").default;
const { importSchema } = require("graphql-import");
const queries = require("./queries");
const { driver } = require("./neo");

const typeDefs = importSchema(require.resolve("./schema.graphql"));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({ queries: queries(driver) })
});

module.exports = { server };
