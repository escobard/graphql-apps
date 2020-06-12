import React, { Component } from "react";
import { graphql } from "react-apollo";

import AuthForm from "../components/forms/AuthForm";
import CurrentUserMutation from "../queries/CurrentUser";
import LoginMutation from "../mutations/Login";

class Login extends Component {
  onSubmit({ email, password }) {
    this.props.mutate({
      refetchQueries: [{ query: CurrentUserMutation }],
      // https://www.apollographql.com/docs/react/data/mutations/#executing-a-mutation
      // this sets query variables for the mutation
      variables: { email, password }
    }).catch(e => {
      const errors = e.graphQLErrors.map(error => error.message);
    });
  }

  render() {
    return (
      <div className="container">
        <h3>Login</h3>
        <AuthForm onSubmit={this.onSubmit.bind(this)} />
      </div>
    );
  }
}

export default graphql(LoginMutation)(Login);