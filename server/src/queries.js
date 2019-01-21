import * as _ from "lodash";

const queries = driver => ({
  findPlatforms: async () => {
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

      const groupedRecordsByPlatform = _.groupBy(result.records, record => {
        const id = record.get("platform").identity.toString();
        return id;
      });

      const platforms = _.map(groupedRecordsByPlatform, records => {
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
  }
});

module.exports = queries;
