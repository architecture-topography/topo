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

export type TreasureMapCapability = ConfigFile.ICapability & {
  id: string;
  systems: TreasureMapAsset[];
};
export type TreasureMapDomain = ConfigFile.IDomain;
export type TreasureMapPlatform = ConfigFile.IPlatform;
export type TreasureMapAsset = AssetFile.IAsset;
export type TreasureMapData = ConfigFile.IFile;
