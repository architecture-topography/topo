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

import { IContext, IPlatform } from '../types';

const Mutation = {
  createDomain: async (
    _parent: IPlatform,
    args: { name: string; id: string; parentId?: string },
    context: IContext
  ) => {
    const domain = await context.queries.createDomain(
      args.name,
      args.id,
      args.parentId
    );
    if (args.parentId) {
      const line = await context.queries.createLine(args.parentId, args.id);
    }
    return domain;
  },
  createPlatform: async (
    _parent: IPlatform,
    args: { name: string; id: string },
    context: IContext
  ) => {
    const platform = await context.queries.createPlatform(args.name, args.id);
    return platform;
  },
};

export default Mutation;
