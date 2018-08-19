import styled from 'styled-components';

const Button = styled.button`
  outline: none;
  border: none;
  opacity: 1;
  width: 120px;
  min-height: 40px;
  padding: 10px;
  
  color: white;
  background-color: #2bb4fb;
  border-radius: 20px;

  cursor: pointer;
  &:hover {
    opacity: 0.6;
    transition: opacity 0.3s;
  }
`;

export default Button;
