const driver = require("./neo");
const { findPlatforms } = require("./queries");

describe("queries", () => {
  describe("findPlatforms", () => {
    const name = "Test Platform";
    it("returns all the platforms", async () => {
      const session = driver.session();

      try {
        await session.run("CREATE (platform:Platform { name: $name })", {
          name
        });
      } finally {
        session.close();
      }

      const platforms = await findPlatforms();

      expect(platforms).toContainEqual({ name });
    });
  });

  afterEach(async () => {
    const session = driver.session();

    try {
      await session.run(
        "MATCH (platform:Platform { name: $name }) DELETE platform",
        { name }
      );
    } finally {
      session.close();
    }
    driver.close();
  });
});
