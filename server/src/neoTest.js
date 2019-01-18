const neo4j = require("neo4j-driver").v1;

const testDriver = neo4j.driver(
  "bolt://localhost:7688",
  neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
);

process.on("exit", () => {
  testDriver.close();
});

module.exports = testDriver;
