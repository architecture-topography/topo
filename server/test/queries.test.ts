import { Platform } from "../src/domain";
const { driver } = require("../src/neo");
const { findPlatforms } = require("../src/queries")(driver);
const { clearDb } = require("./helpers/testHelper");
const { createTestPlatformAndDomain } = require("./helpers/domainHelper");

describe("queries", () => {
  describe("findPlatforms with Domains", () => {
    const platformName = "Test Platform";
    const domainName = "Test Domain";
    it("returns all the platforms", async () => {
      await createTestPlatformAndDomain(platformName, domainName);
      const platforms = await findPlatforms();

      expect(
        platforms.map((platform: Platform) => platform.name)
      ).toContainEqual(platformName);
      const testPlatform = platforms.find(
        (platform: Platform) => platform.name === platformName
      );
      expect(testPlatform.domains.length).toBe(1);
    });

    afterEach(clearDb);
  });
});
