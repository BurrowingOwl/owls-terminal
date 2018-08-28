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
  <Router>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </Router>
);

ReactDOM.render(
  <Root />,
  document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
