import "./App.css";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

import Home from "./components/Home/Home";
import Register from "./components/Auth/Register";
import Logout from "./components/Auth/Login/Logout/Logout";
import * as actions from "./store/actions/index";
import { useEffect } from "react";
import Google from "./components/Auth/Google/Google";
import Profile from "./components/Home/Profile/Profile";
import MarkerDetail from "./components/Home/Profile/MarkersList/MarkerDetail/MarkerDetail";

function App({ onTryAutoSignIn, isAuth, onGetUserData, userId }) {
  useEffect(() => {
    onTryAutoSignIn();
    if (userId) {
      onGetUserData(userId);
    }
  }, [onTryAutoSignIn, isAuth, onGetUserData, userId]);

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/marker/:id">
            <MarkerDetail />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/auth/google">
            <Google />
          </Route>
          <Route path="/logout">
            <Logout />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token != null,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignIn: () => dispatch(actions.loginCheck()),
    onGetUserData: (userId) => dispatch(actions.getUserData(userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
