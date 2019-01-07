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

import axios from 'axios';

const DEFAULT_REQUEST_CONFIG = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const _httpGetClient = (url, config) => axios.get(url, config);

const getResource = async pathToResource => {
  try {
    const response = await _httpGetClient(`/${pathToResource}`, {
      transformResponse: [data => data],
      DEFAULT_REQUEST_CONFIG,
    });
    return JSON.parse(response.data);
  } catch (error) {
    console.error(error);
    throw new Error(_buildErrorMessage(error, pathToResource));
  }
};

function _buildErrorMessage(error, pathToResource) {
  return error.response && error.response.status === 404
    ? `File not found: ${pathToResource}`
    : `Error parsing JSON file: ${pathToResource} \n ${_formatError(error)}`;
}

function _formatError(error) {
  // Remove all new or return characters
  return error.toString().replace(/(?:\r\n|\r|\n)/g, '');
}

export { getResource };
