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

import { driver } from "../../src/neo";

export const createTestPlatform = async (platformName: String, id: String) => {
  const session = driver.session();
  try {
    await session.run(
      `CREATE (platform:Platform { name: $platformName, uid: $id })
      CREATE (domain:Domain { name: "domain", uid: "domain-01"})
      CREATE (capability:Capability { name: "capability", uid: "capability-01" })
      CREATE (platform)-[:HAS]->(domain)
      CREATE (domain)-[:DOES]->(capability)
    `,
      {
        platformName,
        id
      }
    );
  } finally {
    session.close();
  }
};

export const createTestPlatformAndDomain = async (
  platformName: String,
  domainName: String,
  capabilityName: String
) => {
  const session = driver.session();
  try {
    await session.run(
      `CREATE (platform:Platform { name: $platformName, uid: 'platform_0001' })
          CREATE (domain:Domain { name: $domainName, uid: 'domain_0001' })
          CREATE (capability:Capability { name: $capabilityName, uid: 'capability_0001' })
          CREATE (platform)-[:HAS]->(domain)
          CREATE (domain)-[:DOES]->(capability)
        `,
      {
        platformName,
        domainName,
        capabilityName
      }
    );
  } finally {
    session.close();
  }
};

interface arguments {
  capability?: {
    name: String;
    uid: String;
  };
  system?: {
    name: String;
    uid: String;
  };
  technology?: {
    name: String;
    uid: String;
  };
  id?: String;
}

export const findPlatform = async ({ id }: arguments) => {
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

export const createSystemWithCapability = async ({
  system,
  technology,
  capability
}: arguments) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `CREATE (system:System: TopoNode { name: $systemName, uid: $systemUid })
          CREATE (capability:Capability: TopoNode { name: $capabilityName, uid: $capabilityUid })
          CREATE (technology:Technology: TopoNode { name: $technologyName, uid: $technologyUid })
          CREATE (capability)-[:SUPPORTEDBY]->(system)
          CREATE (system)-[:BUILTIN]->(technology)
          RETURN capability,system,technology
        `,
      {
        capabilityName: "test capability",
        capabilityUid: capability ? capability.uid : "cap-001",
        systemName: system ? system.name : "test-system",
        systemUid: system ? system.uid : "system-001",
        technologyName: technology ? technology.name : "test-technology",
        technologyUid: technology ? technology.uid : "technology-001"
      }
    );

    const capabilityId = result.records[0].get("capability").properties.uid;
    const systemId = result.records[0].get("system").identity.toString();
    const technologyId = result.records[0]
      .get("technology")
      .identity.toString();
    return { capabilityId, systemId, technologyId };
  } finally {
    session.close();
  }
};
