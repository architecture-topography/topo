/*
 * Copyright 2018-2019 Thoughtworks Inc. All rights reserved
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
