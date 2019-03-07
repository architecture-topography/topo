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

import { ApolloServer } from "apollo-server";
import { importSchema } from "graphql-import";
import { createTestClient } from "apollo-server-testing";

const typeDefs = importSchema(require.resolve("./schema.graphql"));

describe("Schema definitions", () => {
  let server: ApolloServer;
  let query: any;

  beforeAll(() => {
    server = new ApolloServer({
      typeDefs,
      mocks: true
    });
    query = createTestClient(server).query;
  });

  it("Accepts systems query", async () => {
    const QUERY = `
    query {
      systems(capabilityId: "test"){
        name,
        id,
        technologies {
          name,
          id
        }
      }
    }
    `;

    const res = await query({
      query: QUERY
    });
    expect(res.errors).toBeUndefined();
  });

  it("Accepts platform query", async () => {
    const QUERY = `
    query {
      platforms{
        name,
        id
      }
    }
    `;

    const res = await query({
      query: QUERY
    });
    expect(res.errors).toBeUndefined();
  });

  it("Accepts platform query with embedded domains", async () => {
    const QUERY = `
    query {
      platforms{
        name,
        id,
        domains {
          id,
          name
        }
      }
    }
    `;

    const res = await query({
      query: QUERY
    });
    expect(res.errors).toBeUndefined();
  });

  it("Accepts platform query with embedded domains and capabilities", async () => {
    const QUERY = `
    query {
      platforms{
        name,
        id,
        domains {
          id,
          name,
          capabilities {
            id,
            name
          }
        }
      }
    }
    `;

    const res = await query({
      query: QUERY
    });
    expect(res.errors).toBeUndefined();
  });
});
