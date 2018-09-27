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
    const popupWrapper = shallow(wrapper.find('Popup').get(0));
    const node = popupWrapper.prop('trigger');
    const debug = shallow(node);
    const d = debug.find('CardContent');
    expect(d.prop('header')).toContain('Domain 1');
  })
})
