import resolvers from "../src/resolvers";
import { server } from "../src/server";
import { createTestClient } from "apollo-server-testing";
import { driver } from "../src/neo";
import { clearDb } from "../src/testHelper";

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
    afterEach(clearDb);
  });
});
