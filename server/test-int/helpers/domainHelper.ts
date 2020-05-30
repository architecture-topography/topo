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

import { driver } from '../../src/neo';

export const createTestPlatform = async (platformName: string, id: string) => {
  const session = driver.session();
  try {
    await session.run(
      `CREATE (platform:Box:Platform { name: $platformName, uid: $id })
      CREATE (domain:Box:Domain { name: "domain", uid: "domain-01"})
      CREATE (capability:Box:Capability { name: "capability", uid: "capability-01" })
      CREATE (platform)<-[:CHILD_OF]-(domain)
      CREATE (domain)<-[:CHILD_OF]-(capability)
      `,
      {
        id,
        platformName,
      }
    );
  } finally {
    session.close();
  }
};

export const createTestPlatformAndDomain = async (
  platformName: string,
  domainName: string,
  capabilityName: string
) => {
  const session = driver.session();
  try {
    await session.run(
      `CREATE (platform:Box:Platform { name: $platformName, uid: 'platform_0001' })
      CREATE (domain:Box:Domain { name: $domainName, uid: 'domain_0001' })
      CREATE (capability:Box:Capability { name: $capabilityName, uid: 'capability_0001' })
      CREATE (platform)<-[:CHILD_OF]-(domain)
      CREATE (domain)<-[:CHILD_OF]-(capability)
      `,
      {
        capabilityName,
        domainName,
        platformName,
      }
    );
  } finally {
    session.close();
  }
};

interface IArguments {
  capability?: {
    name: string;
    uid: string;
  };
  system?: {
    name: string;
    uid: string;
  };
  technology?: {
    name: string;
    uid: string;
  };
  id?: string;
}

export const findPlatform = async ({ id }: IArguments) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `MATCH (platform:Platform { uid: $id }) RETURN platform`,
      { id }
    );
    return result;
  } finally {
    session.close();
  }
};

export const runQuery = async (queryString: string, params: object = {}) => {
  const session = driver.session();
  try {
    const result = await session.run(queryString, params);
    return result;
  } finally {
    session.close();
  }
};

export const getNode = async (uid: string) => {
  const res = await runQuery('MATCH (node) where node.uid=$uid RETURN node', {
    uid,
  });
  if (res.records.length === 0) {
    throw new Error('Could not find node');
  }
  return res.records[0].get('node').properties;
};

export const addNode = async (nodeType: string, uid: string, name: string) => {
  return runQuery(`CREATE (node:${nodeType} { name: $name, uid: $uid })`, {
    name,
    uid,
  });
};

export const createSystemWithCapability = async ({
  system,
  technology,
  capability,
}: IArguments) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `CREATE (system:System: TopoNode { name: $systemName, uid: $systemUid })
      CREATE (capability:Box:Capability: TopoNode { name: $capabilityName, uid: $capabilityUid })
      CREATE (technology:Technology: TopoNode { name: $technologyName, uid: $technologyUid })
      CREATE (capability)<-[:CHILD_OF]-(system)
      CREATE (system)-[:BUILT_OF]->(technology)
      RETURN capability,system,technology
      `,
      {
        capabilityName: 'test capability',
        capabilityUid: capability ? capability.uid : 'cap-001',
        systemName: system ? system.name : 'test-system',
        systemUid: system ? system.uid : 'system-001',
        technologyName: technology ? technology.name : 'test-technology',
        technologyUid: technology ? technology.uid : 'technology-001',
      }
    );

    const capabilityId = result.records[0].get('capability').properties.uid;
    const systemId = result.records[0].get('system').identity.toString();
    const technologyId = result.records[0]
      .get('technology')
      .identity.toString();
    return { capabilityId, systemId, technologyId };
  } finally {
    session.close();
  }
};
