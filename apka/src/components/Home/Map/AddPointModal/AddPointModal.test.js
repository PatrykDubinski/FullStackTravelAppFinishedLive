import React from "react";

import { shallow, configure } from "enzyme";
import { act } from "react-test-renderer";
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
  const component = shallow(<AddPointModal store={store} {...props} />)
    .dive()
    .dive();
  return component;
};

describe("<AddPointModal /> Component", () => {
  it("Should render without errors", () => {
    const initialState = {
      auth: {
        userId: "userId",
      },
      marker: {
        loading: false,
        markerError: false,
      },
    };
    const expectedProps = {
      marker: {
        longitude: 15,
        latitude: 25,
      },
    };
    const component = setUp(initialState, expectedProps);
    expect(component.exists()).toBe(true);
  });

  it("Should render loader when loading is true", () => {
    const initialState = {
      marker: {
        loading: true,
      },
    };
    const expectedProps = {
      marker: {
        longitude: 15,
        latitude: 25,
      },
    };
    const component = setUp(initialState, expectedProps);
    const wrapper = findByDataAttr(component, "loading");
    expect(wrapper.length).toBe(1);
  });
});

describe("Checking PropTypes in <AddPointModal />", () => {
  it("Should not throw a warning", () => {
    const expectedProps = {
      marker: {
        latitude: 15,
        longitude: 25,
      },
      userId: "UserId",
      closeModal: jest.fn(),
      onAddMarker: jest.fn(),
      markerError: "Error message",
      loading: false,
    };

    const propsError = checkProps(AddPointModal, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
