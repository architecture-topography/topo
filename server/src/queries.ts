/**
 * Copyright 2018 Thoughtworks Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as Neo4j from "neo4j-driver";
import { values, groupBy, uniqBy } from "lodash";
import { driver } from "./neo";
import { Platform } from "./domain";
import { applyResultTransforms } from "graphql-tools/dist/transforms/transforms";

const remapUidToId = (properties: any) => {
  const newProperties = { ...properties };
  newProperties.id = properties.uid;
  delete newProperties.uid;
  return newProperties;
};

export const createPlatform = async (
  name: String,
  uid: String
): Promise<Platform> => {
  const session = driver.session();
  try {
    const result = await session.run(
      `CREATE (Node: Platform: TopoNode {name: $name, uid: $uid}) RETURN Node`,
      { name, uid }
    );
    return result.records[0].get("Node").properties;
  } finally {
    session.close();
  }
};

export const findPlatforms = async (): Promise<Platform[]> => {
  const session = driver.session();

  const getProperties = (record: Neo4j.v1.Record, name: string) => {
    const properties = record.get(name).properties;
    const mappedProperties = remapUidToId(properties);
    return mappedProperties;
  };

  try {
    const result = await session.run(
      "MATCH (platform:Platform)-[:HAS]->(domain:Domain)-[:DOES]->(capability:Capability) RETURN platform,domain,capability"
    );

    const groupedRecordsByPlatform: any = groupBy(
      result.records,
      (record: Neo4j.v1.Record) => {
        return record.get("platform").properties.uid;
      }
    );

    const groupedRecordsByDomain: any = groupBy(
      result.records,
      (record: Neo4j.v1.Record) => {
        return record.get("domain").properties.uid;
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
  capabilityId: string
): Promise<Platform[]> => {
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH(capability: Capability) - [: SUPPORTEDBY] -> (system: System) WHERE (capability.uid = "${capabilityId}") RETURN capability, system`
    );

    return result.records.map(record => {
      return remapUidToId(record.get("system").properties);
    });
  } catch (error) {
    console.log("error", error);
    return [];
  } finally {
    session.close();
  }
};

export const findTechnologiesBySystemId = async (
  systemId: string
): Promise<Platform[]> => {
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH(system:System) - [:BUILTIN] -> (technology: Technology) WHERE (system.uid = "${systemId}") RETURN system, technology`
    );

    return result.records.map(record => {
      return remapUidToId(record.get("technology").properties);
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
  findSystemsByCapabilityId,
  findTechnologiesBySystemId,
  createPlatform
};
