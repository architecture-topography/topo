/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import { getResource } from './resourceLoaderApi';

export interface Capability {
  name: string;
  order: number;
}

export interface Domain {
  name: string;
  description: string;
  capabilities: Capability[];
  color?: string;
}

export interface Platform {
  name: string;
  domains: Domain[];
}

export interface File {
  platforms: Platform[];
}

export const load = (path: string | undefined) => {
  return getResource(path) as Promise<File>;
};
