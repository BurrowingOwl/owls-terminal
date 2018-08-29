import React, { Component } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import { Button, Container, Field, Form } from '@/common';

const SIGNUP = gql`
  mutation signup($username: String!, $password: String!, $name: String!) {
    signup(username: $username, password: $password, name: $name) {
      name
    }
  }
`;

class Signup extends Component {
  state = {
    username: '',
    password: '',
    name: '',
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
  handleSignup = (signup) => () => {
    const { username, password, name } = this.state;
    const { history } = this.props;
    signup({ variables: { username, password, name } })
      .then(() => history.push('/'));
  }
  render() {
    const { username, password, name } = this.state;
    return (
      <Mutation mutation={SIGNUP}>
        {
          (signup) => (
            <Container>
              <Form onEnter={this.handleSignup(signup)} onChange={this.handleChange}>
                <Field
                  label="Username"
                  name="username"
                  value={username}
                />
                <Field
                  label="Password"
                  name="password"
                  type="password"
                  value={password}
                />
                <Field
                  label="Nickname"
                  name="name"
                  value={name}
                />
                <Button primary onClick={this.handleSignup(signup)}>Sign up</Button>
              </Form>
            </Container>
          )
        }
      </Mutation>
    );
  }
}

export default Signup;
