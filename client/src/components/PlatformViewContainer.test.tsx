/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import { mount } from 'enzyme';
import React from 'react';
import { MockedProvider } from 'react-apollo/test-utils';
import PlatformViewContainer, { GET_PLATFORMS } from './PlatformViewContainer';
const wait = require('waait');

const mocks = [
  {
    request: {
      query: GET_PLATFORMS,
    },
    result: {
      data: {
        platforms: [
          {
            id: '0',
            name: 'TW_test',
            domains: [
              {
                id: '1',
                name: 'Katie',
                capabilities: [
                  {
                    name: 'test capability',
                    id: '657',
                    __typename: 'Capability',
                  },
                ],
                __typename: 'Domain',
              },
            ],
            __typename: 'Platform',
          },
        ],
      },
    },
  },
];

describe('PlatformViewContainer', () => {
  it('Shows questionably good looking error message', async () => {
    const errorMock = {
      error: new Error('oh no'),
      request: {
        query: GET_PLATFORMS,
      },
    };

    const component = mount(
      <MockedProvider mocks={[errorMock]}>
        <PlatformViewContainer />
      </MockedProvider>
    );

    await wait(0);
    component.update();

    expect(component.text()).toContain('Error connecting to database');
  });
  it('renders a platform', async () => {
    const component = mount(
      <MockedProvider mocks={mocks}>
        <PlatformViewContainer />
      </MockedProvider>
    );

    await wait(0);
    component.update();

    expect(component.debug()).toContain('TW_test');
  });
  it('renders a domain', async () => {
    const component = mount(
      <MockedProvider mocks={mocks}>
        <PlatformViewContainer />
      </MockedProvider>
    );

    await wait(0);
    component.update();

    expect(component.debug()).toContain('Katie');
  });

  it('renders a capability', async () => {
    const component = mount(
      <MockedProvider mocks={mocks}>
        <PlatformViewContainer />
      </MockedProvider>
    );

    await wait(0);
    component.update();

    expect(component.debug()).toContain('Capability');
  });
});
