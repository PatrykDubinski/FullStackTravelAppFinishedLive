import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { findByDataAttr } from "../../../Utilities/testUtils";
import HomeInfoPage from "./HomeInfoPage";
import { ReactComponent as Travel } from "../../../assets/images/travel.svg";

configure({ adapter: new Adapter() });

const setUp = (props = {}) => {
  const component = shallow(<HomeInfoPage {...props} />);
  return component;
};

describe("<HomeInfoPage /> Component", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setUp();
  });

  it("Should render without errors", () => {
    const component = findByDataAttr(wrapper, "homeInfoPage");
    expect(component.length).toBe(1);
  });

  it("Should render svg image", () => {
    const component = findByDataAttr(wrapper, "homeInfoPage__left");
    expect(component.find(Travel)).toHaveLength(1);
  });
});
