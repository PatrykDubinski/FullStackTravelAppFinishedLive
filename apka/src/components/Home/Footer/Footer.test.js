import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import Footer from "./Footer";
import { findByDataAttr } from "../../../Utilities/testUtils";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<Footer {...props} />);
  return component;
};

describe("<Footer /> Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("Should render without errors", () => {
    const component = findByDataAttr(wrapper, "footer");
    expect(component.length).toBe(1);
  });
});
