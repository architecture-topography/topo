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

import React from 'react';
import { mount } from 'enzyme';
import SystemItem from './SystemItem';

describe('SystemItem', () => {
  it('Should show name of system', () => {
    const name = 'really cool system';
    const root = mount(<SystemItem name={name} />);
    expect(root.text()).toContain(name);
  });
  it('Should show name of systems', () => {
    const name = 'really cool systems';
    const root = mount(<SystemItem name={name} />);
    expect(root.text()).toContain(name);
  });

  it('Should show technologies', () => {
    const name = 'really cool systems';
    const technologies = [
      {
        id: 'tech-01',
        name: 'react',
      },
      {
        id: 'tech-02',
        name: 'typescript',
      },
      {
        id: 'tech-03',
        name: 'graphql',
      },
    ];

    const root = mount(<SystemItem name={name} technologies={technologies} />);

    expect(root).toIncludeText('Primary technologies');
    expect(root).toIncludeText(technologies[0].name);
    expect(root).toIncludeText(technologies[1].name);
    expect(root).toIncludeText(technologies[2].name);
  });

  it("Should show 'none' if no technologies present", () => {
    const technologies = [];
    const name = 'really cool systems';

    const root = mount(<SystemItem name={name} technologies={technologies} />);
    expect(root).toIncludeText('Primary technologies');
    expect(root).toIncludeText('None');
  });
});
