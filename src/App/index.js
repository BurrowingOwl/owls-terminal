import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from '@/Header';
import Sidebar from '@/Sidebar';
import Post from '@/Post';
import Login from '@/Login';
import { graphql, compose, Query } from 'react-apollo';
import gql from 'graphql-tag';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Section = styled.div`
  width: 100%;
  
  display: flex;
`;
const Side = styled.div`
  flex: 0 1 200px;
`;
const Main = styled.div`
  flex: 1 0;
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
  static propTypes = {
    updateLoginData: PropTypes.func.isRequired,
    verify: PropTypes.func.isRequired,
  }
  componentDidMount() {
    this.props.verify().then(({ data: { verify } }) => {
      if (!verify) {
        return;
      }
      const { user, token } = verify;
      if (!token) {
        return;
      }
      const { _id, username, name } = user;
      this.props.updateLoginData({ _id, username, name, isLoggedIn: true, token });
    });
  }
  updateLoginData = (user, token, updateQuery) => {
    if (!user) {
      return;
    }
    const { _id, username, name } = user;
    updateQuery({ variables: { _id, username, name, isLoggedIn: true, token } });
  }
  render() {
    return (
      <Container>
        <Query query={GET_LOGIN_STATE}>
          {
            ({ data }) => {
              if (!data.login.isLoggedIn) {
                return <Login />;
              }
              return (
                <React.Fragment>
                  <Header />
                  <Section>
                    <Side>
                      <Sidebar />
                    </Side>
                    <Main>
                      <Post />
                    </Main>
                  </Section>
                </React.Fragment>
              );
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
      verify: () => mutate({}),
    }),
  }),
  graphql(UPDATE_LOGIN_DATA, {
    props: ({ mutate }) => ({
      updateLoginData: (loginData) => mutate({ variables: { ...loginData } }),
    }),
  }),
)(App);
