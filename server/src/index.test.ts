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

import { createTestClient } from 'apollo-server-testing';
import server from './server';

it('should return hello', async () => {
  const expectedResponse = {
    hello: 'Hello, Topo',
  };

  const { query } = createTestClient(server);

  const response = await query({ query: 'query { hello }' });

  expect(response.data).toEqual(expectedResponse);
});
