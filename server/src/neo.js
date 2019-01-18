const neo4j = require("neo4j-driver").v1;

// TODO:
// check env instead of switching neo drivers
// user dockerdns so that we don't have to use localhost

const driver = neo4j.driver(
  process.env.NEO4J_URL,
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

const testDriver = neo4j.driver(
  "bolt://localhost:7688",
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

process.on("exit", () => {
  driver.close();
});

module.exports = { driver, testDriver };
