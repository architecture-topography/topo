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

export const createPlatform = async (platformName: String, id: String) => {
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
      `CREATE (platform:Platform { name: $platformName })
          CREATE (domain:Domain { name: $domainName })
          CREATE (capability:Capability { name: $capabilityName })
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

export const createSystemWithCapability = async ({
  name
}: {
  name: String;
}) => {
  const session = driver.session();
  try {
    const result = await session.run(
      `CREATE (system:System { name: $name })
          CREATE (capability:Capability { name: $capabilityName })
          CREATE (capability)-[:SUPPORTEDBY]->(system)
          RETURN capability,system
        `,
      {
        capabilityName: "test capability",
        name
      }
    );
    const capabilityId = result.records[0]
      .get("capability")
      .identity.toString();
    const systemId = result.records[0].get("system").identity.toString();
    return { capabilityId, systemId };
  } finally {
    session.close();
  }
};
