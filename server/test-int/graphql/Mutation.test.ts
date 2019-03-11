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

  describe('createDomain', () => {
    it('creates a domain in neo db', async () => {
      const domainName = 'Test Domain';
      const id = '123';

      const { query } = createTestClient(server);

      const MUTATION = `
      mutation {
        createDomain( name: "${domainName}", id: "${id}")
        { name }
      }
      `;

      const queryResult = await query({ mutation: MUTATION });
      expect(queryResult.errors).not.toBeDefined();

      const domain = await getNode(id);
      expect(domain.uid).toEqual(id);
      expect(domain.name).toEqual(domainName);
    });

    it('returns an error if it cannot find the parent node', async () => {
      const domainName = 'Test Domain';
      const id = '123';

      const { query } = createTestClient(server);

      const MUTATION = `
      mutation {
        createDomain( name: "${domainName}", id: "${id}", parentId: "bogus-parent-id")
        { name }
      }
      `;

      const queryResult = await query({ mutation: MUTATION });
      expect(
        queryResult.errors ? queryResult.errors[0].toString() : ''
      ).toContain('Could not create line');
    });

    it('creates a domain in neo db and links it to a platform', async () => {
      const platformUid = 'plat-00001';
      const domainName = 'Test Domain';
      const id = '123';

      await addNode('Platform', platformUid, 'test platform');

      const { query } = createTestClient(server);

      const MUTATION = `
      mutation {
        createDomain( name: "${domainName}", id: "${id}", parentId: "${platformUid}")
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
      expect(res.records[0].get('d').properties.uid).toEqual(id);
    });
  });

  describe('createCapability', () => {
    it('creates a capability in neo db', async () => {
      const capabilityName = 'Test Capability';
      const id = 'cap-00012';

      const { query } = createTestClient(server);

      const MUTATION = `
      mutation {
        createCapability( name: "${capabilityName}", id: "${id}")
        { name }
      }
      `;

      const queryResult = await query({ mutation: MUTATION });
      expect(queryResult.errors).not.toBeDefined();

      const capability = await getNode(id);
      expect(capability.uid).toEqual(id);
      expect(capability.name).toEqual(capabilityName);
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
