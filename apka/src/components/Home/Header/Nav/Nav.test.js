import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import {
  checkProps,
  findByDataAttr,
  testStore,
} from "../../../../Utilities/testUtils";
import Nav from "./Nav";
import NavItem from "./NavItem/NavItem";

configure({ adapter: new Adapter() });

const setUp = (initialState = {}, props = {}) => {
  const store = testStore(initialState);
  const component = shallow(<Nav store={store} {...props} />)
    .dive()
    .dive();
  return component;
};

describe("<Nav /> Component", () => {
  let wrapper;

  beforeEach(() => {
    const initialState = {
      auth: {
        token: "abcd",
        loading: true,
      },
      marker: {
        loading: true,
      },
    };
    wrapper = setUp(initialState);
  });

  it("Should render without errors", () => {
    const component = findByDataAttr(wrapper, "navComponent");
    expect(component.length).toBe(1);
  });

  it("Should render 1 <NavItem /> when not authorized", () => {
    const initialState = {
      auth: {
        token: null,
        loading: false,
      },
      marker: {
        loading: false,
      },
    };
    const component = setUp(initialState);
    expect(component.find(NavItem)).toHaveLength(1);
  });

  it("Should render 2 <NavItem /> when authorized", () => {
    const initialState = {
      auth: {
        token: "token",
        loading: false,
      },
      marker: {
        loading: false,
      },
    };
    const component = setUp(initialState);
    expect(component.find(NavItem)).toHaveLength(2);
  });

  it("Should render Profile tab when Profile prop is false", () => {
    const initialState = {
      auth: {
        token: "token",
        loading: false,
      },
      marker: {
        loading: false,
      },
    };
    const expectedProps = {
      profile: false,
    };
    const component = setUp(initialState, expectedProps);
    expect(component.find(NavItem).first().children().text()).toEqual(
      "Profile"
    );
  });

  it("Should render Map tab when Profile prop is true", () => {
    const initialState = {
      auth: {
        token: "token",
        loading: false,
      },
      marker: {
        loading: false,
      },
    };
    const expectedProps = {
      profile: true,
    };
    const component = setUp(initialState, expectedProps);
    expect(component.find(NavItem).first().children().text()).toEqual("Map");
  });

  it("Shouldn't render when loading", () => {
    const initialState = {
      auth: {
        loading: true,
      },
      marker: {
        loading: true,
      },
    };
    const component = setUp(initialState);
    const wrapper = findByDataAttr(component, "nav-list");
    expect(wrapper.length).toBe(0);
  });
});

describe("Checking PropTypes in <Nav />", () => {
  it("Should not throw a warning", () => {
    const expectedProps = {
      authLoading: true,
      markerLoading: true,
      isAuth: true,
      profile: true,
    };
    const propsError = checkProps(Nav, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
