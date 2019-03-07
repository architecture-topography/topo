/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import React from "react";
import Capability from "./Capability";
import { mount } from "enzyme";

describe("Capability", () => {
  it("renders the correct content for Capability", () => {
    const capability = {
      name: "Capability 1",
      description: "Capability description",
      color: "red"
    };

    const wrapper = mount(<Capability {...capability} />);
    expect(
      wrapper
        .find(".capability-name")
        .at(0)
        .text()
    ).toEqual(capability.name);
  });
});
