import React, { Component } from "react";
import { graphql } from "react-apollo";
import { hashHistory } from "react-router";

import AuthForm from "../components/forms/AuthForm";
import CurrentUserMutation from "../queries/CurrentUser";
import LoginMutation from "../mutations/Login";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = { errors: [] };
  }

  componentWillUpdate(nextProps) {
    if (!this.props.data.user && nextProps.data.user)
      hashHistory.push("/dashboard");
  }

  onSubmit({ email, password }) {
    this.props
      .mutate({
        // .mutate does not wait for the refetchQueries promise to resolve, special consideration is
        // necessary to workaround this gotcha w/ apollo
        refetchQueries: [{ query: CurrentUserMutation }],
        // https://www.apollographql.com/docs/react/data/mutations/#executing-a-mutation
        // this sets query variables for the mutation
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
        <h3>Login</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    );
  }
}

export default graphql(CurrentUserMutation)(graphql(LoginMutation)(Login));
