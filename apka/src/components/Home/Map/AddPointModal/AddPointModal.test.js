import React from "react";

import { shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {
  checkProps,
  findByDataAttr,
  testStore,
} from "../../../../Utilities/testUtils";
import AddPointModal from "./AddPointModal";

configure({ adapter: new Adapter() });

const setUp = (initialState = {}, props = {}) => {
  const store = testStore(initialState);
  const component = shallow(<AddPointModal store={store} {...props} />);
  return component;
};

describe("<AddPointModal /> Component", () => {
  it("Should render without errors", () => {
    const initialState = {
      userId: "userId",
      loading: false,
      markerError: false,
    };
    const component = setUp(initialState);
  });
});
