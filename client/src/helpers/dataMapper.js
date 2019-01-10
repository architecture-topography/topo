/**
 * Copyright 2018 Thoughtworks Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

function buildTreasureMapData(treasureMapData, systemMapping) {
  systemMapping.assets.map(system =>
    _mapSystemToCapability(system, treasureMapData)
  );

  return treasureMapData;
}

function _mapSystemToCapability(system, treasureMapData) {
  // Worth validating the entire json structure for each system not only capabilities
  if (!system.capabilities) {
    throw Error("System file does not contain capabilities");
  }

  let capabilityId = 1;

  return system.capabilities.map(systemCapability =>
    treasureMapData.platforms.map(platform =>
      platform.domains.map(domain =>
        domain.capabilities.map(domainCapability => {
          if (!domainCapability.systems) domainCapability.systems = [];
          if (!domainCapability.id) domainCapability.id = `${capabilityId++}`;
          const capability =
            typeof systemCapability === "object"
              ? systemCapability.capability
              : systemCapability;

          if (_stringEquals(domainCapability.name, capability)) {
            const currentSystem = _findByName(domainCapability.systems, system);
            if (!currentSystem) {
              domainCapability.systems.push(system);
            } else {
              if (JSON.stringify(currentSystem) !== JSON.stringify(system)) {
                const position = domainCapability.systems.indexOf(
                  currentSystem
                );
                const totalToDelete = 1;
                domainCapability.systems.splice(
                  position,
                  totalToDelete,
                  system
                );
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
  return array.find(element => element.name === elementToFind.name);
}

function _stringEquals(first, second) {
  return first.toLowerCase() === second.toLowerCase();
}

export default {
  buildTreasureMapData: buildTreasureMapData
};
