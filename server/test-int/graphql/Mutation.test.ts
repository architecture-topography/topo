import { createTestClient } from 'apollo-server-testing';
import Server from '../../src/server';
import { clearDb } from '../helpers/testHelper';
import {
  addNode,
  addBox,
  getNode,
  runQuery,
  createTestPlatformAndDomain,
} from '../helpers/domainHelper';

const server = Server as any;

describe('Mutation', () => {
  afterEach(clearDb);

  describe('createBox', () => {
    it('create a Domain', async () => {
      const name = 'Test Domain';
      const boxType = 'Domain';
      const id = '123';

      const { mutate } = createTestClient(server);

      const MUTATION = `mutation {
        createBox( id: "${id}", name: "${name}", boxType: ${boxType})
        { id, name }
      }`;

      const result = await mutate({ mutation: MUTATION });
      expect(result.errors).not.toBeDefined();

      const node = await getNode(id);
      expect(node.uid).toEqual(id);
      expect(node.name).toEqual(name);
    });

    it('create a Subdomain box with a parent Domain box', async () => {
      const domainId = 'domain-00001';
      const name = 'Test Subdomain';
      const id = '123';

      // arrange
      await addBox('Domain', domainId, 'test domain');

      // act
      const { mutate } = createTestClient(server);
      const MUTATION = `
      mutation {
        createBox( name: "${name}", id: "${id}", boxType: Subdomain, parentId: "${domainId}")
        { name }
      }
      `;
      const queryResult = await mutate({ mutation: MUTATION });

      // assert
      expect(queryResult.errors).not.toBeDefined();

      const res = await runQuery(
        'MATCH (d:Box:Domain)<-[:CHILD_OF]-(s:Box:Subdomain) where d.uid=$domainId RETURN s',
        { domainId: domainId }
      );
      expect(res.records.length).toBe(1);
      expect(res.records[0].get('s').properties.uid).toEqual(id);
    });

    it('create a Domain box and link to a System', async () => {
      const domainId = 'domain-00001';

      // arrange
      await addNode('System', 'system-001', 'example system');

      // act
      const { mutate } = createTestClient(server);
      const MUTATION = `
      mutation {
        createBox( name: "example domain", id: "${domainId}", boxType: Domain, systems: ["system-001"])
        { name }
      }
      `;
      const queryResult = await mutate({ mutation: MUTATION });

      // assert
      expect(queryResult.errors).not.toBeDefined();
      const res = await runQuery(
        'MATCH (d:Box:Domain)<-[:PROVIDES]-(system:System) where d.uid=$domainId RETURN system',
        { domainId: domainId }
      );
      expect(res.records.length).toBe(1);
      expect(res.records[0].get('system').properties.uid).toEqual('system-001');
    });

    it('returns an error if it cannot find the parent node', async () => {
      const domainName = 'Test Domain';
      const id = '123';

      const { mutate } = createTestClient(server);

      const MUTATION = `
      mutation {
        createBox( name: "${domainName}", id: "${id}", boxType: Domain, parentId: "bogus-parent-id")
        { name }
      }
      `;

      const queryResult = await mutate({ mutation: MUTATION });
      expect(
        queryResult.errors ? queryResult.errors[0].toString() : ''
      ).toContain('Could not create line');
    });
  });

  describe('createTechnology', () => {
    it('create technology node', async () => {
      const name = 'Test Platform';
      const id = '123';

      const { mutate } = createTestClient(server);

      const MUTATION = `mutation {
        createTechnology( id: "${id}", name: "${name}")
        { id, name }
      }`;

      const result = await mutate({ mutation: MUTATION });
      expect(result.errors).not.toBeDefined();

      const node = await getNode(id);
      expect(node.uid).toEqual(id);
      expect(node.name).toEqual(name);
    });
  });

  describe('System', () => {
    const capabilityId = 'capability_0001';
    beforeEach(
      async () =>
        await createTestPlatformAndDomain(
          'Test Platform',
          'Test Domain',
          'Test Capability'
        )
    );

    it('create system node', async () => {
      const id = '123';
      const name = 'example system';
      const { mutate } = createTestClient(server);

      const MUTATION = `mutation {
        createSystem( id: "${id}", name: "${name}", parentBoxId: "${capabilityId}")
        { name, id }
      }`;

      const result = await mutate({ mutation: MUTATION });
      expect(result.errors).not.toBeDefined();

      const node = await getNode(id);
      expect(node.uid).toEqual(id);
      expect(node.name).toEqual(name);
    });

    it('create system node with technology', async () => {
      const id = '123';
      const technologyId = 'tech-001';

      const { mutate } = createTestClient(server);

      await addNode('Technology', technologyId, 'react (of course)');

      const MUTATION = `mutation {
        createSystem( id: "${id}", name: "A System", technologies: ["${technologyId}"])
        { id }
      }`;

      await mutate({ mutation: MUTATION });

      const res = await runQuery(
        'MATCH (s:System)-[USES]->(t:Technology) where s.uid=$id RETURN t',
        { id }
      );
      expect(res.records.length).toBe(1);
      expect(res.records[0].get('t').properties.uid).toEqual(technologyId);
    });
  });

  describe('deleteAll', () => {
    it('should remove all nodes', async () => {
      const { mutate } = createTestClient(server);
      await addNode('Box:Capability', 'id-001', 'test capability');
      await addNode('Technology', 'id-002', 'react (of course)');

      const MUTATION = `mutation {
        deleteAll { result }
      }`;

      const result = await mutate({ mutation: MUTATION });
      expect(result.errors).not.toBeDefined();

      const nodes = await runQuery('MATCH (n) RETURN n');
      expect(nodes.records.length).toBe(0);
    });
  });
});
