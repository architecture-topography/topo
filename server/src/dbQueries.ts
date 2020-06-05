/*
 * Copyright 2018-2020 Thoughtworks Inc. All rights reserved
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

import { driver } from './neo';
import { IBox, ICapability, IDomain, IPlatform, ISystem } from './types';

export const createLine = async (nodeAUid: string, nodeBUid: string) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `
      MATCH (a),(b)
      WHERE a.uid = $nodeAUid AND b.uid = $nodeBUid
      CREATE (a)<-[r:CHILD_OF]-(b)
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

export const createBox = async (
  id: string,
  boxType: string,
  name: string
): Promise<IPlatform> => {
  const session = driver.session();
  try {
    const result = await session.run(
      `CREATE (node:${boxType}:Box {name: $name, uid: $id, type: $boxType}) RETURN node`,
      { name, id, boxType }
    );
    const properties = result.records[0].get('node').properties;
    return properties;
  } finally {
    session.close();
  }
};

export const createSystem = async (
  uid: string,
  name: string
): Promise<ISystem> => {
  const result = await runQueryAndReturnProperties(
    'node',
    `CREATE (node:System {name: $name, uid: $uid}) RETURN node`,
    { uid, name }
  );
  return result[0];
};

export const createSystemBoxRelationship = async (
  systemId: string,
  boxId: string
) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `
      MATCH (system:System),(box:Box)
      WHERE system.uid = $systemId AND box.uid = $boxId
      CREATE (system)-[r:PROVIDES]->(box)
      RETURN r
      `,
      { systemId, boxId }
    );
    if (result.records.length === 0) {
      throw new Error('Could not create relationship');
    }
    return result;
  } finally {
    session.close();
  }
};

const createTechnology = async (uid: string, name: string): Promise<any> => {
  const result = await runQueryAndReturnProperties(
    'node',
    `CREATE (node:Technology {name: $name, uid: $uid}) RETURN node`,
    { uid, name }
  );
  return result[0];
};

const createSystemTechnologyRelationship = async (
  systemId: string,
  technologyId: string
) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `
      MATCH (a),(b)
      WHERE a.uid = $systemId AND b.uid = $technologyId
      CREATE (a)-[r:BUILT_OF]->(b)
      RETURN r
      `,
      { systemId, technologyId }
    );
    if (result.records.length === 0) {
      throw new Error('Could not create relationship');
    }
    return result;
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
    `MATCH (p:${parentType})<-[r:CHILD_OF]-(node) where p.uid = $uid AND NOT node:System return p, node`,
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

export const findSystemsByBoxId = (
  boxId: string
): Promise<IPlatform[]> => {
  return runQueryAndReturnProperties(
    'system',
    `MATCH(box:Box) <-[r:PROVIDES]- (system:System) WHERE (box.uid = $boxId) RETURN system`,
    { boxId }
  );
};

export const findTechnologiesBySystemId = async (
  systemId: string
): Promise<IPlatform[]> => {
  const results = await runQueryAndReturnProperties(
    'technology',
    `MATCH(system) -[:BUILT_OF]-> (technology:Technology) WHERE (system.uid = $systemId) RETURN technology`,
    { systemId }
  );

  return results;
};

export const findTopLevelBoxes = async (): Promise<IBox[]> => {
  return runQueryAndReturnProperties(
    'box',
    'MATCH (box:Box) WHERE NOT (box)-[:CHILD_OF]->(:Box) RETURN box'
  );
};

export const findChildrenBoxesOf = async (
  parentId: string
): Promise<IBox[]> => {
  return runQueryAndReturnProperties(
    'box',
    `MATCH(box:Box) -[:CHILD_OF]-> (parent:Box) WHERE (parent.uid = $parentId) RETURN box`,
    { parentId }
  );
};

const deleteAll = (): Promise<any> => {
  return runQueryAndReturnProperties('n/a', 'MATCH(n) DETACH DELETE n');
};

export default {
  createBox,
  createLine,
  createSystem,
  createSystemBoxRelationship,
  createTechnology,
  createSystemTechnologyRelationship,
  deleteAll,
  findCapabilitiesByDomainId,
  findDomainsByPlatformId,
  findPlatforms,
  findSystemsByBoxId,
  findTechnologiesBySystemId,
  findTopLevelBoxes,
  findChildrenBoxesOf,
};
