import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  min-height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loading = () => (
  <Container>
    ...Loading...
  </Container>
);

export default Loading;
