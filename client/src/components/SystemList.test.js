/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

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
