import resolvers from "./resolvers";
import { server } from "./server";
import { createTestClient } from "apollo-server-testing";
import driver from "./neo";
import { ApolloServerBase } from "apollo-server-core";

// STEP ONE
// import server - done
// use test client to create integration tests
//put data into db

// STEP TWO
// work out how to connect to test database
// work out how to clean database
// work out how to spin up test database

describe("resolvers", () => {
  describe("hello", () => {
    it("returns hello topo", () => {
      expect(resolvers.Query.hello()).toEqual("Hello, Topo");
    });
  });

  describe("getPlatfroms", () => {
    const name = "Test Platform";
    const domainName = "Test Domain";
    it("should return all platforms", async () => {
      const session = driver.session();
      const { query } = createTestClient(server);
      try {
        await session.run(
          `CREATE (platform:Platform { name: $name })
          CREATE (domain:Domain { name: $domainName })
          CREATE (platform)-[:HAS]->(domain)
        `,
          {
            name,
            domainName
          }
        );
      } finally {
        session.close();
      }

      const QUERY = `
      query {
        platforms{
          name,
          domains {
            name
          }
        }
      }
      `;

      const res = await query({
        query: QUERY
      });

      expect(res.data).toBeDefined();
      expect(res.data ? res.data.platforms : []).toContainEqual({
        domains: [
          {
            name: "Test Domain"
          }
        ],
        name: "Test Platform"
      });
    });

    afterEach(async () => {
      const session = driver.session();

      try {
        await session.run(
          "MATCH (platform:Platform { name: $name }) DETACH DELETE platform",
          { name }
        );
        await session.run(
          "MATCH (domain:Domain { name: $domainName }) DETACH DELETE domain",
          { domainName }
        );
      } finally {
        session.close();
      }
      driver.close();
    });
  });
});
