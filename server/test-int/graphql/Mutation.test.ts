import server from '../../src/server';
import { createTestClient } from 'apollo-server-testing';
import { clearDb } from '../helpers/testHelper';
import { findPlatform, runQuery, getNode } from '../helpers/domainHelper';

describe('Mutation', () => {
  afterEach(clearDb);

  describe('createDomain', () => {
    it('creates a domain in neo db', async () => {
      const platformUid = 'plat-00001';
      const domainName = 'Test Domain';
      const id = '123';

      await runQuery(
        'CREATE (platform:Platform { name: $platformName, uid: $platformUid })',
        {
          platformName: 'testPlatform',
          platformUid,
        }
      );

      const { query } = createTestClient(server);

      const MUTATION = `
      mutation {
        createDomain(
          name: "${domainName}",
          id: "${id}",
          parentId: "${platformUid}",
        )
        {
          name
          id
        }
      }
      `;

      const queryResult = await query({ mutation: MUTATION });
      expect(queryResult.errors).not.toBeDefined();

      // check node was added
      const domain = await getNode(id);
      expect(domain.uid).toEqual(id);
      expect(domain.name).toEqual(domainName);

      // check domain was linked to platform
      const res = await runQuery(
        'MATCH (p:Platform)-[]->(d:Domain) where p.uid=$platformUid RETURN d',
        { platformUid }
      );
      expect(res.records[0].get('d').properties.uid).toEqual(id);
    });
  });

  describe('createPlatform', () => {
    it('creates platform in neo db', async () => {
      const platformName = 'Test Platform';
      const id = '123';

      const { query } = createTestClient(server);

      const MUTATION = `
      mutation {
        createPlatform(
          name: "${platformName}",
          id: "${id}"
        )
        {
          name
          id
        }
      }
      `;
      await query({ mutation: MUTATION });
      const res = await findPlatform({ id });
      expect(res.records[0].get('platform').properties).toEqual({
        name: `${platformName}`,
        uid: `${id}`,
      });
    });
  });
});
