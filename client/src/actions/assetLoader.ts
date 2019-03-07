/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import { getResource } from './resourceLoaderApi';

export interface Asset {
  name: string;
  description: string;
  capabilities: string[];
  'primary-technologies': string[];
  'cycle-time-hours': string;
  'tech-lead': {
    name: string;
    email: string;
  };
  'source-url': string;
  'prod-url': string;
  'depends-on': Array<{
    target: string;
    nature: string;
  }>;
  'events-published': Array<{
    name: string;
  }>;
  infrastructure: string[];
  'last-update': string;
  createsEntity: string[];
  dependsOnEntity: string[];
}

export interface File {
  assets: Asset[];
}

export const load = (path: string | undefined) => {
  return getResource(path) as Promise<File>;
};
