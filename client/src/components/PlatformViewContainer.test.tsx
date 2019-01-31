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
