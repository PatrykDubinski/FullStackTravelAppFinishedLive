import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { checkProps, findByDataAttr } from "../../../../../Utilities/testUtils";
import NavItem from "./NavItem";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<NavItem {...props} />);
  return component;
};

describe("<NavItem /> Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("Should render without errors", () => {
    const component = findByDataAttr(wrapper, "navItem");
    expect(component.length).toBe(1);
  });
});

describe("Checking PropTypes in <NavItem />", () => {
  it("Should not throw a warning", () => {
    const expectedProps = {
      children: "Test",
      path: "Test-Path",
    };
    const propsError = checkProps(NavItem, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
