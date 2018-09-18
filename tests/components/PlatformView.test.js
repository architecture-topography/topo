import React from 'react';
import PlatformView from '../../src/client/components/PlatformView';
import {shallow} from 'enzyme';

describe('PlatformView', () => {
    it('renders a platform title',()=>{
        const name = "platform 1"
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

        const wrapper = shallow(<PlatformView name={name} domains={domains}/>)
        expect(wrapper.find('.platform-name').at(0).shallow().text()).toEqual(name)
        expect(wrapper.find('.platform-domains').length).toEqual(1)
    })
})
