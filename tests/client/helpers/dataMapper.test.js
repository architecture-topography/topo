import dataMapper from '../../../src/client/helpers/dataMapper';

const config = {
    "platforms": [
        {
            "name": "Platform 1",
            "domains": [
                {
                    "name": "Domain 1",
                    "description": "Description 1",
                    "capabilities": [
                        {"name": "Capability 1", "order": 1}
                    ]
                }
            ]
        }
    ],
    "others": []
};

const systems = [
    {
        "name": "Test Name",
        "description": "Test Description",
        "capabilities": [
            "Capability 1"
        ],
        "infrastructure": ["aws"]
    }
];

describe('dataMapper', () => {

    describe('mapTreasureMapData', () => {

        it('should map single system to capabilities', () => {
            const mapTreasureMapData = dataMapper.mapTreasureMapData(getClonedConfig(), systems);
            expect(mapTreasureMapData.platforms[0].domains[0].capabilities[0].systems).toEqual(systems);
        });

        it('should map multiple systems to capabilities', () => {
            const multipleSystems = [
                {
                    "name": "Test Name 1",
                    "description": "Test Description 1",
                    "capabilities": [
                        "Capability 1"
                    ],
                    "infrastructure": ["aws"]
                },
                {
                    "name": "Test Name 2",
                    "description": "Test Description 2",
                    "capabilities": [
                        "Capability 1"
                    ],
                    "infrastructure": ["aws"]
                }
            ];

            const mapTreasureMapData = dataMapper.mapTreasureMapData(getClonedConfig(), multipleSystems);
            expect(mapTreasureMapData.platforms[0].domains[0].capabilities[0].systems).toEqual(multipleSystems);
        });

        it('should map assets to capabilities', () => {
            const assets = [{
                "assets": systems
            }];

            const mapTreasureMapData = dataMapper.mapTreasureMapData(getClonedConfig(), assets);
            expect(mapTreasureMapData.platforms[0].domains[0].capabilities[0].systems).toEqual(systems);
        });

        it('should not map same system more than once', () => {
            const mapTreasureMapData = dataMapper.mapTreasureMapData(getClonedConfig(), [systems[0], systems[0]]);
            expect(mapTreasureMapData.platforms[0].domains[0].capabilities[0].systems).toEqual(systems);
        });

        it('should not override existing capabilities when called multiple times with different systems', () => {
            const anotherSystem = {
                "name": "Test Name 2",
                "description": "Test Description 2",
                "capabilities": [
                    "Capability 1"
                ],
                "infrastructure": ["db"]
            };

            const otherSystems = [systems[0], anotherSystem];

            const mapTreasureMapData1 = dataMapper.mapTreasureMapData(getClonedConfig(), systems);
            const mapTreasureMapData2 = dataMapper.mapTreasureMapData(mapTreasureMapData1, otherSystems);
            expect(mapTreasureMapData2.platforms[0].domains[0].capabilities[0].systems).toEqual(otherSystems);
        });

        it('should replace systems with same name in capabilities when contents are different', () => {
            const oldSystem = {
                "name": "Test Name 2",
                "description": "Test Description 2",
                "capabilities": [
                    "Capability 1"
                ],
                "infrastructure": ["db"]
            };

            const newSystem = {
                "name": "Test Name 2",
                "description": "Test Description 2",
                "capabilities": [
                    "Capability 1"
                ],
                "infrastructure": ["db", "aws"]
            };

            const mapTreasureMapDataFirst = dataMapper.mapTreasureMapData(getClonedConfig(), [oldSystem]);
            const mapTreasureMapDataSecond = dataMapper.mapTreasureMapData(mapTreasureMapDataFirst, [newSystem]);

            expect(mapTreasureMapDataSecond.platforms[0].domains[0].capabilities[0].systems).toEqual([newSystem]);
        });

        it('should throw exception when system file have non-existent capabilities', () => {
            const badJsonFile = {
                "not_system_file": "some_value"
            };

            expect(() => dataMapper.mapTreasureMapData(getClonedConfig(), [badJsonFile])).toThrow();
        });
    });
});

function getClonedConfig() {
    return JSON.parse(JSON.stringify(config));
}
