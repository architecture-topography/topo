import React from 'react';
import Domain from '../../../src/client/components/Capability';
import Capability from '../../../src/client/components/Capability';

describe('Capability',()=>{

    it('renders the correct content for Capability',()=>{

        const capability = {
            "name": "Capability 1",
            "description": "Capability description",
            "color": "red"
        }

        const wrapper = shallow(<Capability {...capability} />)
        expect(wrapper.find('.capability-name').at(0).render().text()).toEqual(capability.name)
        expect(wrapper.find('.capability-desc').at(0).render().text()).toEqual(`"${capability.description}"`)
        expect(wrapper.find('.capability-name').at(0).render().prop('style')).toHaveProperty('background-color', capability.color)
        expect(wrapper.find('.capability-desc').at(0).render().prop('style')).toHaveProperty('background-color', capability.color)
    })
});
