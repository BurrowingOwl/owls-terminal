import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Loading } from '@/common';
import PostItem from './PostItem';

const Container = styled.div`
  margin: 0 1rem;
`;
const GET_POSTS_BY_TAGS = gql`
  query posts($tabId: String) {
    posts(tabId: $tabId) {
      _id
      title
      contents
      created
      author {
        name
      }
    }
  }
`;

const Post = ({ selectedTabId }) => (
  <Query skip={!selectedTabId} query={GET_POSTS_BY_TAGS} variables={{ tabId: selectedTabId }}>
    {({ loading, error, data }) => {
      if (loading) return <Loading />;
      if (error) return `Error! ${error.message}`;

      return (
        <Container>
          {
            data.posts.map(post => (
              <PostItem
                {...post}
                key={post._id}
                authorName={post.author.name}
              />
            ))
          }
        </Container>
      );
    }}
  </Query>
);

Post.propTypes = {
  selectedTabId: PropTypes.string.isRequired,
};

export default Post;
