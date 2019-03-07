/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import React from "react";
import PlatformView from "./PlatformView";
import { shallow } from "enzyme";

describe("PlatformView", () => {
  it("renders a platform", () => {
    const treasureMapData = {
      platforms: [
        {
          name: "platform 1",
          domains: [
            {
              name: "Domain 1",
              description: "Description 1",
              capabilities: [
                { name: "Capability 1", order: 1 },
                { name: "Capability 2", order: 2 },
                { name: "Capability 3", order: 3 }
              ]
            },
            {
              name: "Domain 2",
              description: "Description 2",
              capabilities: [
                { name: "Capability 1", order: 1 },
                { name: "Capability 2", order: 2 },
                { name: "Capability 3", order: 3 }
              ]
            }
          ]
        }
      ]
    };

    const wrapper = shallow(<PlatformView treasureMapData={treasureMapData} />);
    expect(
      wrapper
        .find(".header")
        .at(0)
        .render()
        .text()
    ).toEqual(treasureMapData.platforms[0].name);
    expect(wrapper.find(".platform-domains").length).toEqual(1);
  });
});
