const driver = require("./neo");
const { findPlatforms } = require("./queries");

describe("queries", () => {
  describe("findPlatforms", () => {
    it("returns all the platforms", async () => {
      const name = "Test Platform";

      const session = driver.session();

      try {
        await session.run(
          "MATCH (platform:Platform { name: $name }) DELETE platform",
          { name }
        );
        await session.run("CREATE (platform:Platform { name: $name })", {
          name
        });
      } finally {
        session.close();
      }

      const platforms = await findPlatforms();

      expect(platforms).toEqual([{ name }]);
    });
  });

  afterEach(() => {
    driver.close();
  });
});