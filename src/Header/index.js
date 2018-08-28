import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
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
const Logo = styled.div`
  margin-left: 15px;
  font-size: 1.5em;
  font-weight: 600;
`;
const HeaderLeft = styled.div`
  flex: 1 1 auto;
`;
const HeaderRight = styled.div`
  flex: 0 0 auto;

  display: flex;
  align-items: center;
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
const logout = (client, history) => {
  // resetStore 에러...
  localStorage.removeItem('token');
  client.writeData({ data: { login: { _id: '', __typename: 'LoginState', isLoggedIn: false } } });
  // 먼저 isLoggedIn을 false로 해줘야 App 컴포넌트의 하위 active query들이 refetch가 안되는듯
  client.resetStore();
  history.push('/');
};
const Header = ({ history }) => (
  <Query query={GET_LOGIN_STATE}>
    {
      ({ client, data: { login } }) => (
        <Container>
          <HeaderLeft>
            <Logo>OWLS TERMINAL</Logo>
          </HeaderLeft>
          <HeaderRight>
            <span>{login.name}</span>
            <Button onClick={() => logout(client, history)}>Logout</Button>
          </HeaderRight>
        </Container>
      )
    }
  </Query>
);
Header.propTypes = {
  history: PropTypes.object.isRequired,
};

export default withRouter(Header);
