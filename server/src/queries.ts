import * as Neo4j from "neo4j-driver";
import { values, groupBy, uniqBy } from "lodash";
import { driver } from "./neo";
import { Platform } from "./domain";
import { applyResultTransforms } from "graphql-tools/dist/transforms/transforms";

export const findPlatforms = async (): Promise<Platform[]> => {
  const session = driver.session();

  const getProperties = (record: Neo4j.v1.Record, name: string) => {
    const properties = record.get(name).properties;
    const id = record.get(name).identity.toString();
    return { ...properties, id };
  };

  try {
    const result = await session.run(
      "MATCH (platform:Platform)-[:HAS]->(domain:Domain)-[:DOES]->(capability:Capability) RETURN platform,domain,capability"
    );

    const groupedRecordsByPlatform: any = groupBy(
      result.records,
      (record: Neo4j.v1.Record) => {
        const id = record.get("platform").identity.toString();
        return id;
      }
    );

    const groupedRecordsByDomain: any = groupBy(
      result.records,
      (record: Neo4j.v1.Record) => {
        const id = record.get("domain").identity.toString();
        return id;
      }
    );

    const platforms = values(groupedRecordsByPlatform).map(
      (records: Neo4j.v1.Record[]) => {
        const platform = getProperties(records[0], "platform");
        const domains = uniqBy(
          records.map(edge => {
            return { ...getProperties(edge, "domain") };
          }),
          "id"
        );

        const domainsWithCapabilities = domains.map(domain => {
          const capabilities = groupedRecordsByDomain[domain.id].map(
            (record: Neo4j.v1.Record) => {
              return { ...getProperties(record, "capability") };
            }
          );
          return { ...domain, capabilities };
        });

        return {
          ...platform,
          domains: domainsWithCapabilities
        };
      }
    );

    return platforms;
  } finally {
    session.close();
  }
};

export const findSystemsByCapabilityId = async (
  capabilityId: String
): Promise<Platform[]> => {
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH(capability: Capability) - [: SUPPORTEDBY] -> (system: System) WHERE capability.id = $capabilityId RETURN capability, system`,
      { capabilityId }
    );
    return result.records.map(record => {
      return record.get("system").properties;
    });
  } catch (error) {
    console.log("error", error);
    return [];
  } finally {
    session.close();
  }
};

export default {
  findPlatforms,
  findSystemsByCapabilityId
};
