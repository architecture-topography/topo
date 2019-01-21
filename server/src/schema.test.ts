import { ApolloServer, gql } from "apollo-server";
import { importSchema } from "graphql-import";
import { createTestClient } from "apollo-server-testing";

const typeDefs = importSchema(require.resolve("./schema.graphql"));

describe("Schema definitions", () => {
  let server: ApolloServer;
  let query;

  beforeAll(() => {
    server = new ApolloServer({
      typeDefs,
      mocks: true
    });
    query = createTestClient(server);
  });

  it("Accepts platform query", async () => {
    const { query } = createTestClient(server);

    const QUERY = `
    query {
      platforms{
        name,
        id
      }
    }
    `;

    const res = await query({
      query: QUERY
    });
    expect(res.errors).toBeUndefined();
  });

  it("Accepts platform query with embedded domains", async () => {
    const { query } = createTestClient(server);

    const QUERY = `
    query {
      platforms{
        name,
        id,
        domains {
          id,
          name
        }
      }
    }
    `;

    const res = await query({
      query: QUERY
    });
    expect(res.errors).toBeUndefined();
  });
});
