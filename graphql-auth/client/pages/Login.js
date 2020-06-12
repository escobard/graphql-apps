import React, { Component } from "react";
import AuthForm from "../components/forms/AuthForm";

class Login extends Component {
  render() {
    return (
      <div className="container">
        <AuthForm />
      </div>
    );
  }
}

export default Login;