import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;

  padding: 0 10px;
`;
const Header = styled.div`
  display: flex;
  align-items: center;
`;
const Author = styled.h3`
  margin-left: 10px;
`;
const PostItem = ({ title, contents, authorName, created }) => (
  <Container>
    <Header>
      <h2>
        { title }
      </h2>
      <Author>
        by { authorName }
      </Author>
    </Header>
    <p>
      { contents }
    </p>
    { created }
  </Container>
);
PostItem.propTypes = {
  authorName: PropTypes.string.isRequired,
  contents: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PostItem;
