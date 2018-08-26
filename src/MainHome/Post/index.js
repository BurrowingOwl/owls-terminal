import React from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Loading } from '@/common';
import PostItem from './PostItem';

const Container = styled.div`
  margin: 0 1rem;
`;
const GET_POSTS_BY_TAGS = gql`
  query getPosts($tabId: String!) {
    posts(tabId: $tabId) {
      _id
      title
      contents
      created
      author {
        name
      }
      tab {
        name
      }
    }
  }
`;
const GET_SELECTED_TAB = gql`
  query getSelectedTab {
    selectedTabId @client 
  }
`;
const Post = () => (
  <Query query={GET_SELECTED_TAB}>
    {
      ({ data: { selectedTabId } }) => (
        <Query skip={!selectedTabId} query={GET_POSTS_BY_TAGS} variables={{ tabId: selectedTabId }}>
          {({ loading, error, data: { posts } }) => {
            if (loading) return <Loading />;
            if (error) return `Error! ${error.message}`;
            if (!posts) return null;
            return (
              <Container>
                {
                  posts.map(post => (
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
      )
    }
  </Query>
);

export default Post;
