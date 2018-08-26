import React from 'react';
import styled from 'styled-components';

const Container = styled.form`
  width: 300px;
  height: 500px;
  min-width: 300px;
  min-height: 500px;
`;

const checkEnter = callback => e => {
  if (e.key === 'Enter') {
    callback();
  }
};
const Form = ({ onEnter, children, ...props }) => (
  <Container {...props} onKeyPress={checkEnter(onEnter)}>
    {children}
  </Container>
);

export default Form;
