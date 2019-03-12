/*
 * Copyright 2018-2019 Thoughtworks Inc. All rights reserved
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
import ReactDOM from 'react-dom';

import App from './App';

const config = {
  platforms: [
    {
      name: 'Platform 1',
      domains: [
        {
          name: 'Domain 1',
          description: 'Description 1',
          capabilities: [{ name: 'Capability 1', order: 1 }],
        },
      ],
    },
  ],
  others: [],
};

const systems = {
  assets: [
    {
      name: 'Test Name',
      description: 'Test Description',
      capabilities: ['Capability 1'],
      infrastructure: ['aws'],
    },
  ],
};

describe('<App />', () => {
  it('should render without crashing', () => {
    const div = document.createElement('div');
    const wrapper = ReactDOM.render(
      <App config={config} systems={systems} />,
      div
    );
    expect(wrapper.props.config).toEqual(config);

    ReactDOM.unmountComponentAtNode(div);
  });
});
