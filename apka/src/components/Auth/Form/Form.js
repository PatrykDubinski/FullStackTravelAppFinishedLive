import React, { useState } from "react";
import "./Form.css";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";

const Form = ({ onRegister, error, loading, setLoginForm }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [nickname, setNickname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    onRegister(firstName, lastName, nickname, email, password);
    if (error !== null && !loading) {
      setFirstName("");
      setLastName("");
      setNickname("");
      setEmail("");
      setPassword("");
      setLoginForm(true);
    } else if (!error && !loading) {
      setFirstName("");
      setLastName("");
      setNickname("");
      setEmail("");
      setPassword("");
    }
  };

  return (
    <form className="form" onSubmit={(e) => handleRegister(e)}>
      {loading && (
        <div className="loading">
          <div class="loader">Loading...</div>
        </div>
      )}
      <div className="names">
        <div className="names__box">
          <label htmlFor="first-name">First Name</label>
          <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            type="text"
            name="first-name"
            placeholder="Your first name"
          />
        </div>
        <div className="names__box">
          <label htmlFor="last-name">Last Name</label>
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            type="text"
            name="last-name"
            placeholder="Your last name"
          />
        </div>
      </div>
      <label htmlFor="nick">Nickname</label>
      <input
        className="nickname"
        type="text"
        required
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Enter your nickname"
      />
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
        Create your account
      </button>
      {error !== "" && <p className="form__error">{error}</p>}
    </form>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRegister: (firstName, lastName, nickname, email, password) =>
      dispatch(
        actions.register(firstName, lastName, nickname, email, password)
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
