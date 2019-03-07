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
  createPlatform: async (
    parent: IPlatform,
    args: { name: string; id: string },
    context: IContext
  ) => {
    const platform = await context.queries.createPlatform(args.name, args.id);
    return platform;
  },
};

export default Mutation;
