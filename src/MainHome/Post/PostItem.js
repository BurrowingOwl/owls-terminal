import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { IoMdBook } from 'react-icons/io';

const Container = styled(Link)`
  color: black;
  text-decoration: none;
  
  margin-left: 15px;
  padding: 15px 0;
  border-bottom: 1px solid #eee;

  display: flex;
  align-items: center;
`;
const IconWrapper = styled.div`
  flex: 0 0 50px;
`;
const ContentWrapper = styled.div`
  flex: 1 1 auto;
`;
const Title = styled.div`
  font-size: 18px;
  line-height: 24px;

  font-weight: 500;
  cursor: pointer;
  &:hover {
    color: ${props => props.theme.primary};
    transition: color 0.2s;
  }
`;
const Footer = styled.div`
  font-size: 12px;
`;
const PostItem = ({ _id, title, authorName, created }) => (
  <Container to={`/post/${_id}`}>
    <IconWrapper>
      <IoMdBook size="1.2em" />
    </IconWrapper>
    <ContentWrapper>
      <Title>
        { title }
      </Title>
      <Footer>
        { format(created, 'YYYY-MM-DD') } by { authorName }
      </Footer>
    </ContentWrapper>
  </Container>
);
PostItem.propTypes = {
  _id: PropTypes.string.isRequired,
  authorName: PropTypes.string.isRequired,
  created: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default PostItem;
