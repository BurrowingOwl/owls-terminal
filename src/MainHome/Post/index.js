import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Switch, Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button, Loading, ScrollSpy } from '@/common';
import PostView from './PostView';
import PostItem from './PostItem';
import PostEditor from './PostEditor';

const Container = styled.div`
  width: 95%;
  margin: 0 auto;
`;
const GET_POSTS_BY_TAG = gql`
  query getPosts($filter: PostListFilter) {
    posts(filter: $filter) {
      cursor
      isLast
      posts {
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
  }
`;
const Post = ({ match }) => {
  const { tabId } = match.params;
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={() => (
          <Query skip={!tabId} query={GET_POSTS_BY_TAG} variables={{ filter: { tabId } }} fetchPolicy="cache-and-network">
            {({ data, fetchMore, loading }) => {
              if (!data.posts) return null;
              const { cursor, isLast, posts } = data.posts;
              if (posts.length < 0) return null;
              return (
                <Container>
                  <Link to={`/${tabId}/edit`}>
                    <Button>Create Post</Button>
                  </Link>
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
                  { !isLast && (
                    <ScrollSpy
                      onHit={() => {
                        fetchMore({
                          variables: {
                            filter: {
                              tabId,
                              cursor,
                            },
                          },
                          updateQuery: (prev, { fetchMoreResult }) => {
                            if (fetchMoreResult.posts.isLast) return { ...prev, posts: { ...prev.posts, isLast: true } };

                            const result = {
                              ...prev,
                              posts: {
                                ...prev.posts,
                                cursor: fetchMoreResult.posts.cursor,
                                isLast: fetchMoreResult.posts.isLast,
                                posts: [...prev.posts.posts, ...fetchMoreResult.posts.posts],
                              },
                            };
                            return result;
                          },
                        });
                      }}
                    />
                  )}
                  { loading && <Loading /> }
                </Container>
              );
            }}
          </Query>
        )}
      />
      {/* :tabId 안쓰고 match.url 쓰면 서브 라우트에서 tabId를 param으로 못가져옴 */}
      <Route path="/:tabId/edit" component={PostEditor} />
      <Route path={`${match.url}/:postId`} component={PostView} />
    </Switch>
  );
};

Post.propTypes = {
  match: PropTypes.object.isRequired,
};

export default Post;
