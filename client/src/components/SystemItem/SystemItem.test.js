import React from "react";
import { shallow } from "enzyme";
import SystemItem from "./SystemItem";

describe("SystemItem", () => {
  it("Should show name of system", () => {
    const name = "really cool system";
    const root = shallow(<SystemItem name={name} />);
    expect(root.debug()).toContain(name);
  });
  it("Should show name of systems", () => {
    const name = "really cool systems";
    const root = shallow(<SystemItem name={name} />);
    expect(root.debug()).toContain(name);
  });
});
