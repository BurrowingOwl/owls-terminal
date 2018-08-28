import React from 'react';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Header from '@/Header';
import MainHome from '@/MainHome';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;
const Section = styled.div`
  width: 100%;
  height: calc(100% - 60px);
  display: flex;
`;

const Main = () => (
  <Container>
    <Header />
    <Section>
      <Route path="/" component={MainHome} />
    </Section>
  </Container>
);

export default Main;
