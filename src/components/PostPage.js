import React from 'react';
import ReactMarkdown from 'react-markdown';

import ReactLatex from 'react-latex';
import ReactHighlight from 'react-highlight';

import RemarkMathPlugin from "remark-math";

import Axios from 'axios';

import { DiscussionEmbed, CommentCount, CommentEmbed } from 'disqus-react';

import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown.css';

import 'katex/dist/katex.css';

import Page from './Page';

const DISQUS_BLACK_LIST = [
  '',
  '/posts/articles/latest.md',
  '/posts/movies/latest.md',
  '/posts/about/myself.md',
];

export default class PostPage extends React.Component {

  state = {
    path: '',
    content: '',
    commentId: ''
  };

  reload(props) {

    const { match: { params } } = props;
    const category = params.category.replace(/\./g, '');
    const name = params.name.replace(/\./g, '');

    const path = '/posts/' + category + '/' + name + '.md';

    this.setState({
      path: path,
      commentId: 'post::' + path
    });

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

  shouldShowDisqus() {

    for (var i = 0; i < DISQUS_BLACK_LIST.length; i++) {
      if (DISQUS_BLACK_LIST[i] == this.state.path) {
        return false;
      }
    }

    return true;
  }

  render() {
    const url = window.location.protocol + '//' + window.location.host + this.state.path

    return (
      <Page
        body={
          <article className="markdown-body">
            <ReactMarkdown
              source={this.state.content}
              plugins={[RemarkMathPlugin]}
              renderers={{
                math: (text) => (
                  <ReactLatex>{"$$" + text.value + "$$"}</ReactLatex>
                ),
                inlineMath: (text) => (
                  <ReactLatex>{"$" + text.value + "$"}</ReactLatex>
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

            {this.shouldShowDisqus() ? (
              <DiscussionEmbed
                shortname = 'aguang-xyz'
                config={{
                  url: url,
                  identifier: this.state.commentId,
                  title: "aguang.xyz"
                }}
              />
            ) : null}

          </article>
        }
      />
    )
  }
}

