import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, Switch, Link } from 'react-router-dom';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Button, Loading } from '@/common';
import PostView from './PostView';
import PostItem from './PostItem';
import PostEditor from './PostEditor';

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
  const { tabId } = match.params;
  return (
    <Switch>
      <Route
        exact
        path={`${match.url}`}
        render={() => (
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
                  <Link to={`/${tabId}/edit`}>
                    <Button>Create Post</Button>
                  </Link>
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
