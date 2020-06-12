import React, { Component } from "react";
import { graphql } from "react-apollo";

import AuthForm from "../components/forms/AuthForm";
import LoginMutation from "../mutations/Login";

class Login extends Component {
  onSubmit({ email, password }) {
    this.props.mutate({
      // https://www.apollographql.com/docs/react/data/mutations/#executing-a-mutation
      // this sets query variables for the mutation
      variables: { email, password }
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)}/>
      </div>
    );
  }
}

export default graphql(LoginMutation)(Login);