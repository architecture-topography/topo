import React from 'react';

const mappingConfig = JSON.parse(process.CONFIG_FILE_MAPPING);

export const ConfigMappingContext = React.createContext(mappingConfig);
