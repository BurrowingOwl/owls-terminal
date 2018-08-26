import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TextField } from 'office-ui-fabric-react/lib/TextField';

const Input = styled(TextField).attrs({
  type: props => props.type,
})`
  padding: 10px;
  min-width: 200px;
`;

const Field = ({ type, ...props }) => (
  <Input {...props} type={type} />
);

Field.propTypes = {
  type: PropTypes.string,
};
Field.defaultProps = {
  type: 'text',
};

export default Field;
