import {getResource} from '../../../src/client/actions/resourceLoaderApi';

import * as axios from 'axios';

jest.mock('axios');

const pathToFakeFile = 'any/path/to/file.json';

describe('ResourceLoaderApi', () => {

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('getResource', () => {

        it('should parse the JSON response and return a valid object', async () => {
            axios.get.mockImplementation(() => Promise.resolve({data: '{ "key": "Test data" }'}));
            const response = await getResource(pathToFakeFile);
            expect(response).toEqual({key: "Test data"});
        });

        it('should throw Exception when file is not found', async () => {
            const error = {
                response: {
                    data: "Cannot GET file",
                    status: 404
                }
            };

            axios.get.mockImplementation(() => Promise.reject(error));
            await expect(getResource(pathToFakeFile)).rejects.toMatchObject({ message: 'File not found: any/path/to/file.json' });
            await expect(axios.get).toHaveBeenCalled();
        });

        it('should throw Exception when file is not proper JSON', async () => {
            axios.get.mockImplementation(() => Promise.resolve({data: '{ malformedKey": "Test data" }'}));

            await expect(getResource(pathToFakeFile)).rejects.toMatchObject({
                message: 'Error parsing JSON file: any/path/to/file.json \n SyntaxError: Unexpected token m in JSON at position 2'
            });
            await expect(axios.get).toHaveBeenCalled();
        });
    });
});
