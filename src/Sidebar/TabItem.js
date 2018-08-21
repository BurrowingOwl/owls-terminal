import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Item = styled.li`
  padding: 10px;
  font-size: 16px;

  border-bottom: 1px solid black;

  span {
    color: ${props => (props.selected ? 'red' : 'black')};
    cursor: pointer;
  }
`;

const TabItem = ({ name, ...props }) => (
  <Item {...props}>
    <span>{name}</span>
  </Item>
);

TabItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default TabItem;
