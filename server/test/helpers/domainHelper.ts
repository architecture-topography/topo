import { driver } from "../../src/neo";

export const createTestPlatformAndDomain = async (
  platformName: String,
  domainName: String
) => {
  const session = driver.session();
  try {
    await session.run(
      `CREATE (platform:Platform { name: $platformName })
          CREATE (domain:Domain { name: $domainName })
          CREATE (platform)-[:HAS]->(domain)
        `,
      {
        platformName,
        domainName
      }
    );
  } finally {
    session.close();
  }
};
