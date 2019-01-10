const { ApolloServer, gql } = require('apollo-server');
const resolvers = require('./resolvers');

const typeDefs = gql`
type Query {
  hello: String!
}
`;

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = { server };
