import React, { useEffect, useState } from "react";
import "./LoginForm.css";

import { useHistory } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import * as actions from "../../../store/actions/index";
import Input from "../../UI/Input/Input";

const LoginForm = ({ loading, error, onLogin, isAuth }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isAuth) {
      history.push("/");
    }
  }, [isAuth, history]);

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(email, password, history);
  };

  return (
    <form className="loginForm" onSubmit={(e) => handleLogin(e)}>
      {loading && (
        <div className="loading">
          <div className="loader">Loading...</div>
        </div>
      )}
      <label htmlFor="email">E-mail</label>
      <Input
        required
        value={email}
        callback={(e) => setEmail(e)}
        type="email"
        placeholder="Enter your email"
      />
      <label htmlFor="password">Password</label>
      <Input
        required
        value={password}
        callback={(e) => setPassword(e)}
        type="password"
        placeholder="Enter your password"
      />
      <button disabled={loading} type="submit">
        Login
      </button>
      {error && <p className="login__error">{error}</p>}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    userId: state.auth.userId,
    userEmail: state.auth.userEmail,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogin: (email, password, history) =>
      dispatch(actions.login(email, password, history)),
  };
};

LoginForm.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.string,
  onLogin: PropTypes.func,
  isAuth: PropTypes.bool,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
