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
  capabilityId: string
): Promise<Platform[]> => {
  const remapUidToId = (properties: any) => {
    const newProperties = { ...properties };
    newProperties.id = properties.uid;
    delete newProperties.uid;
    return newProperties;
  };

  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH(capability: Capability) - [: SUPPORTEDBY] -> (system: System) WHERE ID(capability) = ${parseInt(
        capabilityId
      )} RETURN capability, system`
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

export default {
  findPlatforms,
  findSystemsByCapabilityId
};
