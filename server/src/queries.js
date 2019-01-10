const driver = require("./neo");

const findPlatforms = async () => {
  const session = driver.session();

  try {
    const result = await session.run(
      "MATCH (platform:Platform) RETURN platform"
    );

    return result.records.map(x => x.get("platform").properties);
  } finally {
    session.close();
  }
};

module.exports = {
  findPlatforms
};
