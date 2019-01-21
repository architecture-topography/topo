const neo4j = require("neo4j-driver").v1;

export const driver = neo4j.driver(
  process.env.NEO4J_URL,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

process.on("exit", () => {
  driver.close();
});
