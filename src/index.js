import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import client from '@/apollo';
import App from '@/App';

const Root = () => (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
