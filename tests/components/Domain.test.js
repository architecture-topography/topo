import React from 'react';
import Domain from '../../src/client/components/Domain';

describe('Domain',()=>{


    it('renders the widget', ()=>{
    const component = mount(<Domain />);
    expect(component).toBeDefined();
    });


});
