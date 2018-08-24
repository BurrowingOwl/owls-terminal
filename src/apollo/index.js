import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { withClientState } from 'apollo-link-state';
import { InMemoryCache } from 'apollo-cache-inmemory';
import clientState from './clientState';
import authLink from './authLink';

const cache = new InMemoryCache();

const stateLink = withClientState({
  cache,
  ...clientState,
});
const httpLink = new HttpLink({
  uri: 'http://localhost:4000/graphql',
});
const link = ApolloLink.from([
  authLink,
  stateLink, // httpLink 앞에와야 http로 넘어가기전에 intercept가능.
  httpLink,
]);
const client = new ApolloClient({
  link,
  cache,
  connectToDevTools: process.env.NODE_ENV === 'development',
});
client.onResetStore(stateLink.writeDefaults);
export default client;
