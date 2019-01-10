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
import Domain from './Domain';

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
        expect(wrapper.find('.domain-name').at(0).text()).toEqual(name)
        expect(wrapper.find('.domain-desc').at(0).text()).toEqual(`"${description}"`)
        expect(wrapper.find('Capability')).toHaveLength(3)

    })

    it('renders capability in the correct order', () => {
        const name = "Domain 1"
        const description = "Description 1"
        const capabilities = [
            {"name": "Capability 3", "order": 3},
            {"name": "Capability 1", "order": 1},
            {"name": "Capability 2", "order": 2}
        ]

        const wrapper = shallow(<Domain name={name} description={description} capabilities={capabilities}/>)
        expect(wrapper.find('Capability').get(0).props.order).toEqual(1);
        expect(wrapper.find('Capability').get(1).props.order).toEqual(2);
        expect(wrapper.find('Capability').get(2).props.order).toEqual(3);
    })

    it('domain and capabilities with no color specified in the json uses the default domain color',()=> {
        const name = "Domain 1"
        const description = "Description 1"
        const capabilities = [
            {"name": "Capability 3", "order": 3},
            {"name": "Capability 1", "order": 1},
            {"name": "Capability 2", "order": 2}
        ]

        const wrapper = shallow(<Domain name={name} description={description} capabilities={capabilities}/>)
        const segments = wrapper.find('Segment');
        segments.forEach(element => {
            expect(element.get(0).props.style.backgroundColor).toContain("#AAB7B8");
        });
    })

    it('domain and capabilities with #123456 color specified in the json uses that color',()=> {
        const name = "Domain 1"
        const description = "Description 1"
        const capabilities = [
            {"name": "Capability 3", "order": 3},
            {"name": "Capability 1", "order": 1},
            {"name": "Capability 2", "order": 2}
        ]
        const color = "#123456"

        const wrapper = shallow(<Domain name={name} description={description} capabilities={capabilities} color={color} />)
        const segments = wrapper.find('Segment');
        segments.forEach(element => {
            expect(element.get(0).props.style.backgroundColor).toContain("#123456");
        });
    })

    it('domain and capabilities with invalid hex in the json uses the default color',()=> {
        const name = "Domain 1"
        const description = "Description 1"
        const capabilities = [
            {"name": "Capability 3", "order": 3},
            {"name": "Capability 1", "order": 1},
            {"name": "Capability 2", "order": 2}
        ]
        const color = "#123aaa456"

        const wrapper = shallow(<Domain name={name} description={description} capabilities={capabilities} color={color} />)
        const segments = wrapper.find('Segment');
        segments.forEach(element => {
            expect(element.get(0).props.style.backgroundColor).toContain("#AAB7B8");
        });
    })

});
