import { ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";
import { createTestClient } from "apollo-server-testing";

const typeDefs = importSchema(require.resolve("./schema.graphql"));

describe("Schema definitions", () => {
  let server: ApolloServer;
  let query: any;

  beforeAll(() => {
    server = new ApolloServer({
      typeDefs,
      mocks: true
    });
    query = createTestClient(server).query;
  });

  it("Accepts platform query", async () => {
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
