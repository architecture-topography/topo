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

import {getResource} from './resourceLoaderApi';

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
