/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import React from "react";
import { mount } from "enzyme";
import { MockedProvider } from "react-apollo/test-utils";
import SystemListWithData, { GET_SYSTEMS } from "./SystemListWithData";
const wait = require("waait");

describe("SystemListWithData", () => {
  const capabilityId = "capability-001";
  const systems = [
    {
      id: "test-01",
      name: "LeaveOz",
      technologies: []
    },
    {
      id: "test-02",
      name: "LeaveOz2",
      technologies: []
    }
  ];

  const mocks = [
    {
      request: {
        query: GET_SYSTEMS,
        variables: { capabilityId }
      },
      result: {
        data: {
          systems
        }
      }
    }
  ];
  it("Should show loading text while getting data", () => {
    const root = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SystemListWithData capabilityId={capabilityId} />
      </MockedProvider>
    );
    expect(root.text()).toEqual("Loading...");
  });

  it("Should show error in UI", async () => {
    const errorMock = {
      ...mocks[0],
      error: new Error("Error! Getting systems")
    };

    const root = mount(
      <MockedProvider mocks={[errorMock]} addTypeName={false}>
        <SystemListWithData capabilityId={capabilityId} />
      </MockedProvider>
    );

    await wait(0);
    root.update();

    expect(root.text()).toEqual("Error! Getting systems");
  });

  it("Should pass data correctly on success", async () => {
    const root = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <SystemListWithData capabilityId={capabilityId} />
      </MockedProvider>
    );

    await wait(0);
    root.update();

    expect(root.find("SystemList").props().systems).toEqual(systems);
  });
});
