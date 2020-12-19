import { checkPropTypes } from "prop-types";
import { applyMiddleware, createStore } from "redux";
import rootReducer from "../store/reducers";
import createSagaMiddleware from "redux-saga";

export const findByDataAttr = (component, attr) => {
  const wrapper = component.find(`[data-test='${attr}']`);
  return wrapper;
};

export const checkProps = (component, expectedProps) => {
  const propsError = checkPropTypes(
    component.propTypes,
    expectedProps,
    "props",
    component.name
  );

  return propsError;
};

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const testStore = (initialState) => {
  const createStoreWithMiddleware = applyMiddleware(...middlewares)(
    createStore
  );
  return createStoreWithMiddleware(rootReducer, initialState);
};
