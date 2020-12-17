// Basic imports
import { useEffect } from "react";

// Library imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";

// My components imports
import Home from "./components/Home/Home";
import * as actions from "./store/actions/index";
import asyncComponent from "./asyncComponent";

const asyncProfile = asyncComponent(() => {
  return import("./components/Home/Profile/Profile");
});

const asyncMarkerDetail = asyncComponent(() => {
  return import(
    "./components/Home/Profile/MarkersList/MarkerDetail/MarkerDetail"
  );
});

const asyncRegister = asyncComponent(() => {
  return import("./components/Auth/Register");
});

const asyncLogout = asyncComponent(() => {
  return import("./components/Auth/Login/Logout/Logout");
});

const asyncGoogle = asyncComponent(() => {
  return import("./components/Auth/Google/Google");
});

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
          <Route path="/marker/:id" component={asyncMarkerDetail} />
          <Route path="/profile" component={asyncProfile} />
          <Route path="/auth/google" component={asyncGoogle} />
          <Route path="/logout" component={asyncLogout} />
          <Route path="/register" component={asyncRegister} />
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

// Redux

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
