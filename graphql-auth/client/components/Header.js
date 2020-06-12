import React, { Component } from "react";
import { graphql } from "react-apollo";
import { Link } from "react-router";
import query from "../queries/CurrentUser";
import mutation from "../mutations/logout";

class Header extends Component {
  onLogoutClick() {
    this.props.mutate({
      // https://www.apollographql.com/docs/react/data/mutations/
      // refetches gql CurrentUser query after logout mutation
      refetchQueries: [{ query }]
    })
  }

  renderButtons() {
    const { loading, user } = this.props.data;

    if (loading) {
      return <div />;
    }

    if (user) {
      return (
        <li>
          <a onClick={this.onLogoutClick.bind(this)}>Logout</a>
        </li>
      );
    } else {
      return (
        <div>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </div>
      );
    }
  }

  render() {
    console.log(this.props.data);
    return (
      <nav>
        <div className="nav-wrapper container">
          <Link to="/" className="brand-logo left">
            Home
          </Link>
          <ul className="right">{this.renderButtons()}</ul>
        </div>
      </nav>
    );
  }
}

// to attach multiple gql calls to a component's props
export default graphql(mutation)(graphql(query)(Header));
