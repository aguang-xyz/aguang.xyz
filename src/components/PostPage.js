import React from 'react';
import ReactMarkdown from 'react-markdown';
import ReactLatex from 'react-latex';
import ReactHighlight from 'react-highlight';
import Axios from 'axios';

import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown.css';

import 'katex/dist/katex.css';

import Page from './Page';

export default class PostPage extends React.Component {

  state = {
    content: '',
  };

  reload(props) {

    const { match: { params } } = props;
    const category = params.category.replace(/\./g, '');
    const name = params.name.replace(/\./g, '');

    Axios
      .get('/posts/' + category + '/' + name + '.md')
      .then(res => {
        if (res.status === 200) {

          this.setState({ content: res.data });
        } else {
          this.setState({ content: '# Page not found' });
        }
      })
      .catch(err => {
        this.setState({ content: '# Page not found' });
      });
  }

  componentDidMount() {

    this.reload(this.props);
  }

  componentWillReceiveProps(props) {

    this.reload(props);
  }

  render() {
    return (
      <Page
        body={
          <article className="markdown-body">
            <ReactMarkdown
              source={this.state.content}
              renderers={{
                text: (text) => (
                  <p2>
                    <ReactLatex>{text.value}</ReactLatex>
                  </p2>
                ),
                code: (code) => (
                  <ReactHighlight
                    className={code.language}
                  >
                    {code.value}
                  </ReactHighlight>
                )
              }}
            />
          </article>
        }
      />
    )
  }
}

