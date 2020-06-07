/*
 * Copyright 2018-2020 Thoughtworks Inc. All rights reserved
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

import neo4j from 'neo4j-driver';

const getNeo4jUrl = () => {
  if (!process.env.NEO4J_URL) {
    throw new Error('Neo4j URL is undefined.');
  }
  return process.env.NEO4J_URL;
};

const getNeo4jCredentials = () => {
  if (!process.env.NEO4J_USER || !process.env.NEO4J_PASSWORD) {
    throw new Error('Either Neo4j user or password is undefined.');
  }
  return {
    password: process.env.NEO4J_PASSWORD,
    user: process.env.NEO4J_USER,
  };
};

export const driver = neo4j.driver(
  getNeo4jUrl(),
  neo4j.auth.basic(getNeo4jCredentials().user, getNeo4jCredentials().password)
);

process.on('exit', () => {
  driver.close();
});
