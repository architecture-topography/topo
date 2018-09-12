'use strict';
const fs = require('fs');
const path = require('path');

function readConfigFile() {
    const raw = function() {
        const filePath = path.resolve(process.env.REACT_APP_CONFIG_FILE);
        if (!fs.existsSync(filePath)) throw new Error(`No file found at location: ${filePath}`);

        return fs.readFileSync(filePath, 'utf-8');
    }();

    const stringified = {
        'process.CONFIG_FILE_MAPPING': JSON.stringify(raw)
    };

    return { stringified, raw };
}

module.exports = readConfigFile;
