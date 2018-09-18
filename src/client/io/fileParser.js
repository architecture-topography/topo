function parseFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = () => {
            const result = {};
            try {
                result.accepted = JSON.parse(reader.result);
            } catch (e) {
                result.rejected = file;
            }
            return resolve(result)
        };
        reader.onabort = () => reject(new Error(`File parsing aborted: ${file.name}`));
        reader.onerror = () => reject(new Error(`File parsing error: ${file.name}`));

        reader.readAsBinaryString(file);
    });
}

export default parseFile;
