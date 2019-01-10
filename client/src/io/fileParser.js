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

function parseFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = {};
      try {
        result.accepted = JSON.parse(reader.result);
      } catch (e) {
        result.rejected = file;
      }
      return resolve(result);
    };
    reader.onabort = () =>
      reject(new Error(`File parsing aborted: ${file.name}`));
    reader.onerror = () =>
      reject(new Error(`File parsing error: ${file.name}`));

    reader.readAsBinaryString(file);
  });
}

export default parseFile;
