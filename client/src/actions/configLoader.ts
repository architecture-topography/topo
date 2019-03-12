/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import { getResource } from './resourceLoaderApi';

export interface ICapability {
  name: string;
  order: number;
}

export interface IDomain {
  name: string;
  description: string;
  capabilities: ICapability[];
  color?: string;
}

export interface IPlatform {
  name: string;
  domains: IDomain[];
}

export interface IFile {
  platforms: IPlatform[];
}

export const load = (path: string | undefined) => {
  return getResource(path) as Promise<File>;
};
