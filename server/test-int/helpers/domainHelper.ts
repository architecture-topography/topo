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
  name,
  capabilityId
}: {
  name: String;
  capabilityId: String;
}) => {
  const session = driver.session();
  try {
    await session.run(
      `CREATE (system:System { name: $name })
          CREATE (capability:Capability { name: $capabilityName, id: $capabilityId })
          CREATE (capability)-[:SUPPORTEDBY]->(system)
        `,
      {
        capabilityName: "test capability",
        capabilityId,
        name
      }
    );
  } finally {
    session.close();
  }
};
