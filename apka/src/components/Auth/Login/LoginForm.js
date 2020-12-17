import React, { useEffect, useState } from "react";
import "./LoginForm.css";

import { useHistory } from "react-router";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";

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
      <input
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        type="email"
        placeholder="Enter your email"
      />
      <label htmlFor="password">Password</label>
      <input
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
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

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
