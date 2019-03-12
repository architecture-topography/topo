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

import { getResource } from './resourceLoaderApi';

export interface IAsset {
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

export interface IFile {
  assets: IAsset[];
}

export const load = (path: string | undefined) => {
  return getResource(path) as Promise<IFile>;
};
