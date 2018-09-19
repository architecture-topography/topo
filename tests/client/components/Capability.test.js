import React from 'react';
import Domain from '../../../src/client/components/Capability';
import Capability from '../../../src/client/components/Capability';

describe('Capability',()=>{

    it('renders the correct content for Capability',()=>{

        const name = "Capability 1"
        const wrapper = shallow(<Capability name={name} />)
        expect(wrapper.find('Segment').get(0).props.content).toEqual(name)
    })
});
