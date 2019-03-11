import server from '../../src/server';
import { createTestClient } from 'apollo-server-testing';
import { clearDb } from '../helpers/testHelper';
import {
  findPlatform,
  runQuery,
  getNode,
  addNode,
} from '../helpers/domainHelper';

describe('Mutation', () => {
  afterEach(clearDb);

  describe('createBox', () => {
    it('create a Platform', async () => {
      const name = 'Test Platform';
      const boxType = 'Platform';
      const id = '123';

      const { query } = createTestClient(server);

      const MUTATION = `mutation {
        createBox( id: "${id}", name: "${name}", boxType: ${boxType})
        { id, name }
      }`;

      const result = await query({ mutation: MUTATION });
      expect(result.errors).not.toBeDefined();

      const node = await getNode(id);
      expect(node.uid).toEqual(id);
      expect(node.name).toEqual(name);
    });

    it('create a Domain with a parent Platform', async () => {
      const platformUid = 'plat-00001';
      const domainName = 'Test Domain';
      const id = '123';

      await addNode('Platform', platformUid, 'test platform');

      const { query } = createTestClient(server);

      const MUTATION = `
      mutation {
        createBox( name: "${domainName}", id: "${id}", boxType: Domain, parentId: "${platformUid}")
        { name }
      }
      `;

      const queryResult = await query({ mutation: MUTATION });
      expect(queryResult.errors).not.toBeDefined();

      // check domain was linked to platform
      const res = await runQuery(
        'MATCH (p:Platform)-[]->(d:Domain) where p.uid=$platformUid RETURN d',
        { platformUid }
      );
      expect(res.records.length).toBe(1);
      expect(res.records[0].get('d').properties.uid).toEqual(id);
    });

    it('returns an error if it cannot find the parent node', async () => {
      const domainName = 'Test Domain';
      const id = '123';

      const { query } = createTestClient(server);

      const MUTATION = `
      mutation {
        createBox( name: "${domainName}", id: "${id}", boxType: Domain, parentId: "bogus-parent-id")
        { name }
      }
      `;

      const queryResult = await query({ mutation: MUTATION });
      expect(
        queryResult.errors ? queryResult.errors[0].toString() : ''
      ).toContain('Could not create line');
    });
  });

  describe('createTechnology', () => {
    it('create technology node', async () => {
      const name = 'Test Platform';
      const id = '123';

      const { query } = createTestClient(server);

      const MUTATION = `mutation {
        createTechnology( id: "${id}", name: "${name}")
        { id, name }
      }`;

      const result = await query({ mutation: MUTATION });
      expect(result.errors).not.toBeDefined();

      const node = await getNode(id);
      expect(node.uid).toEqual(id);
      expect(node.name).toEqual(name);
    });
  });
});
