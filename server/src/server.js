const { ApolloServer } = require("apollo-server");
const resolvers = require("./resolvers").default;
const { importSchema } = require("graphql-import");

const typeDefs = importSchema(require.resolve("./schema.graphql"));

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = { server };
