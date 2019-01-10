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

import React from 'react';
import DomainView from '../../../src/client/components/DomainView';
import { shallow } from 'enzyme';
import { stringify } from 'postcss';

describe('DomainView',()=>{
  it('renders the correct number of Domains',()=>{

    const domains = [
      {
        "name": "Domain 1",
        "description": "Description 1",
        "capabilities": [
            {"name": "Capability 1", "order": 1},
            {"name": "Capability 2", "order": 2},
            {"name": "Capability 3", "order": 3}
        ]
      },
      {
        "name": "Domain 2",
        "description": "Description 2",
        "capabilities": [
          {"name": "Capability 1", "order": 1},
          {"name": "Capability 2", "order": 2},
          {"name": "Capability 3", "order": 3}
        ]
      }
    ]

    const wrapper = shallow(<DomainView domains={domains} />);
    const popups = wrapper.find('Popup');
    popups.forEach((popup, index) => {
      const domaninCardNode = shallow(popup.prop('trigger'));
      const domainCardContent = domaninCardNode.find('CardContent');
      expect(domainCardContent.prop('header')).toContain(domains[index].name);
    })
  })
})
