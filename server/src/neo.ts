import * as Neo4j from "neo4j-driver";

export const driver = Neo4j.v1.driver(
  process.env.NEO4J_URL + "",
  Neo4j.v1.auth.basic(
    process.env.NEO4J_USER + "",
    process.env.NEO4J_PASSWORD + ""
  )
);

process.on("exit", () => {
  driver.close();
});
