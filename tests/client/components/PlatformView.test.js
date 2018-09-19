import React from 'react';
import PlatformView from '../../../src/client/components/PlatformView';
import {shallow} from 'enzyme';

describe('PlatformView', () => {
    it('renders a platform',()=>{
        const platforms = [
            {
                "name": "platform 1",
                "domains": [
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
            }
        ]

        const wrapper = shallow(<PlatformView platforms={platforms} />)
        expect(wrapper.find('.platform-name-title').at(0).render().text()).toEqual(platforms[0].name)
        expect(wrapper.find('.platform-domains').length).toEqual(1)
    })
})
