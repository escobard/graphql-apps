import gql from "graphql-tag";

// since gql data is passed down to components as a prop, all components that consume this prop will re-render
// as a result of the prop updating. in other words, every gql query causes a re-render to coupled components.
export default gql`
  {
    user {
      id
      email
    }
  }
`;