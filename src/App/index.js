import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route } from 'react-router-dom';
import Landing from '@/Landing';
import Main from '@/Main';
import { graphql, compose, Query } from 'react-apollo';
import gql from 'graphql-tag';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const VERIFY_USER = gql`
  mutation verify {
    verify {
      user {
        _id
        username
        name
      }
      token
    }
  }
`;
const GET_LOGIN_STATE = gql`
  query getLoginState {
    login @client {
      _id
      username
      name
      isLoggedIn
    }
  }
`;
const UPDATE_LOGIN_DATA = gql`
  mutation updateLoginData($_id: String!, $username: String!, $name: String!, $isLoggedIn: Boolean!, $token: String!) {
    updateLoginData(_id: $_id, username: $username, name: $name, isLoggedIn: $isLoggedIn, token: $token) @client
  }
`;
class App extends React.Component {
  state = {
    isVerified: false,
  }
  static propTypes = {
    updateLoginData: PropTypes.func.isRequired,
    verifyUser: PropTypes.func.isRequired,
  }
  componentDidMount() {
    const { verifyUser, updateLoginData } = this.props;
    verifyUser()
      .then(({ data: { verify } }) => {
        this.setState({
          isVerified: true,
        });
        if (!verify) {
          return;
        }
        const { user, token } = verify;
        if (!token) {
          return;
        }
        const { _id, username, name } = user;
        updateLoginData({ _id, username, name, isLoggedIn: true, token });
      });
  }

  render() {
    const { isVerified } = this.state;
    return (
      <Container>
        <Query query={GET_LOGIN_STATE}>
          {
            ({ data: { login } }) => {
              if (!isVerified) {
                return null;
              }
              if (!login.isLoggedIn) {
                return <Landing />;
              }
              return <Route path="/" component={Main} />;
            }
          }
        </Query>
      </Container>
    );
  }
}

export default compose(
  graphql(VERIFY_USER, {
    props: ({ mutate }) => ({
      verifyUser: () => mutate({}),
    }),
  }),
  graphql(UPDATE_LOGIN_DATA, {
    props: ({ mutate }) => ({
      updateLoginData: (loginData) => mutate({ variables: { ...loginData } }),
    }),
  }),
)(App);
