import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Item = styled.li`
  padding: 10px;
  font-size: 16px;
  background-color: ${props => (props.selected ? '#65b4eb' : 'transparent')};
  cursor: pointer;

  &:hover {
    background-color: #65b4eb;
    transition: all 0.3s;
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
