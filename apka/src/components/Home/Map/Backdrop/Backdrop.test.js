import React from "react";

import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import Backdrop from "./Backdrop";
import { checkProps, findByDataAttr } from "../../../../Utilities/testUtils";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<Backdrop {...props} />);
  return component;
};

describe("<Backdrop /> Component", () => {
  it("Should render without errors", () => {
    const component = setUp();
    expect(component.exists()).toBe(true);
  });

  it("Should not render when show prop is false", () => {
    const expectedProps = {
      show: false,
    };
    const component = setUp(expectedProps);
    const wrapper = findByDataAttr(component, "backdrop");
    expect(wrapper.length).toBe(0);
  });

  it("Should render when show prop is true", () => {
    const expectedProps = {
      show: true,
    };
    const component = setUp(expectedProps);
    const wrapper = findByDataAttr(component, "backdrop");
    expect(wrapper.length).toBe(1);
  });
});

describe("Checking PropTypes in <Backdrop />", () => {
  it("Should not throw a warning", () => {
    const expectedProps = {
      show: true,
      closeHandler: jest.fn(),
    };
    const propsError = checkProps(Backdrop, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
