import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { findByDataAttr } from "../../../Utilities/testUtils";
import InstructionsPage from "./InstructionsPage";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<InstructionsPage {...props} />);
  return component;
};

describe("<InstructionsPage /> Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("Should render without errors", () => {
    const component = findByDataAttr(wrapper, "instructionsPage");
    expect(component.length).toBe(1);
  });
});
