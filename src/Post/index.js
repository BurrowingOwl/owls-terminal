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
const GET_SELECTED_TAB = gql`
  query {
    selectedTabId @client 
  }
`;
const Post = () => (
  <Query query={GET_SELECTED_TAB}>
    {
      ({ data: { selectedTabId } }) => (
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
      )
    }
  </Query>
);

export default Post;
