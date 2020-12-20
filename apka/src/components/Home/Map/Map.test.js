import React from "react";

import { shallow } from "enzyme";
// import Adapter from "enzyme-adapter-react-16";
import ReactMapGL from "react-map-gl";
import { act } from "react-test-renderer";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import { checkProps, findByDataAttr } from "../../../Utilities/testUtils";
import { testStore } from "../../../Utilities/testUtils";
import Map from "./Map";
import Loading from "../../UI/Loading/Loading";

Enzyme.configure({ adapter: new Adapter() });

const setUp = (initialState = {}, props = {}) => {
  const store = testStore(initialState);
  const component = shallow(<Map store={store} {...props} />)
    .dive()
    .dive();
  return component;
};

describe("<Map /> Component", () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      auth: {
        userId: "userId",
      },
      marker: {
        markers: [{ title: "test", desc: "desc" }],
        loading: true,
      },
    };
    wrapper = setUp(initialState);
  });

  it("Should render <Loading /> when is loading", () => {
    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  it("Should render only <Loading /> when is loading", () => {
    expect(wrapper.length).toBe(1);
  });

  it("Should render map when not loading", async () => {
    const initialState = {
      marker: {
        loading: false,
        markers: [{ title: "marker1", desc: "marker1" }],
      },
    };
    const props = {
      handleModalClose: () => {},
      onGetMarkers: () => {},
      startAddingMarker: () => {},
      closeModal: () => {},
    };
    const component = setUp(initialState, props);
    await act(async () => {
      await Promise.resolve(component);
      await new Promise((resolve) => setImmediate(resolve));
      component.update();
    });
    expect(component.find(ReactMapGL).exists()).toBe(true);
  });

  it("Should render Navigation Controls", async () => {
    const initialState = {
      marker: {
        loading: false,
        markers: [{ title: "marker1", desc: "marker1" }],
      },
    };
    const props = {
      showModal: true,
    };
    const component = setUp(initialState, props);
    await act(async () => {
      await Promise.resolve(component);
      await new Promise((resolve) => setImmediate(resolve));
      component.update();
    });
    const wrapper = findByDataAttr(component, "controls");
    expect(wrapper.length).toBe(1);
  });
});

describe("Checking PropTypes in <Map />", () => {
  it("Should not throw a warning", () => {
    const expectedProps = {
      userId: "userId",
      onGetMarkers: jest.fn(),
      markers: [
        {
          createdAt: "Test date",
          desc: "Desc",
          endDate: "Test date",
          id: "Id",
          latitude: 12,
          longitude: 53,
          rating: 2,
          startDate: "Test Date",
          title: "Title",
          photo: {
            contentType: "Type",
            data: {
              type: "Type",
              data: [1, 2, 3],
            },
          },
        },
      ],
      loading: false,
    };
    const propsError = checkProps(Map, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
