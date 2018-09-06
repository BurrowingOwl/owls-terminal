import React, { Component } from 'react';
import styled from 'styled-components';
import Editor from 'tui-editor';
import { Query, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Button } from '@/common';

/* eslint-disable */
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/github.css';
import 'tui-editor/dist/tui-editor-extScrollSync.js';

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Title = styled.input`
  margin: 1rem;
  padding: 5px 10px;

  border: none;
  outline: none;
  
  font-size: 36px;
  font-weight: 600;
`;
const EditorDiv = styled.div`
  .te-toolbar-section {
    ${props => !props.showToolbar && `display: none !important;`}
  }
`;
// TODO: Post get Query에 따라 가지고 오는 필드 fragment 만들어서 재사용하기.
const CREATE_POST = gql`
  mutation CreatePost($title: String!, $contents: String!, $authorId: String!, $tabId: String) {
    createPost(title: $title, contents: $contents, authorId: $authorId, tabId: $tabId) {
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
const GET_LOGIN_STATE = gql`
  query getLoginState {
    login @client {
      _id
      username
      name
      isLoggedIn
    }
  }
`;
class PostEditor extends Component {
  state = {
    text: '',
  }
  componentDidMount() {
    this._editor = new Editor({
      el: this._editorRef,
      previewStyle: 'vertical',
      height: '100%',
      initialValue: '새로운 글!',
      exts: ['scrollSync'],
    });
    // this_editor.getValue()
  }
  _title = null;
  _editorRef = null;
  _editor = null;

  handleTitleEnter = e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this._editor.focus();
    }
  }
  handleCreatePost = (tabId, loginState, createPost) => e => {
    const title = this._title.value;
    const contents = this._editor.getValue();
    const authorId = loginState._id;
    createPost({ variables: { title, contents, authorId, tabId }})
      .then(res => this.props.history.push(`/${tabId}`))
      .catch(err => console.log(err));
  }
  // post를 만듬에 따라서, GET_POSTS_BY_TAG 로 가져오는 쿼리의 캐시를 업데이트 해줌.
  // 이미 존재하는 걸 업데이트하는게 아니고 아예 새로운걸 추가하는것이기 때문에 read/write Cache를 해줘야함.
  // 근데 이거는 pagination 때문에 그냥 안하는게 좋을 수도 있을 것 같다...
  // updateCache = (cache, tabId, post) => {
  //   const { posts } = cache.readQuery({ query: GET_POSTS_BY_TAG, variables: { tabId } });
  //   cache.writeQuery({
  //     query: GET_POSTS_BY_TAG,
  //     variables: { tabId },
  //     data: { posts: [post, ...posts] }
  //   });
  // }
  render() {
    const { match } = this.props;
    const { tabId } = match.params;
    return (
      <Container>
        <Query query={GET_LOGIN_STATE}>
          { // 이러한 컴포넌트들은 재사용이 좋을 듯 하다.
            ({ data: { login }, loading, error }) => {
              if (loading || error) return null;
              return (
                <Mutation mutation={CREATE_POST}>
                  {( createPost, { data }) => {
                    // Mutation으로 post를 만들었을 때, 우리가 만약 post들을 가져오는 query가 있다면 out of sync가 발생한다.
                    // post를 가져오는 query는 캐시를 사용하기 때문임. 즉, 캐시에 저장된 값이 있을 때 내가 값을 추가한다고 그 값을 다시 가져오지 않기 때문
                    // 이를 위해서는 cache.readQuery와 cache.writeQuery를 이용하여 캐시를 업데이트 해준다.
                    // 하지만 모든 mutation에 대해서 이 같은 작업이 필요하지는 않다.
                    // 이미 있는 값을 수정할 경우, id, _id 같은 unique한 property가 mutation의 결과로 반환되면, apollo가 알아서 그 캐시를 업데이트 해준다.
                    // 주의할 점은 내가 mutation 해서 가져오는 데이터만 업데이트 해주므로,
                    // 내가 title과 contents를 가져오는 쿼리가 있다면, mutation의 결과값도 title과 contents를 가지고 있어야 한다.
                    return (
                      <React.Fragment>
                        <div style={{ display: 'flex' }}>
                          <Title innerRef={ref => (this._title = ref)} placeholder="Title" autoFocus onKeyDown={this.handleTitleEnter} />
                        </div>
                        <EditorDiv
                          innerRef={ref => (this._editorRef = ref)}
                          showToolbar={false} // need this?
                        />
                        <Button primary onClick={this.handleCreatePost(tabId, login, createPost)}>
                          Publish Post
                        </Button>
                      </React.Fragment>
                    );
                  }}
                </Mutation>
              )
            }
          }
        </Query>
      </Container>
    );
  }
}

export default PostEditor;
