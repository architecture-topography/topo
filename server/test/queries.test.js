const { driver } = require("../src/neo");
const { findPlatforms } = require("../src/queries")(driver);
import { clearDb } from "./helpers/testHelper";

describe("queries", () => {
  describe("findPlatforms with Domains", () => {
    const name = "Test Platform";
    const domainName = "Test Domain";
    it("returns all the platforms", async () => {
      const session = driver.session();

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

      const platforms = await findPlatforms();

      expect(platforms.map(platform => platform.name)).toContainEqual(name);
      const testPlatform = platforms.find(platform => platform.name === name);
      expect(testPlatform.domains.length).toBe(1);
    });

    afterEach(clearDb);
  });
});
