import React, { Component } from 'react';
import marked from 'marked';
import Prism from 'prismjs';

const option = {
  highlight: (code, language, callback) => {
    // Check whether the given language is valid for prism
    const validLang = !!(language && Prism.languages[language]);
    // Highlight only if the language is valid.
    const highlighted = validLang
      ? Prism.highlight(code, Prism.languages[language])
      : Prism.highlight(code, Prism.languages.javascript);
    return highlighted;
  },
};

// Set the renderer to marked.
marked.setOptions(option);

class PostEditor extends Component {
  state = {
    text: '',
  }
  handleChange = (e) => this.setState({ text: e.target.value });
  parseMd = (text) => marked(text);
  render() {
    const { text } = this.state;
    const md = this.parseMd(text);
    return (
      <div>
        <textarea
          onChange={this.handleChange}
          value={text}
        />
        <h2>Preview</h2>
        <div dangerouslySetInnerHTML={{ __html: md }} />
      </div>
    );
  }
}

export default PostEditor;
