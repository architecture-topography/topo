/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import dataMapper from './dataMapper';

const config = {
  others: [],
  platforms: [
    {
      domains: [
        {
          capabilities: [{ name: 'Capability 1', order: 1 }],
          description: 'Description 1',
          name: 'Domain 1',
        },
      ],
      name: 'Platform 1',
    },
  ],
};

describe('dataMapper', () => {
  describe('mapTreasureMapData', () => {
    it('should map single system to capabilities', () => {
      const systems = {
        assets: [
          {
            capabilities: ['Capability 1'],
            description: 'Test Description',
            infrastructure: ['aws'],
            name: 'Test Name',
          },
        ],
      };

      const mapTreasureMapData = dataMapper.buildTreasureMapData(
        getClonedConfig(),
        systems
      );
      expect(
        mapTreasureMapData.platforms[0].domains[0].capabilities[0].systems
      ).toEqual(systems.assets);
    });

    it('should map multiple systems to capabilities', () => {
      const multipleSystems = {
        assets: [
          {
            capabilities: ['Capability 1'],
            description: 'Test Description 1',
            infrastructure: ['aws'],
            name: 'Test Name 1',
          },
          {
            capabilities: ['Capability 1'],
            description: 'Test Description 2',
            infrastructure: ['aws'],
            name: 'Test Name 2',
          },
        ],
      };

      const mapTreasureMapData = dataMapper.buildTreasureMapData(
        getClonedConfig(),
        multipleSystems
      );
      expect(
        mapTreasureMapData.platforms[0].domains[0].capabilities[0].systems
      ).toEqual(multipleSystems.assets);
    });

    it('should not map same system more than once', () => {
      const system = {
        capabilities: ['Capability 1'],
        description: 'Test Description',
        infrastructure: ['aws'],
        name: 'Test Name',
      };

      const repeatedSystems = {
        assets: [system, system],
      };

      const mapTreasureMapData = dataMapper.buildTreasureMapData(
        getClonedConfig(),
        repeatedSystems
      );
      expect(
        mapTreasureMapData.platforms[0].domains[0].capabilities[0].systems
      ).toEqual([system]);
    });

    it('should replace systems with same name in capabilities when contents are different', () => {
      const assets = {
        assets: [
          {
            capabilities: ['Capability 1'],
            description: 'Test Description 2',
            infrastructure: ['db'],
            name: 'Test Name 2',
          },
          {
            capabilities: ['Capability 1'],
            description: 'Test Description 2',
            infrastructure: ['db', 'aws'],
            name: 'Test Name 2',
          },
        ],
      };

      const mapTreasureMapData = dataMapper.buildTreasureMapData(
        getClonedConfig(),
        assets
      );

      expect(
        mapTreasureMapData.platforms[0].domains[0].capabilities[0].systems
      ).toEqual([assets.assets[1]]);
    });

    it('should add systems and id property to each capability', () => {
      const multipleSystems = {
        assets: [
          {
            capabilities: ['Capability 1'],
            description: 'Test Description 1',
            infrastructure: ['aws'],
            name: 'Test Name 1',
          },
          {
            capabilities: ['Capability 1'],
            description: 'Test Description 2',
            infrastructure: ['aws'],
            name: 'Test Name 2',
          },
        ],
      };

      const mapTreasureMapData = dataMapper.buildTreasureMapData(
        getClonedConfig(),
        multipleSystems
      );

      mapTreasureMapData.platforms[0].domains[0].capabilities.forEach(
        (capability, index) => {
          expect(capability.id).toEqual(`${index + 1}`);
          expect(Array.isArray(capability.systems)).toBe(true);
        }
      );
    });

    it('should throw exception when system file have non-existent capabilities', () => {
      const badJsonFile = {
        not_system_file: 'some_value',
      };

      expect(() =>
        dataMapper.buildTreasureMapData(getClonedConfig(), [badJsonFile])
      ).toThrow();
    });
  });
});

function getClonedConfig() {
  return JSON.parse(JSON.stringify(config));
}
