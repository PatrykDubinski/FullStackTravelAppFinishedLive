import React, { useState } from "react";
import "./Form.css";

import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";
import Input from "../../UI/Input/Input";

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
          <Input
            required={true}
            value={firstName}
            callback={(e) => setFirstName(e)}
            name="first-name"
            placeholder="Your first name"
          />
        </div>
        <div className="names__box">
          <label htmlFor="last-name">Last Name</label>
          <Input
            required={true}
            value={lastName}
            callback={(e) => setLastName(e)}
            name="last-name"
            placeholder="Your last name"
          />
        </div>
      </div>
      <label htmlFor="nick">Nickname</label>
      <Input
        className="nickname"
        required={true}
        value={nickname}
        callback={(e) => setNickname(e)}
        placeholder="Enter your nickname"
      />
      <label htmlFor="email">E-mail</label>
      <Input
        required={true}
        value={email}
        callback={(e) => setEmail(e)}
        type="email"
        placeholder="Enter your email"
      />
      <label htmlFor="password">Password</label>
      <Input
        required={true}
        value={password}
        callback={(e) => setPassword(e)}
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
