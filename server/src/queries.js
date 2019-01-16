const driver = require("./neo");

const findPlatforms = async () => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (platform:Platform) RETURN platform"
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
