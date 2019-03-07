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

import { driver } from '../../src/neo';

export const clearDb = async () => {
  const session = driver.session();
  try {
    await session.run('MATCH (n) DETACH DELETE n');
  } catch {
    console.error('Could not delete nodes');
    throw new Error('Could not delete nodes');
  } finally {
    session.close();
  }
};
