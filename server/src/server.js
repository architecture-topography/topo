const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
type Query {
  hello: String!
}
`;

const resolvers = {
  Query: {
    hello: () => 'Hello, Topo',
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = { server };
