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
import CapabilityView from './CapabilityView';
import { shallow } from 'enzyme';

describe('Capability View', () => {
  let treasureMapData;

  beforeEach(() => {
    treasureMapData = {
      platforms: [
        {
          name: 'Platform 1',
          domains: [
            {
              name: 'Domain 1',
              description: 'Description 1',
              capabilities: [
                { name: 'Capability 1', order: 1, id: 'capability-1' },
                { name: 'Capability 2', order: 2, id: 'capability-2' },
                { name: 'Capability 3', order: 3, id: 'capability-3' },
              ],
              color: '#85C1E9',
            },
          ],
        },
      ],
      others: [],
    };
  });

  it('if no systems, render SystemListWithData component', () => {
    const capabilityId = 'capability-1';
    const wrapper = shallow(
      <CapabilityView
        treasureMapData={treasureMapData}
        capabilityId={capabilityId}
      />
    );
    wrapper.setState({ gqlPlatforms: treasureMapData.platforms });
    expect(wrapper.find('SystemListWithData')).toExist();
  });

  it('renders the correct content for Capability View', () => {
    const capabilityId = 'capability-1';
    const domain = treasureMapData.platforms[0].domains[0];
    const capability = domain.capabilities[0];

    const wrapper = shallow(
      <CapabilityView
        treasureMapData={treasureMapData}
        capabilityId={capabilityId}
      />
    );

    wrapper.setState({ gqlPlatforms: treasureMapData.platforms });

    expect(
      wrapper
        .find('Header')
        .at(0)
        .render()
        .text()
    ).toEqual(capability.name + domain.name);
  });

  it('renders the correct content for other capabilties of the system (should be every capability but the capability expanded)', () => {
    const capabilityId = 'capability-1';
    const capability = treasureMapData.platforms[0].domains[0].capabilities[0];
    capability.systems = [
      {
        name: 'System 1',
        capabilities: ['Capability 1', 'Capability 2', 'Capability 3'],
      },
    ];
    const wrapper = shallow(
      <CapabilityView
        treasureMapData={treasureMapData}
        capabilityId={capabilityId}
      />
    );
    wrapper.setState({ gqlPlatforms: treasureMapData.platforms });
    const accordionWrapper = shallow(wrapper.find('Accordion').get(0));

    ['Capability 2', 'Capability 3'].forEach((element, index) => {
      expect(
        accordionWrapper
          .find('ListItem')
          .at(index)
          .render()
          .text()
      ).toEqual(element);
    });
  });

  it('doesnt render "other capabilities" when there are no other capabilities but the one expanded on', () => {
    const capabilityId = 'capability-1';
    const capability = treasureMapData.platforms[0].domains[0].capabilities[0];
    capability.systems = [{ name: 'System 1', capabilities: ['Capability 1'] }];
    const wrapper = shallow(
      <CapabilityView
        treasureMapData={treasureMapData}
        capabilityId={capabilityId}
      />
    );
    wrapper.setState({ gqlPlatforms: treasureMapData.platforms });
    const accordionWrapper = shallow(wrapper.find('Accordion').get(0));

    expect(accordionWrapper.find('#no-capabilities-text')).toHaveLength(1);
  });

  it('capability links to the correct capability page', () => {
    // for each capability in "others" link is correct
    const capabilityId = 'capability-1';
    const capability = treasureMapData.platforms[0].domains[0].capabilities[0];
    capability.systems = [
      {
        name: 'System 1',
        capabilities: ['Capability 1', 'Capability 2', 'Capability 3'],
      },
    ];
    const wrapper = shallow(
      <CapabilityView
        treasureMapData={treasureMapData}
        capabilityId={capabilityId}
      />
    );
    wrapper.setState({ gqlPlatforms: treasureMapData.platforms });
    const accordionWrapper = shallow(wrapper.find('Accordion').get(0));
    const listWrapper = accordionWrapper.find('List');

    ['Capability 2', 'Capability 3'].forEach((element, index) => {
      expect(
        listWrapper
          .find('ListItem')
          .at(index)
          .prop('href')
      ).toEqual('/#/capability/capability-' + (index + 2));
    });
  });
});
