function parseFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onabort = () => reject(new Error(`File parsing aborted: ${file.name}`));
        reader.onerror = () => reject(new Error(`File parsing error: ${file.name}`));

        reader.readAsBinaryString(file);
    });
}

export default parseFile;
