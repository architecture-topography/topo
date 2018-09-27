import axios from 'axios';

const DEFAULT_REQUEST_CONFIG = {
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
};

const _httpGetClient = (url, config) => axios.get(url, config);

const getResource = async (pathToResource) => {
    try {
        const response = await _httpGetClient(`/${pathToResource}`, {transformResponse: [(data) => data], DEFAULT_REQUEST_CONFIG});
        return JSON.parse(response.data);
    } catch (error) {
        console.error(error);
        throw new Error(_buildErrorMessage(error, pathToResource));
    }
};

function _buildErrorMessage(error, pathToResource) {
    return (error.response && error.response.status !== 200)
        ? `File not found: ${pathToResource}`
        : `Error parsing JSON file: ${pathToResource} \n ${_formatError(error)}`;
}

function _formatError(error) {
    // Remove all new or return characters
    return error.toString().replace(/(?:\r\n|\r|\n)/g, '');
}

export {
    getResource
};