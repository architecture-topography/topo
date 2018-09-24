import React from 'react';
import CapabilityView from '../../../src/client/components/CapabilityView';

describe('Capability View',()=>{
  let treasureMapData;

  beforeEach(() => {
    treasureMapData = {
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
      "others": []
    }
  })      
  it('renders the correct content for Capability View', ()=>{
      const capabilityId = "capability-1"
      const capability = treasureMapData.platforms[0].domains[0].capabilities[0];

      const wrapper = shallow(<CapabilityView treasureMapData={treasureMapData} capabilityId={capabilityId}/>)
      expect(wrapper.find('Header').at(0).render().text()).toEqual(capability.name)
  })

  it('renders the correct content for other capabilties of the system (should be every capability but the capability expanded)', ()=> {
    const capabilityId = "capability-1"
    const capability = treasureMapData.platforms[0].domains[0].capabilities[0];
    capability.systems = [{"name": "System 1", "capabilities": ["Capability 1", "Capability 2", "Capability 3"]}]
    const wrapper = shallow(<CapabilityView treasureMapData={treasureMapData} capabilityId={capabilityId}/>)
    expect(wrapper.find('Label').at(0).render().text()).toEqual(capability.systems[0].capabilities[1])
    expect(wrapper.find('Label').at(1).render().text()).toEqual(capability.systems[0].capabilities[2])
  })

  it('doesnt render "other capabilities" when there are no other capabilities but the one expanded on', ()=> {
    const capabilityId = "capability-1"
    const capability = treasureMapData.platforms[0].domains[0].capabilities[0];
    capability.systems = [{"name": "System 1", "capabilities": ["Capability 1"]}]
    const wrapper = shallow(<CapabilityView treasureMapData={treasureMapData} capabilityId={capabilityId}/>)
    expect(wrapper.find("#other-capabilities")).toHaveLength(0);
  })
});
