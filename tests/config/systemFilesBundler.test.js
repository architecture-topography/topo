import systemFilesBundler from '../../config/systemFilesBundler';
const fs = require('fs');
const path = require('path');

const systems = {
    "assets": [
        {
            "name": "Test Name",
            "description": "Test Description",
            "capabilities": [
                "Capability 1"
            ],
            "primary-technologies": [],
            "cycle-time-hours": "",
            "source-url": "",
            "prod-url": "",
            "infrastructure": [
                "aws",
                "on-prem"
            ],
            "last-update": "20180530"
        }
    ]
};

describe('systemFilesBundler', () => {

    const pathToTestResources = 'tests/resources/data';

    afterAll(() => {
        fs.unlinkSync(path.resolve(`${pathToTestResources}/assets.json`));
    });

    it('should read system files and bundle them', () => {
        const actualSystemBundle = systemFilesBundler(`${pathToTestResources}/systems`, pathToTestResources);
        expect(actualSystemBundle.raw).toEqual(systems);
    });

    it('should read system files and return stringify contents', () => {
        const actualSystemBundle = systemFilesBundler(`${pathToTestResources}/systems`, pathToTestResources);
        expect(actualSystemBundle.stringified['process.SYSTEMS_BUNDLE']).toEqual(JSON.stringify(systems))
    });

    it('should throw exception when systems source folder doen not exist', () => {
        expect(() => systemFilesBundler('tests/resources/missingFolder/')).toThrow(/no such file or directory/);
    });

    it('should throw exception when systems source folder exists but it does not contain system files', () => {
        expect(() => systemFilesBundler('tests/resources/data')).toThrow(/The specified folder does not contain JSON files/);
    });
});
