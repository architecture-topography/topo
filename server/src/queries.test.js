const { driver } = require("./neo");
const { findPlatforms } = require("./queries")(driver);

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

    afterEach(async () => {
      const session = testDriver.session();

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
      testDriver.close();
    });
  });
});
