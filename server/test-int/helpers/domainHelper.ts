import { driver } from "../../src/neo";

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
