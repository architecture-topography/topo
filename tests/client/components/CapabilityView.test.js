import React from 'react';
import CapabilityView from '../../../src/client/components/CapabilityView';

describe('Capability View',()=>{
    const treasureMapData = {
        "platforms": [
          {
            "name": "Platform 1",
            "domains": [
              {
                "name": "Domain 1",
                "description": "Description 1",
                "capabilities": [
                  {"name": "Capability 1", "order": 1, "id": "capability-1"},
                  {"name": "Capability 2", "order": 2},
                  {"name": "Capability 3", "order": 3}
                ],
                "color": "#85C1E9"
              },
            ]
          }
        ],
        "capabilities": {
          "capability-1": {
            "comment": "To do: refactor so capability isn't a top-level item.",
            "name": "Capability 1",
            "systems": [{
              "name": "System 1",
          "description": "System 1 desc",
                "capabilities": ["Other capability 1", "Other capability 2"]
            }]
          }
        },
        "others": []
      }
      

    it('renders the correct content for Capability View', ()=>{
        
        const capabilityId = "capability-1"
        const capability = treasureMapData.capabilities["capability-1"];

        const wrapper = shallow(<CapabilityView treasureMapData={treasureMapData} capabilityId={capabilityId}/>)
        expect(wrapper.find('Header').at(0).render().text()).toEqual(capability.name)
        expect(wrapper.find('Header').at(1).render().text()).toEqual(capability.systems[0].name)
        expect(wrapper.find('Container').at(0).render().text()).toContain(capability.systems[0].capabilities.join(", "))
    })
});
