/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */
import * as AssetFile from '../actions/assetLoader';
import * as ConfigFile from '../actions/configLoader';

export type TreasureMapCapability = ConfigFile.ICapability & {
  id: string;
  systems: TreasureMapAsset[];
};
export type TreasureMapDomain = ConfigFile.IDomain;
export type TreasureMapPlatform = ConfigFile.IPlatform;
export type TreasureMapAsset = AssetFile.Asset;
export type TreasureMapData = ConfigFile.IFile;
