import React, { Component } from 'react';
import styled from 'styled-components';
import Editor from 'tui-editor';
import Prism from 'prismjs';

/* eslint-disable */
import 'tui-editor/dist/tui-editor.min.css';
import 'tui-editor/dist/tui-editor-contents.min.css';
import 'codemirror/lib/codemirror.css';
import 'highlight.js/styles/github.css';
import 'tui-editor/dist/tui-editor-extScrollSync.js';

const Container = styled.div`
  height: 100%;
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
      exts: ['scrollSync'],
    });
    // this_editor.getValue()
  }
  _editorRef = null;
  _editor = null;
  render() {
    return (
      <Container>
        <div
          ref={ref => (this._editorRef = ref)}
        />
      </Container>
    );
  }
}

export default PostEditor;
