/*
 * Copyright 2018-2019 Thoughtworks Inc. All rights reserved
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
import * as AssetFile from '../actions/assetLoader';
import * as ConfigFile from '../actions/configLoader';
import { TreasureMapData } from '../domain/treasureMap';

const findLastIndex = <T extends any>(arr: T[], fn: (value: T) => boolean) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (fn(arr[i])) {
      return i;
    }
  }

  return -1;
};

const buildTreasureMapData = (
  treasureMapData: ConfigFile.IFile,
  systemMapping: AssetFile.IFile
): TreasureMapData => {
  let capabilityId = 1;

  return {
    platforms: treasureMapData.platforms.map(platform => ({
      ...platform,
      domains: platform.domains.map(domain => ({
        ...domain,
        capabilities: domain.capabilities.map(capability => {
          const assets = systemMapping.assets
            .filter(x => x.capabilities.includes(capability.name))
            // TODO: Remove the filter line below once we have a backend.
            // This de-duplicates the array of systems AND makes sure we pick
            // the last definition of a system if there are duplicates. I'd much
            // rather we guarantee a lack of duplicates in the response rather
            // than faffing with it here. Even better would be to use a
            // dedicated ID rather than the name.
            .filter(
              (a, index, arr) =>
                findLastIndex(arr, b => _stringEquals(a.name, b.name)) === index
            );

          return {
            ...capability,
            id: (capabilityId++).toString(),
            systems: assets,
          };
        }),
      })),
    })),
  };
};

function _stringEquals(first: string, second: string) {
  return first.toLowerCase() === second.toLowerCase();
}

export default {
  buildTreasureMapData,
};
