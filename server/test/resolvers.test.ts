import resolvers from "../src/resolvers";
import { server } from "../src/server";
import { createTestClient } from "apollo-server-testing";
import { clearDb } from "./testHelper";
import { createTestPlatformAndDomain } from "./domainHelper";

describe("resolvers", () => {
  describe("hello", () => {
    it("returns hello topo", () => {
      expect(resolvers.Query.hello()).toEqual("Hello, Topo");
    });
  });

  describe("getPlatfroms", () => {
    it("should return all platforms", async () => {
      const { query } = createTestClient(server);
      await createTestPlatformAndDomain();

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
