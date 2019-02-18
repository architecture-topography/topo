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
      const uid = "123";

      const { query } = createTestClient(server);

      const MUTATION = `
      mutation {
        createPlatform(
          name: "${platformName}",
          uid: "${uid}"
        )
        {
          name
        	uid
        }
      }
      `;
      await query({ mutation: MUTATION });
      const res = await findPlatform({ uid });
      expect(res.records[0].get("platform").properties).toEqual({
        name: `${platformName}`,
        uid: `${uid}`
      });
    });
  });
});
