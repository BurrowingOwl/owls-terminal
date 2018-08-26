import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Button } from '@/common';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const InnerContainer = styled.div`
  max-width: 800px;
  margin: 2rem auto;
`;
const Header = styled.div`
  width: 100%;
  margin: 5rem 0;

  text-align: center;
`;
const LinkWrapper = styled.div`
  width: 80%;
  margin: auto;
`;
const CustomLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const Divider = styled.div`
  text-align: center;
  margin: 1rem;
`;
const Welcome = () => (
  <Container>
    <InnerContainer>
      <Header>
        <h1>Owls Terminal</h1>
        <h2>Welcome to owls terminal</h2>
      </Header>
      <LinkWrapper>
        <CustomLink to="/login">
          <Button primary>Login</Button>
        </CustomLink>
        <Divider>OR</Divider>
        <CustomLink to="/signup">
          <Button>Signup</Button>
        </CustomLink>
      </LinkWrapper>
    </InnerContainer>
  </Container>
);

export default Welcome;
