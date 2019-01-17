const driver = require("./neo");
const { groupBy, map } = require("lodash");

const findPlatforms = async () => {
  const session = driver.session();

  const getProperties = (record, name) => {
    const properties = record.get(name).properties;
    const id = record.get(name).identity.toString();
    return { ...properties, id };
  };

  try {
    const result = await session.run(
      "MATCH (platform:Platform)-[:HAS]->(domain:Domain) RETURN platform,domain"
    );

    const groupedRecordsByPlatform = groupBy(result.records, record => {
      const id = record.get("platform").identity.toString();
      return id;
    });

    const platforms = map(groupedRecordsByPlatform, records => {
      const platform = getProperties(records[0], "platform");
      const domains = records.map(edge => {
        return { ...getProperties(edge, "domain") };
      });
      return {
        ...platform,
        domains
      };
    });

    return platforms;
  } finally {
    session.close();
  }
};

module.exports = {
  findPlatforms
};
