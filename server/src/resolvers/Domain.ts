/*
 * Copyright 2019 Thoughtworks Inc. All rights reserved
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

import { Domain, Context } from "../domain";

const System = {
  id: async (parent: Domain) => {
    return parent.uid;
  },
  capabilities: async (parent: Domain, _args: null, context: Context) => {
    return context.queries.findCapabilitiesByDomainId(parent.uid);
  }
};

export default System;
