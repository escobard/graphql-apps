import React, { Component } from "react";
import { graphql } from "react-apollo";

import AuthForm from "../components/forms/AuthForm";
import LoginMutation from "../mutations/Login";

class Login extends Component {
  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <AuthForm />
      </div>
    );
  }
}

export default graphql(LoginMutation)(Login);