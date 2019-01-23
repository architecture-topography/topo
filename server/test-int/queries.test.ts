import { Platform } from "../src/domain";
import { findPlatforms } from "../src/queries";
import { clearDb } from "./helpers/testHelper";
import { createTestPlatformAndDomain } from "./helpers/domainHelper";

describe("queries", () => {
  describe("findPlatforms with Domains", () => {
    const platformName = "Test Platform";
    const domainName = "Test Domain";
    const capabilityName = "Test Capability";

    it("returns all the platforms", async () => {
      await createTestPlatformAndDomain(
        platformName,
        domainName,
        capabilityName
      );
      const platforms = await findPlatforms();

      expect(
        platforms.map((platform: Platform) => platform.name)
      ).toContainEqual(platformName);
      const testPlatform = platforms.find(
        (platform: Platform) => platform.name === platformName
      );
      expect(testPlatform ? testPlatform.domains[0].name : "").toEqual(
        domainName
      );
      expect(
        testPlatform ? testPlatform.domains[0].capabilities[0].name : ""
      ).toEqual(capabilityName);
    });

    afterEach(clearDb);
  });
});
