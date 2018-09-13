import React from 'react';
import DomainView from '../../src/client/components/DomainView';
import {shallow} from 'enzyme';

describe('DomainView',()=>{

    it('renders correctly',()=>{

      const wrapper = shallow(<DomainView />);
      expect(wrapper).toBeDefined()

    })
})
