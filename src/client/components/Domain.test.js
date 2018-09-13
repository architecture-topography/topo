import { mount } from 'enzyme';
import { StaticRouter } from 'react-router-dom'
import React from 'react'
import Domain from './Domain';

describe('DomainWidget',()=>{

    it('renders the widget', ()=>{
    const component = mount(<StaticRouter context={{needed:"forTest"}}>
            <Domain />
        </StaticRouter>);
    })
})
