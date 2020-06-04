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

import resolvers from '../../src/resolvers';
import Server from '../../src/server';
import { createTestClient } from 'apollo-server-testing';
import { clearDb } from '../helpers/testHelper';
import {
  createTestPlatformAndDomain,
  createSystemWithCapability,
} from '../helpers/domainHelper';

const server = Server as any;

describe('resolvers', () => {
  describe('hello', () => {
    it('returns hello topo', () => {
      expect(resolvers.Query.hello()).toEqual('Hello, Topo');
    });
  });

  describe('getSystems', () => {
    it('Should return systems for a particular box', async () => {
      const { query } = createTestClient(server);
      const { boxId } = await createSystemWithCapability({
        system: { name: 'system cool', uid: 'system-001' },
        capability: { name: 'capability', uid: 'cap-001' },
      });
      const QUERY = `
      query {
        systems(boxId: "${boxId}"){
          name
        }
      }
      `;

      const res = await query({ query: QUERY });
      expect(res.data).toBeDefined();
      expect(res.data ? res.data.systems : []).toContainEqual({
        name: 'system cool',
      });
    });

    it('Should return technologies with system', async () => {
      const { query } = createTestClient(server);
      const { boxId } = await createSystemWithCapability({
        capability: {
          name: 'capability',
          uid: 'cap-001',
        },
        technology: {
          name: 'kittensOnRails',
          uid: 'kit-001',
        },
      });
      const QUERY = `
      query {
        systems(boxId: "${boxId}"){
          name,
          technologies {
            name
            id
          }
        }
      }
      `;

      const res = await query({ query: QUERY });
      expect(res.data).toBeDefined();
      expect(res.data ? res.data.systems[0].technologies : []).toContainEqual({
        id: 'kit-001',
        name: 'kittensOnRails',
      });
    });
  });

  describe('getBoxes', () => {
    it('should return top level boxes with no parents', async () => {
      const { query } = createTestClient(server);

      // arrange
      await createTestPlatformAndDomain(
        'Test Platform',
        'Test Domain',
        'Test Capability'
      );

      // act
      const QUERY = `
      query {
        boxes{
          name
        }
      }
      `;
      const res = await query({
        query: QUERY,
      });

      // assert
      expect(res.data?.boxes).toBeDefined();
      expect(res.data!.boxes).toContainEqual({
        name: 'Test Platform',
      });
    });

    it('should return child boxes', async () => {
      const { query } = createTestClient(server);

      // arrange
      await createTestPlatformAndDomain(
        'Test Platform',
        'Test Domain',
        'Test Capability'
      );

      // act
      const QUERY = `
      query {
        boxes{
          name
          boxes{
            name
            boxes{
              name
              boxes{
                name
              }
            }
          }
        }
      }
      `;
      const res = await query({
        query: QUERY,
      });

      // assert
      expect(res.data?.boxes).toBeDefined();
      expect(res.data!.boxes).toContainEqual({
        name: 'Test Platform',
        boxes: [
          {
            name: 'Test Domain',
            boxes: [
              {
                name: 'Test Capability',
                boxes: [],
              },
            ],
          },
        ],
      });
    });
    afterEach(clearDb);
  });
});
