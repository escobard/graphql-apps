import React from 'react';
import ReactDOM from 'react-dom';

import ApolloClient from 'apollo-client';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  // identify every record that comes back from the server, So rather than refetching our data for every single query
  // that is issued, Apollo will have the ability to identify the information that its already been pulled down from
  // the server and store it inside of some local cache.
  // https://www.apollographql.com/docs/react/caching/cache-configuration/
  // https://www.apollographql.com/docs/react/caching/cache-configuration/#custom-identifiers
  dataIdFromObject: o => o.id
});

const Root = () => {
  return (
    <div>
      Auth Starter
    </div>
  );
};

ReactDOM.render(<Root />, document.querySelector('#root'));
