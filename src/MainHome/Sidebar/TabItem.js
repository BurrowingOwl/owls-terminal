import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

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

const LinkWrapper = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

const TabItem = ({ _id, name, selected }) => (
  <LinkWrapper to={`/${_id}`}>
    <Item selected={selected}>
      <span>{name}</span>
    </Item>
  </LinkWrapper>
);

TabItem.propTypes = {
  _id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default TabItem;
