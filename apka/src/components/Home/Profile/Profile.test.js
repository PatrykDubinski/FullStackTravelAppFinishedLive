import React from "react";

import { shallow, configure } from "enzyme";
import { act } from "react-test-renderer";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import {
  checkProps,
  findByDataAttr,
  testStore,
} from "../../../../Utilities/testUtils";
import Profile from "./Profile";

configure({ adapter: new Adapter() });

const setUp = (initialState = {}, props = {}) => {
  const store = testStore(initialState);
  const component = shallow(<Profile store={store} {...props} />)
    .dive()
    .dive();
  return component;
};
