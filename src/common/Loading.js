import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

const Container = styled.div`
  width: 100%;
  min-height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const Loading = ({ label }) => (
  <Container>
    <Spinner size={SpinnerSize.large} label={label} />
  </Container>
);
Loading.propTypes = {
  label: PropTypes.string,
};
Loading.defaultProps = {
  label: '',
};

export default Loading;
