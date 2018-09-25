import configFileReader from '../../config/configFileReader';

const config = {
    "platforms": [
        {
            "name": "Platform 1",
            "domains": [
                {
                    "name": "Domain 1",
                    "description": "Description 1",
                    "capabilities": [
                        {
                            "name": "Capability 1",
                            "order": 1
                        }
                    ],
                    "color": "#85C1E9"
                },
                {
                    "name": "Domain 2",
                    "description": "Description 2",
                    "capabilities": [
                        {
                            "name": "Capability 2",
                            "order": 1
                        }
                    ],
                    "color": "#E6B0AA"
                }
            ]
        }
    ],
    "others": []
};

describe('configFileReader', () => {

    it('should read config file and return raw contents', () => {
        const actualConfig = configFileReader('tests/resources/data/config/mockConfig.json');
        expect(actualConfig.raw).toEqual(config)
    });

    it('should read config file and return stringify contents', () => {
        const actualConfig = configFileReader('tests/resources/data/config/mockConfig.json');
        expect(actualConfig.stringified['process.CONFIG_FILE_MAPPING']).toEqual(JSON.stringify(config))
    });

    it('should throw exception when config file does not exist', () => {
        expect(() => configFileReader('tests/resources/missingFile.json')).toThrow(/^(No file found at location:).*(missingFile.json)$/);
    });
});
