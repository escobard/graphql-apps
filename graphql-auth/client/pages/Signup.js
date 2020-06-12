import React, { Component } from "react";
import { graphql } from "react-apollo";

import SignupMutation from "../mutations/Signup"

import AuthForm from "../components/forms/AuthForm";

class Signup extends Component {
  render() {
    return(
      <div className="container">
        <h3>Sign Up</h3>
        <AuthForm
          errors={this.state.errors}
          onSubmit={this.onSubmit.bind(this)}
        />
      </div>
    )
  }
}

export default graphql(SignupMutation)(Signup);