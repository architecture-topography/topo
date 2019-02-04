/**
 * Copyright 2018 Thoughtworks Inc. All rights reserved.
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

import resolvers from "../src/resolvers";
import server from "../src/server";
import { createTestClient } from "apollo-server-testing";
import { clearDb } from "./helpers/testHelper";
import {
  createTestPlatformAndDomain,
  createSystemWithCapability,
  createPlatform
} from "./helpers/domainHelper";

describe("resolvers", () => {
  describe("hello", () => {
    it("returns hello topo", () => {
      expect(resolvers.Query.hello()).toEqual("Hello, Topo");
    });
  });

  describe("getSystems", () => {
    it("Should return systems for a particular capability", async () => {
      const { query } = createTestClient(server);
      const { capabilityId } = await createSystemWithCapability({
        name: "system cool",
        uid: "cap_0001"
      });
      const QUERY = `
      query {
        systems(capabilityId: "${capabilityId}"){
          name
        }
      }
      `;

      const res = await query({ query: QUERY });
      expect(res.data).toBeDefined();
      expect(res.data ? res.data.systems : []).toContainEqual({
        name: "system cool"
      });
    });
  });

  describe("getPlatfroms", () => {
    it("should return uid as ID", async () => {
      const platformName = "Test Platform";
      const platformId = "ID-24601";
      const { query } = createTestClient(server);

      const QUERY = `
      query {
        platforms{
          name
          id
        }
      }
      `;

      await createPlatform(platformName, platformId);
      const res = await query({
        query: QUERY
      });
      expect(res.data).toBeDefined();
      expect(res.data ? res.data.platforms : []).toContainEqual({
        name: platformName,
        id: platformId
      });
    });

    it("should return all platforms", async () => {
      const platformName = "Test Platform";
      const domainName = "Test Domain";
      const capabilityName = "Test Capability";
      const { query } = createTestClient(server);

      const QUERY = `
      query {
        platforms{
          name,
          domains {
            name,
            capabilities {
              name
            }
          }
        }
      }
      `;

      await createTestPlatformAndDomain(
        platformName,
        domainName,
        capabilityName
      );
      const res = await query({
        query: QUERY
      });
      expect(res.data).toBeDefined();
      expect(res.data ? res.data.platforms : []).toContainEqual({
        name: "Test Platform",
        domains: [
          {
            name: "Test Domain",
            capabilities: [
              {
                name: "Test Capability"
              }
            ]
          }
        ]
      });
    });
    afterEach(clearDb);
  });
});
