import resolvers from "../../src/resolvers";
import server from "../../src/server";
import { createTestClient } from "apollo-server-testing";
import { clearDb } from "../helpers/testHelper";
import { findPlatform, createTestPlatform } from "../helpers/domainHelper";

describe("Mutation", () => {
  afterEach(clearDb);

  describe("createPlatform", () => {
    it("creates platform in neo db", async () => {
      const platformName = "Test Platform";
      const id = "123";

      const { query } = createTestClient(server);

      const MUTATION = `
      mutation {
        createPlatform(
          name: "${platformName}",
          id: "${id}"
        )
        {
          name
        	id
        }
      }
      `;
      await query({ mutation: MUTATION });
      const res = await findPlatform({ id });
      expect(res.records[0].get("platform").properties).toEqual({
        name: `${platformName}`,
        uid: `${id}`
      });
    });
  });
});
