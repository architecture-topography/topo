import * as Neo4j from "neo4j-driver";

const getNeo4jUrl = () => {
  if (!process.env.NEO4J_URL) {
    throw new Error("Neo4j URL is undefined.");
  }
  return process.env.NEO4J_URL;
};

const getNeo4jCredentials = () => {
  if (!process.env.NEO4J_USER || !process.env.NEO4J_PASSWORD) {
    throw new Error("Either Neo4j user or password is undefined.");
  }
  return {
    user: process.env.NEO4J_USER,
    password: process.env.NEO4J_PASSWORD
  };
};

export const driver = Neo4j.v1.driver(
  getNeo4jUrl(),
  Neo4j.v1.auth.basic(
    getNeo4jCredentials().user,
    getNeo4jCredentials().password
  )
);

process.on("exit", () => {
  driver.close();
});
