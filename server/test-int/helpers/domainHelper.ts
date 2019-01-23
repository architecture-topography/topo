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
