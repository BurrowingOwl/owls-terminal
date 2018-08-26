import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Form, Field, Button, Container } from '@/common';


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
const UPDATE_LOGIN_DATA = gql`
  mutation updateLoginData($_id: String!, $username: String!, $name: String!, $isLoggedIn: Boolean!, $token: String!) {
    updateLoginData(_id: $_id, username: $username, name: $name, isLoggedIn: $isLoggedIn, token: $token) @client
  }
`;
class Login extends Component {
  state = {
    username: '',
    password: '',
  }
  static propTypes = {
    history: PropTypes.object.isRequired,
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
  handleKeyPress = login => e => {
    if (e.key === 'Enter') {
      this.handleLogin(login);
    }
  }
  render() {
    const { username, password } = this.state;
    const { push } = this.props.history;
    return (
      <Container>
        <Mutation mutation={UPDATE_LOGIN_DATA}>
          {
            updateLoginData => (
              <Mutation
                mutation={LOGIN} onCompleted={({ login }) => {
                  const loginState = {
                    ...login.user,
                    token: login.token,
                    isLoggedIn: true,
                    __typename: 'LoginState',
                  };
                  updateLoginData({ variables: { ...loginState } });
                  push('/');
                }}
              >
                {
                  login => (
                    <Form onEnter={() => this.handleLogin(login)}>
                      <Field label="Username" name="username" value={username} onChange={this.handleChange} />
                      <Field
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={this.handleChange}
                      />
                      <Button primary={true} onClick={() => this.handleLogin(login)}>Login</Button>
                    </Form>
                  )
                }
              </Mutation>
            )
          }
        </Mutation>
      </Container>
    );
  }
}

export default Login;
