import ApolloClient from 'apollo-boost';
import clientState from './clientState';

const client = new ApolloClient({
  clientState,
  uri: 'http://localhost:4000/graphql',
});

export default client;
