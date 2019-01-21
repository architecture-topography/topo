import { driver } from "../src/neo";

export const createTestPlatformAndDomain = async () => {
  const name = "Test Platform";
  const domainName = "Test Domain";
  const session = driver.session();
  try {
    await session.run(
      `CREATE (platform:Platform { name: $name })
          CREATE (domain:Domain { name: $domainName })
          CREATE (platform)-[:HAS]->(domain)
        `,
      {
        name,
        domainName
      }
    );
  } finally {
    session.close();
  }
};
