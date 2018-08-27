import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Loading } from '@/common';

const Container = styled.div`
`; // responsible 추가해야함.
const Title = styled.h1`
  text-align: center;
  font-size: 56px;
`;
const Body = styled.div`
  max-width: 1000px; 
  margin: 0 auto;
  margin-top: 1rem;
`;
const Contents = styled.p`
  font-size: 22px;
  padding: 1rem;
  word-break: break-word;
  word-wrap: break-word;
`;
const GET_POST_BY_ID = gql`
  query getPostById($postId: String!) {
    post(_id: $postId) {
      _id
      title
      contents
      author {
        _id
        name
      }
    }
  }
`;
const PostView = ({ match }) => {
  const { postId } = match.params;
  return (
    <Query query={GET_POST_BY_ID} variables={{ postId }}>
      {
        ({ data: { post }, loading }) => {
          if (loading) return <Loading />;
          return (
            <Container>
              <Title>{ post.title }</Title>
              <Body>
                <Contents>{ post.contents }</Contents>
              </Body>
            </Container>
          );
        }
      }
    </Query>
  );
};

PostView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default PostView;
