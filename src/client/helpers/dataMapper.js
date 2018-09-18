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
                            } else {
                                const currentSystem = domainCapability.systems.find(currentSystem => currentSystem.name === system.name);
                                if (JSON.stringify(currentSystem) !== JSON.stringify(system)) {
                                    const position = domainCapability.systems.indexOf(currentSystem);
                                    const totalToDelete = 1;
                                    domainCapability.systems.splice(position, totalToDelete, system)
                                }
                            }
                        }
                    });
                })
            });
        })
    });

    return treasureMapData;
}

function _arrayContains(systems, otherSystem) {
    return systems.filter((system) => system.name === otherSystem.name).length > 0;
}

function _stringEquals(first, second){
    return first.toLowerCase() === second.toLowerCase()
}

export default {
    mapTreasureMapData: mapTreasureMapData
};
