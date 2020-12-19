import React from "react";

import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import { checkProps, findByDataAttr } from "../../Utilities/testUtils";
import { testStore } from "../../Utilities/testUtils";
import Home from "./Home";
import Header from "./Header/Header";
import HomeInfoPage from "./HomeInfoPage/HomeInfoPage";
import InstructionsPage from "./InstructionsPage/InstructionsPage";
import Greetings from "./Greetings/Greetings";
import Footer from "./Footer/Footer";
import Map from "./Map/Map";

configure({ adapter: new Adapter() });

const setUp = (initialState = {}, props = {}) => {
  const store = testStore(initialState);
  const component = shallow(<Home store={store} {...props} />)
    .dive()
    .dive();
  return component;
};

describe("<Home /> Component", () => {
  let wrapper;
  beforeEach(() => {
    const initialState = {
      auth: {
        token: null,
      },
    };
    wrapper = setUp(initialState);
  });

  it("Should render without errors", () => {
    const component = findByDataAttr(wrapper, "home");
    expect(component.length).toBe(1);
  });

  it("Shouldn't render Map component if not authorized", () => {
    const component = findByDataAttr(wrapper, "home");
    expect(
      component.containsAllMatchingElements([
        <Header />,
        <HomeInfoPage />,
        <InstructionsPage />,
        <Greetings />,
        <Footer />,
      ])
    ).toEqual(true);
  });

  it("Should render Map component if authorized", () => {
    const initialState = {
      auth: {
        token: "token",
      },
    };
    wrapper = setUp(initialState);
    const component = findByDataAttr(wrapper, "home");
    expect(
      component.containsAllMatchingElements([<Header />, <Map />, <Footer />])
    ).toEqual(true);
  });
});

describe("Checking PropTypes in <Home />", () => {
  it("Should not throw a warning", () => {
    const expectedProps = {
      isAuth: true,
    };

    const propsError = checkProps(Home, expectedProps);
    expect(propsError).toBeUndefined();
  });
});
