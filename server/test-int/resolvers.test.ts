import resolvers from "../src/resolvers";
import server from "../src/server";
import { createTestClient } from "apollo-server-testing";
import { clearDb } from "./helpers/testHelper";
import { createTestPlatformAndDomain } from "./helpers/domainHelper";

describe("resolvers", () => {
  describe("hello", () => {
    it("returns hello topo", () => {
      expect(resolvers.Query.hello()).toEqual("Hello, Topo");
    });
  });

  describe("getPlatfroms", () => {
    it("should return all platforms", async () => {
      const platformName = "Test Platform";
      const domainName = "Test Domain";
      const capabilityName = "Test Capability";
      const { query } = createTestClient(server);

      const QUERY = `
      query {
        platforms{
          name,
          domains {
            name,
            capabilities {
              name
            }
          }
        }
      }
      `;

      await createTestPlatformAndDomain(
        platformName,
        domainName,
        capabilityName
      );
      const res = await query({
        query: QUERY
      });
      expect(res.data).toBeDefined();
      expect(res.data ? res.data.platforms : []).toContainEqual({
        name: "Test Platform",
        domains: [
          {
            name: "Test Domain",
            capabilities: [
              {
                name: "Test Capability"
              }
            ]
          }
        ]
      });
    });
    afterEach(clearDb);
  });
});
