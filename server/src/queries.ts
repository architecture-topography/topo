import * as Neo4j from "neo4j-driver";
import { driver } from "./neo";
import { Platform } from "./domain";
import { values, groupBy } from "lodash";

export const findPlatforms = async (): Promise<Platform[]> => {
  const session = driver.session();

  const getProperties = (record: Neo4j.v1.Record, name: string) => {
    const properties = record.get(name).properties;
    const id = record.get(name).identity.toString();
    return { ...properties, id };
  };

  try {
    const result = await session.run(
      "MATCH (platform:Platform)-[:HAS]->(domain:Domain) RETURN platform,domain"
    );

    const groupedRecordsByPlatform: any = groupBy(
      result.records,
      (record: Neo4j.v1.Record) => {
        const id = record.get("platform").identity.toString();
        return id;
      }
    );

    const platforms = values(groupedRecordsByPlatform).map(
      (records: Neo4j.v1.Record[]) => {
        const platform = getProperties(records[0], "platform");
        const domains = records.map(edge => {
          return { ...getProperties(edge, "domain") };
        });
        return {
          ...platform,
          domains
        };
      }
    );
    return platforms;
  } finally {
    session.close();
  }
};

export default {
  findPlatforms
};
