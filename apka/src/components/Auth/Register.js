import React, { useState } from "react";
import "./Register.css";

import * as queryString from "query-string";
import { faGooglePlusG } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Form from "./Form/Form";
import LoginForm from "./Login/LoginForm";

const Register = () => {
  const [loginForm, setLoginForm] = useState(false);

  const handleLoginChange = () => {
    setLoginForm(!loginForm);
  };

  const stringifiedParams = queryString.stringify({
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    redirect_uri: "http://localhost:3000/auth/google",
    scope: [
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ].join(" "),
    response_type: "code",
    access_type: "offline",
    prompt: "consent",
  });
  const url = `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`;

  return (
    <section className="register">
      <div className="register__left">
        <h1>{loginForm ? "Don't have an account?" : "Already Signed Up?"}</h1>
        {!loginForm && <p>Log in to your account</p>}
        <button onClick={handleLoginChange}>
          {loginForm ? "Register Now!" : "Log in"}
        </button>
      </div>
      <div className="register__right">
        <h1>{loginForm ? "Sign in" : "Sign Up for an Account"}</h1>
        {!loginForm && (
          <p>
            Let's get you all set up so you can start marking your travels fast!
          </p>
        )}
        {loginForm ? <LoginForm /> : <Form setLoginForm={setLoginForm} />}
        <a href={url} className="login_with_google">
          <div className="icon_wrapper">
            <FontAwesomeIcon icon={faGooglePlusG} />
          </div>
          <p>Login with Google</p>
        </a>
      </div>
    </section>
  );
};

export default Register;
