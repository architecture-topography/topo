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

import dbQueries from './dbQueries';

export interface IBaseNode {
  uid: string;
  id?: string;
  name: string;
}

export interface IBox extends IBaseNode {
  children: IBox[];
}

export interface IPlatform extends IBaseNode {
  domains: IDomain[];
}

export interface IDomain extends IBaseNode {
  capabilities: ICapability[];
}

export interface ICapability extends IBaseNode {
  systems: ISystem[];
}

export interface ISystem extends IBaseNode {
  technologies: IBaseNode[];
}

export interface IContext {
  queries: dbQueries;
}
