import React from "react";
import { mount } from "enzyme";
import SystemItem from "./SystemItem";

describe("SystemItem", () => {
  it("Should show name of system", () => {
    const name = "really cool system";
    const root = mount(<SystemItem name={name} />);
    expect(root.text()).toContain(name);
  });
  it("Should show name of systems", () => {
    const name = "really cool systems";
    const root = mount(<SystemItem name={name} />);
    expect(root.text()).toContain(name);
  });

  it("Should show technologies", () => {
    const name = "really cool systems";
    const technologies = [
      {
        id: "tech-01",
        name: "react"
      },
      {
        id: "tech-02",
        name: "typescript"
      },
      {
        id: "tech-03",
        name: "graphql"
      }
    ];

    const root = mount(<SystemItem name={name} technologies={technologies} />);

    expect(root).toIncludeText("Primary technologies");
    expect(root).toIncludeText(technologies[0].name);
    expect(root).toIncludeText(technologies[1].name);
    expect(root).toIncludeText(technologies[2].name);
  });

  it("Should show 'none' if no technologies present", () => {
    const technologies = [];
    const name = "really cool systems";

    const root = mount(<SystemItem name={name} technologies={technologies} />);
    expect(root).toIncludeText("Primary technologies");
    expect(root).toIncludeText("None");
  });
});
