import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Viewer from 'tui-editor/dist/tui-editor-Viewer';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Loading } from '@/common';

const Container = styled.div`
`; // responsible 추가해야함.
const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Title = styled.h1`
  text-align: center;
  font-size: 48px;

  margin-top: 5rem;
`;
const Body = styled.div`
  max-width: 1000px; 
  margin: 0 auto;
  margin-top: 1rem;
`;
const Contents = styled.div`
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
class PostView extends Component {
  _viewer = null;
  _viewerRef = null;
  setViewer = ({ post }) => {
    window.requestAnimationFrame(() => {
      if (this._viewerRef) {
        this._viewer = new Viewer({
          el: this._viewerRef,
          initialValue: post.contents,
        });
      }
    });
  }
  render() {
    const { match } = this.props;
    const { postId } = match.params;
    if (!postId) return null;
    return (
      // 이건 cache를 안쓰는게 더 좋다고 판단해서 fetchPolicy 따로 지정함
      <Query
        query={GET_POST_BY_ID}
        variables={{ postId }}
        fetchPolicy="network-only"
        onCompleted={data => this.setViewer(data)}
      >
        {
          ({ data, error, loading }) => {
            if (loading) return <Loading />;
            if (error) return `Error: ${error}`;
            const { post } = data;
            if (!post) return null;
            return (
              <Container>
                <Header>
                  <Title>{ post.title }</Title>
                </Header>
                <Body>
                  <Contents innerRef={ref => (this._viewerRef = ref)} />
                </Body>
              </Container>
            );
          }
        }
      </Query>
    );
  }
}

PostView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default PostView;
