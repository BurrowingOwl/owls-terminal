import React from 'react';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from '@/common';

const Container = styled.div`
  width: 100%;
  height: 60px;

  display: flex;
  align-items: center;

  background-color: #eee;
`;
const HeaderLeft = styled.div`
  height: 100%;

  flex: 1 0 auto;
`;
const HeaderRight = styled.div`
  height: 100%;
  flex: 0 1 100px;
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
const logout = () => {
  // resetStore 에러...
  localStorage.removeItem('token');
};
const Header = () => (
  <Query query={GET_LOGIN_STATE}>
    {
      ({ client, data: { login } }) => (
        <Container>
          <HeaderLeft>
            OWLS TERMINAL
          </HeaderLeft>
          <HeaderRight>
            <span>{login.name}</span>
            <Button onClick={() => logout(client)}>Logout</Button>
          </HeaderRight>
        </Container>
      )
    }
  </Query>
);

export default Header;
