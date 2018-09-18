import React from 'react';
import DomainView from '../../src/client/components/DomainView';
import { shallow } from 'enzyme';

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
    expect(wrapper.find('Domain')).toHaveLength(2)

  })

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
      }
    ]

    const wrapper = shallow(<DomainView domains={domains} />);
    expect(wrapper.find('Domain')).toHaveLength(1)

  })
})
