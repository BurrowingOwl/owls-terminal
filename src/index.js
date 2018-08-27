import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import client from '@/apollo';
import App from '@/App';
import theme from '@/style/theme';
import '@/style/global-style';

const Root = () => (
  <ApolloProvider client={client}>
    <ThemeProvider theme={theme}>
      <Router>
        <App />
      </Router>
    </ThemeProvider>
  </ApolloProvider>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);
