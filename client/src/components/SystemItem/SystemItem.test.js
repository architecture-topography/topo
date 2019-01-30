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
});
