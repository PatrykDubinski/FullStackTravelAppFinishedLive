import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { findByDataAttr } from "../../../Utilities/testUtils";
import Greetings from "./Greetings";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<Greetings {...props} />);
  return component;
};

describe("<Greetings /> Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("Should render without errors", () => {
    const component = findByDataAttr(wrapper, "greetings");
    expect(component.length).toBe(1);
  });

  it("Should render img", () => {
    const component = findByDataAttr(wrapper, "greetings__right");
    expect(component.find("img").exists()).toEqual(true);
  });
});
