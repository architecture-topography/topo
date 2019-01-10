import * as ConfigFile from "../actions/configLoader";
import * as AssetFile from "../actions/assetLoader";

export type TreasureMapCapability = ConfigFile.Capability & {
  id: string;
  systems: TreasureMapAsset[];
};
export type TreasureMapDomain = ConfigFile.Domain;
export type TreasureMapPlatform = ConfigFile.Platform;
export type TreasureMapAsset = AssetFile.Asset;
export type TreasureMapData = ConfigFile.File;
