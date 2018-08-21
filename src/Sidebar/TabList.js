import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const List = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
`;

const TabList = ({ children }) => (
  <List>
    {children}
  </List>
);
TabList.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default TabList;
