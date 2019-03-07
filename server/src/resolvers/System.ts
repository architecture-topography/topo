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

import { Context, System } from "../domain";

const System = {
  id: (parent: System) => {
    return parent.uid;
  },
  technologies: async (parent: System, args: null, context: Context) => {
    const technologies = await context.queries.findTechnologiesBySystemId(
      parent.uid
    );
    return technologies;
  }
};

export default System;
