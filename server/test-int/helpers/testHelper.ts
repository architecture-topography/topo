import { driver } from "../../src/neo";

export const clearDb = async () => {
  const session = driver.session();
  try {
    await session.run("MATCH (n) DETACH DELETE n");
  } catch {
    console.error("Could not delete nodes");
    throw new Error("Could not delete nodes");
  } finally {
    session.close();
  }
};
