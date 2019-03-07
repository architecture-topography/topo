/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import { getResource } from './resourceLoaderApi';

import axios from 'axios';

jest.mock('axios');

const pathToFakeFile = 'any/path/to/file.json';

describe('ResourceLoaderApi', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('getResource', () => {
    it('should parse the JSON response and return a valid object', async () => {
      axios.get = jest.fn(() =>
        Promise.resolve({ data: '{ "key": "Test data" }' })
      );
      const response = await getResource(pathToFakeFile);
      expect(response).toEqual({ key: 'Test data' });
    });

    it('should throw Exception when file is not found', async () => {
      const error = {
        response: {
          data: 'Cannot GET file',
          status: 404,
        },
      };

      axios.get = jest.fn(() => Promise.reject(error));
      await expect(getResource(pathToFakeFile)).rejects.toMatchObject({
        message: 'File not found: any/path/to/file.json',
      });
      await expect(axios.get).toHaveBeenCalled();
    });

    it('should throw Exception when file is not proper JSON', async () => {
      axios.get = jest.fn(() =>
        Promise.resolve({ data: '{ malformedKey": "Test data" }' })
      );

      await expect(getResource(pathToFakeFile)).rejects.toMatchObject({
        message:
          'Error parsing JSON file: any/path/to/file.json \n SyntaxError: Unexpected token m in JSON at position 2',
      });
      await expect(axios.get).toHaveBeenCalled();
    });
  });
});
