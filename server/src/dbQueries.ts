/*
 * Copyright 2018-2019 Thoughtworks Inc. All rights reserved
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

import * as Neo4j from 'neo4j-driver';
import { driver } from './neo';
import { ICapability, IDomain, IPlatform } from './types';

const remapUidToId = (properties: any) => {
  const newProperties = { ...properties };
  newProperties.id = properties.uid;
  delete newProperties.uid;
  return newProperties;
};

const getProperties = (record: Neo4j.v1.Record, name: string) => {
  const properties = record.get(name).properties;
  const mappedProperties = remapUidToId(properties);
  return mappedProperties;
};

export const createPlatform = async (
  name: string,
  id: string
): Promise<IPlatform> => {
  const session = driver.session();
  try {
    const result = await session.run(
      `CREATE (Node: Platform: TopoNode {name: $name, uid: $id}) RETURN Node`,
      { name, id }
    );
    return getProperties(result.records[0], 'Node');
  } finally {
    session.close();
  }
};

export const createLine = async (nodeAUid: string, nodeBUid: string) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `
      MATCH (a),(b)
      WHERE a.uid = $nodeAUid AND b.uid = $nodeBUid
      CREATE (a)-[r:CONTAINS]->(b)
      RETURN r
      `,
      { nodeAUid, nodeBUid }
    );
    if (result.records.length === 0) {
      throw new Error('Could not create line');
    }
    return result;
  } finally {
    session.close();
  }
};

export const createDomain = async (
  name: string,
  id: string,
  parentId: string
): Promise<IPlatform> => {
  const session = driver.session();
  try {
    const result = await session.run(
      `CREATE (Node: Domain: TopoNode {name: $name, uid: $id}) RETURN Node`,
      { name, id }
    );
    const properties = result.records[0].get('Node').properties;
    return properties;
  } finally {
    session.close();
  }
};

export const createCapability = async (
  name: string,
  id: string,
  parentId: string
): Promise<IPlatform> => {
  const session = driver.session();
  try {
    const result = await session.run(
      `CREATE (Node: Capability: TopoNode {name: $name, uid: $id}) RETURN Node`,
      { name, id }
    );
    const properties = result.records[0].get('Node').properties;
    return properties;
  } finally {
    session.close();
  }
};

const runQueryAndReturnProperties = async (
  nodeName: string,
  queryString: string,
  queryParams: object = {}
) => {
  const session = driver.session();
  try {
    const result = await session.run(queryString, queryParams);
    return result.records.length
      ? result.records.map(record => record.get(nodeName).properties)
      : [];
  } catch (error) {
    console.error('Error running query: ', error);
    return [];
  } finally {
    session.close();
  }
};

const findChildren = async (
  parentType: string,
  uid: string
): Promise<any[]> => {
  return runQueryAndReturnProperties(
    'node',
    `MATCH (p:${parentType})-[]->(node) where p.uid = $uid AND NOT node:System return p, node`,
    { uid }
  );
};

export const findPlatforms = async (): Promise<IPlatform[]> => {
  return runQueryAndReturnProperties(
    'platform',
    'MATCH (platform:Platform) RETURN platform'
  );
};

export const findDomainsByPlatformId = async (
  platformUid: string
): Promise<IDomain[]> => {
  return findChildren('Platform', platformUid);
};

export const findCapabilitiesByDomainId = async (
  domainUid: string
): Promise<ICapability[]> => {
  return findChildren('Domain', domainUid);
};

export const findSystemsByCapabilityId = (
  capabilityUid: string
): Promise<IPlatform[]> => {
  return runQueryAndReturnProperties(
    'system',
    `MATCH(capability: Capability) - [] -> (system: System) WHERE (capability.uid = $capabilityUid) RETURN system`,
    { capabilityUid }
  );
};

export const findTechnologiesBySystemId = async (
  systemId: string
): Promise<IPlatform[]> => {
  const session = driver.session();

  try {
    const result = await session.run(
      `MATCH(system:System) - [:BUILTIN] -> (technology: Technology) WHERE (system.uid = "${systemId}") RETURN system, technology`
    );

    return result.records.map(record => {
      return remapUidToId(record.get('technology').properties);
    });
  } catch (error) {
    console.log('error', error);
    return [];
  } finally {
    session.close();
  }
};
export default {
  createCapability,
  createDomain,
  createLine,
  createPlatform,
  findCapabilitiesByDomainId,
  findDomainsByPlatformId,
  findPlatforms,
  findSystemsByCapabilityId,
  findTechnologiesBySystemId,
};
