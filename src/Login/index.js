import React, { Component } from 'react';
import styled from 'styled-components';
import { ApolloConsumer, Mutation } from 'react-apollo';
import { Field, Button } from '@/common';
import gql from 'graphql-tag';

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Form = styled.form`
  min-width: 300px;
  min-height: 500px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        _id
        username
        name
      }
      token
    }
  }
`;
class Login extends Component {
  state = {
    username: '',
    password: '',
  }
  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  handleLogin = login => {
    const { username, password } = this.state;
    login({ variables: { username, password } });
  }
  render() {
    const { username, password } = this.state;
    return (
      <Container>
        <ApolloConsumer>
          {
            client => (
              <Mutation
                mutation={LOGIN} onCompleted={({ login }) => {
                  const loginState = {
                    ...login.user,
                    token: login.token,
                    isLoggedIn: true,
                    __typename: 'LoginState',
                  };
                  client.writeData({ data: { login: { ...loginState } } });
                }}
              >
                {
                  login => (
                    <Form>
                      <Field name="username" value={username} onChange={this.handleChange} />
                      <Field name="password" type="password" value={password} onChange={this.handleChange} />
                      <Button type="button" onClick={() => this.handleLogin(login)}>Login</Button>
                    </Form>
                  )
                }
              </Mutation>
            )
          }
        </ApolloConsumer>
      </Container>
    );
  }
}

export default Login;
