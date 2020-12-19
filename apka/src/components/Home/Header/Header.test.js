import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { findByDataAttr, checkProps } from "../../../Utilities/testUtils";
import Header from "./Header";
import Nav from "./Nav/Nav";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<Header {...props} />);
  return component;
};

describe("<Header /> Component", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = findByDataAttr(component, "headerComponent");
    expect(wrapper.length).toBe(1);
  });

  it("Should render h1", () => {
    const wrapper = findByDataAttr(component, "headerH1");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <Nav />", () => {
    expect(component.containsMatchingElement(<Nav />)).toEqual(true);
  });
});

describe("Checking PropTypes in <Header />", () => {
  it("Should not throw a warning", () => {
    const expectedProps = {
      profile: true,
    };

    const propsError = checkProps(Header, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
