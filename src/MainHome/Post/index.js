import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button, Loading } from '@/common';
import PostView from './PostView';
import PostItem from './PostItem';

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
`;
const GET_POSTS_BY_TAG = gql`
  query getPosts($tabId: String!) {
    posts(tabId: $tabId) {
      _id
      title
      created
      author {
        _id
        name
      }
      tab {
        _id
      }
    }
  }
`;
const Post = ({ match }) => {
  const { tabId, postId } = match.params;
  if (postId) {
    return <PostView postId={postId} />;
  }
  return (
    <Query skip={!tabId} query={GET_POSTS_BY_TAG} variables={{ tabId }}>
      {({ loading, error, data }) => {
        if (loading) return <Loading />;
        if (error) return `Error! ${error.message}`;
        const { posts } = data;
        if (!posts) return null;
        return (
          <Container>
            {
              posts.map(post => (
                <PostItem
                  {...post}
                  key={post._id}
                  authorName={post.author.name}
                  tabId={post.tab._id}
                />
              ))
            }
            <Link to="/edit">
              <Button>Create Post</Button>
            </Link>
          </Container>
        );
      }}
    </Query>
  );
};

Post.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Post;
