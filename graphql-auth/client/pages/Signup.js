import React, { Component } from "react";
import { graphql } from "react-apollo";

import SignupMutation from "../mutations/Signup";
import CurrentUserQuery from "../queries/CurrentUser";

import AuthForm from "../components/forms/AuthForm";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = { errors: [] };
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        refetchQueries: [{ query: CurrentUserQuery }],
        variables: { email, password }
      })
      .catch(e => {
        const errors = e.graphQLErrors.map(error => error.message);
        this.setState({ errors });
      });
  }

  render() {
    return (
      <div className="container">
        <h3>Sign Up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(SignupMutation)(Signup);
