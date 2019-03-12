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

import React from 'react';
import { shallow } from 'enzyme';
import SystemList from './SystemList';

describe('SystemList', () => {
  let systems;
  beforeEach(() => {
    systems = [
      {
        id: 1,
        name: 'LeaveOz',
      },
      {
        id: 2,
        name: 'LeaveOz2',
      },
    ];
  });

  it('Should show SystemItem Components', () => {
    const system1 = systems[0].name;
    const system2 = systems[1].name;

    const root = shallow(<SystemList systems={systems} />);

    expect(
      root
        .find('SystemItem')
        .at(0)
        .props().name
    ).toEqual(system1);
    expect(
      root
        .find('SystemItem')
        .at(1)
        .props().name
    ).toEqual(system2);
  });

  it('Should pass ID as key for map', () => {
    const root = shallow(<SystemList systems={systems} />);

    expect(root.find('SystemItem').at(0).key).toBeDefined();
    expect(root.find('SystemItem').at(1).key).toBeDefined();
  });
});
