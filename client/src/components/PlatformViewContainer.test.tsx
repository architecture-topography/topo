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

import React from "react";
import { mount } from "enzyme";
import PlatformViewContainer, { GET_PLATFORMS } from "./PlatformViewContainer";
import { MockedProvider } from "react-apollo/test-utils";
const wait = require("waait");

const mocks = [
  {
    request: {
      query: GET_PLATFORMS
    },
    result: {
      data: {
        platforms: [
          {
            id: "0",
            name: "TW_test",
            domains: [
              {
                id: "1",
                name: "Katie",
                capabilities: [
                  {
                    name: "test capability",
                    id: "657",
                    __typename: "Capability"
                  }
                ],
                __typename: "Domain"
              }
            ],
            __typename: "Platform"
          }
        ]
      }
    }
  }
];

describe("PlatformViewContainer", () => {
  it("Shows questionably good looking error message", async () => {
    const errorMock = {
      request: {
        query: GET_PLATFORMS
      },
      error: new Error("oh no")
    };

    const component = mount(
      <MockedProvider mocks={[errorMock]}>
        <PlatformViewContainer />
      </MockedProvider>
    );

    await wait(0);
    component.update();

    expect(component.text()).toContain("Error connecting to database");
  });
  it("renders a platform", async () => {
    const component = mount(
      <MockedProvider mocks={mocks}>
        <PlatformViewContainer />
      </MockedProvider>
    );

    await wait(0);
    component.update();

    expect(component.debug()).toContain("TW_test");
  });
  it("renders a domain", async () => {
    const component = mount(
      <MockedProvider mocks={mocks}>
        <PlatformViewContainer />
      </MockedProvider>
    );

    await wait(0);
    component.update();

    expect(component.debug()).toContain("Katie");
  });

  it("renders a capability", async () => {
    const component = mount(
      <MockedProvider mocks={mocks}>
        <PlatformViewContainer />
      </MockedProvider>
    );

    await wait(0);
    component.update();

    expect(component.debug()).toContain("Capability");
  });
});
