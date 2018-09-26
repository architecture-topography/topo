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
        const originalError = error.toString().replace(/(?:\r\n|\r|\n)/g, '');
        throw new Error(`Error parsing JSON file: ${pathToResource} \n ${originalError}`)
    }
};

export {
    getResource
};
