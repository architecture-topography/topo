function mapTreasureMapData(treasureMapData, systemMapping) {
    systemMapping.forEach(system => {
        system.capabilities.forEach(systemCapability => {
            treasureMapData.platforms.forEach(platform => {
                platform.domains.forEach(domain => {
                    domain.capabilities.forEach(domainCapability => {
                        if (!domainCapability.systems) domainCapability.systems = [];

                        if (_stringEquals(domainCapability.name, systemCapability)) {
                            if (!_arrayContains(domainCapability.systems, system)) {
                                domainCapability.systems.push(system);
                            }
                        }
                    });
                })
            });
        })
    });

    return treasureMapData;
}

function _arrayContains(array, element) {
    return array.includes(element)
}

function _stringEquals(first, second){
    return first.toLowerCase() === second.toLowerCase()
}

export default {
    mapTreasureMapData: mapTreasureMapData
};
