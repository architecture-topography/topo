import React from 'react';
import Domain from '../../src/client/components/Domain';

describe('Domain',()=>{

    it('renders the correct content for Domain',()=>{

        const name = "Domain 1"
        const description = "Description 1"
        const capabilities = [
            {"name": "Capability 1", "order": 1},
            {"name": "Capability 2", "order": 2},
            {"name": "Capability 3", "order": 3}
        ]
    
        const wrapper = shallow(<Domain name={name} description={description} capabilities={capabilities}/>)
        expect(wrapper.find('.domain-name').children().at(1).text()).toEqual(name)
        expect(wrapper.find('.domain-desc').children().at(1).text()).toEqual(description)
        expect(wrapper.find('.domain-cap')).toHaveLength(3)
    })
});
