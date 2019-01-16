const driver = require("./neo");

const findPlatforms = async () => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (platform:Platform) RETURN id(platform) as id, platform"
    );

    return result.records.map(x => {
      const properties = x.get("platform").properties;
      const id = x.get("platform").identity.toString();
      return { ...properties, id };
    });
  } finally {
    session.close();
  }
};

module.exports = {
  findPlatforms
};
