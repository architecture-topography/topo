/**
 * Copyright 2018 Thoughtworks Inc. All rights reserved.
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

import { Context, Platform } from "../domain";

const Query = {
  hello: () => "Hello, Topo",
  platforms: async (parent: Platform, args: null, context: Context) => {
    const platforms = await context.queries.findPlatforms();

    return platforms;
  },

  systems: async (
    _parent: Platform,
    args: { capabilityId: String },
    context: Context
  ) => {
    const systems = await context.queries.findSystemsByCapabilityId(
      args.capabilityId
    );

    return systems;
  }
};

export default Query;
