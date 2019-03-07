/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import axios, { AxiosError } from 'axios';

const DEFAULT_REQUEST_CONFIG = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
};

const getResource = async (pathToResource: string | undefined) => {
  try {
    const response = await axios.get(`/${pathToResource}`, {
      transformResponse: [data => data],
      ...DEFAULT_REQUEST_CONFIG,
    });
    return JSON.parse(response.data);
  } catch (error) {
    console.error(error);
    throw new Error(_buildErrorMessage(error, pathToResource));
  }
};

function _buildErrorMessage(
  error: AxiosError,
  pathToResource: string | undefined
) {
  return error.response && error.response.status === 404
    ? `File not found: ${pathToResource}`
    : `Error parsing JSON file: ${pathToResource} \n ${_formatError(error)}`;
}

function _formatError(error: Error) {
  // Remove all new or return characters
  return error.toString().replace(/(?:\r\n|\r|\n)/g, '');
}

export { getResource };
