function mapTreasureMapData(treasureMapData, systemMapping) {
    if (Array.isArray(systemMapping)) {
        if (systemMapping.length > 0 && systemMapping[0].hasOwnProperty('assets') && Array.isArray(systemMapping[0].assets)) {
            systemMapping = systemMapping[0].assets;
        }

        systemMapping.forEach(system => mapSystemToCapability(system, treasureMapData));
    }

    return treasureMapData;
}

function mapSystemToCapability(system, treasureMapData) {
    // Worth validating the entire json structure for each system not only capabilities
    if (!system.capabilities) {
        throw Error("System file does not contain capabilities")
    }

    return system.capabilities.map(systemCapability =>
        treasureMapData.platforms.map(platform =>
            platform.domains.map(domain =>
                domain.capabilities.map(domainCapability => {
                    if (!domainCapability.systems) domainCapability.systems = [];

                    if (_stringEquals(domainCapability.name, systemCapability)) {
                        const currentSystem = _findByName(domainCapability.systems, system);
                        if (!currentSystem) {
                            domainCapability.systems.push(system);
                        } else {
                            if (JSON.stringify(currentSystem) !== JSON.stringify(system)) {
                                const position = domainCapability.systems.indexOf(currentSystem);
                                const totalToDelete = 1;
                                domainCapability.systems.splice(position, totalToDelete, system)
                            }
                        }
                    }

                    return domainCapability;
                })
            )
        )
    );
}

function _findByName(array, elementToFind) {
    return array.find((element) => element.name === elementToFind.name);
}

function _stringEquals(first, second) {
    return first.toLowerCase() === second.toLowerCase()
}

export default {
    mapTreasureMapData: mapTreasureMapData
};
