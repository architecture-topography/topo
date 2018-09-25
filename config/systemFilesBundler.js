'use strict';

const fs = require('fs');
const path = require('path');
const Glob = require('glob-fs');

function bundleSystemFiles(pathToSourceDir, pathToDestinationDir) {
    if (!pathToDestinationDir) pathToDestinationDir = "./public";

    const absolutePathToDestinationDir = path.resolve(pathToDestinationDir);
    const pathToAssetsFile = absolutePathToDestinationDir + "/assets.json";

    if (!fs.existsSync(absolutePathToDestinationDir)) fs.mkdirSync(absolutePathToDestinationDir);

    const raw = function () {
        const files = new Glob({})
            .use((file) => {
                if (/(.*)\/assets.json/.test(file.path)) file.exclude = true;
                return file;
            })
            .readdirSync(`${pathToSourceDir}/*.json`);

        if (files.length === 0) throw new Error('The specified folder does not contain JSON files');

        const output = {
            assets: files.map((filename) => {
                try {
                    return JSON.parse(fs.readFileSync(filename, 'utf8'))
                } catch (error) {
                    console.log(error);
                    throw new Error(`Fail to parse "${filename}" - the file is not in proper JSON format`);
                }
            })
        };

        fs.writeFileSync(pathToAssetsFile, JSON.stringify(output));

        return output
    }();

    const stringified = {
        'process.SYSTEMS_BUNDLE': JSON.stringify(raw)
    };

    return {stringified, raw};
}

module.exports = bundleSystemFiles;
