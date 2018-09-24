'use strict';
const fs = require('fs');
const path = require('path');

function readConfigFile(pathToConfigFile) {
    const raw = function() {
        const filePath = path.resolve(pathToConfigFile);
        if (!fs.existsSync(filePath)) throw new Error(`No file found at location: ${filePath}`);

        return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }();

    const stringified = {
        'process.CONFIG_FILE_MAPPING': JSON.stringify(raw)
    };

    return { stringified, raw };
}

module.exports = readConfigFile;
