import resolvers from "../src/resolvers";
import server from "../src/server";
import { createTestClient } from "apollo-server-testing";
import { clearDb } from "./helpers/testHelper";
import {
  createTestPlatformAndDomain,
  createSystemWithCapability
} from "./helpers/domainHelper";

describe("resolvers", () => {
  describe("hello", () => {
    it("returns hello topo", () => {
      expect(resolvers.Query.hello()).toEqual("Hello, Topo");
    });
  });

  describe("getSystems", () => {
    it("Should return systems for a particular capability", async () => {
      const capabilityId = "capability-001";
      const { query } = createTestClient(server);

      const QUERY = `
      query {
        systems(capabilityId: "${capabilityId}"){
          name
        }
      }
      `;

      await createSystemWithCapability({ name: "system cool", capabilityId });

      const res = await query({ query: QUERY });
      expect(res.data).toBeDefined();
      expect(res.data ? res.data.systems : []).toContainEqual({
        name: "system cool"
      });
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
