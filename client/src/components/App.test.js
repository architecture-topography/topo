/* Copyright (c) 2018-2019 Thoughtworks Inc. All rights reserved. */

import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

const config = {
  platforms: [
    {
      name: "Platform 1",
      domains: [
        {
          name: "Domain 1",
          description: "Description 1",
          capabilities: [{ name: "Capability 1", order: 1 }]
        }
      ]
    }
  ],
  others: []
};

const systems = {
  assets: [
    {
      name: "Test Name",
      description: "Test Description",
      capabilities: ["Capability 1"],
      infrastructure: ["aws"]
    }
  ]
};

describe("<App />", () => {
  it("should render without crashing", () => {
    const div = document.createElement("div");
    const wrapper = ReactDOM.render(
      <App config={config} systems={systems} />,
      div
    );
    expect(wrapper.props.config).toEqual(config);

    ReactDOM.unmountComponentAtNode(div);
  });
});
