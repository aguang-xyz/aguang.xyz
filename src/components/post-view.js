import React from 'react';

import styles from './post-view.module.css';

import ReactMarkdown from 'react-markdown';

import RemarkMathPlugin from "remark-math";

import ReactLatex from 'react-latex';
import 'katex/dist/katex.css';

import ReactHighlight from 'react-highlight';
import 'highlight.js/styles/solarized-dark.css';

import 'github-markdown-css/github-markdown.css';

import Axios from 'axios';

const posts = Axios.create({

    baseURL: '/posts',
});

class PostView extends React.Component {

    state = {

        content: 'Loading..',
    };
   
    parseTitle(markdown) {

      const rows = markdown.split('\n');

      for (let i = 0; i < rows.length; i++) {

        if (rows[i].startsWith('# ')) {

          return rows[i].substring(2);
        }
      }

      return null;
    }

    loadContent(id) {

        posts
            .get(`${id}.md`)
            .then(ret => {

                if (ret.status === 200) {

                    const title = this.parseTitle(ret.data);

                    if (null !== title && !(this.props.preview)) {

                      document.title = title;
                    }

                    this.setState({ content: ret.data });
                } else {

                    throw new Error('Failed to load');
                }
            })
            .catch(e => {

                this.setState({ content: '# Page not found' });
            })
    }

    componentDidMount() {

        this.loadContent(this.props.id);
    }

    componentDidUpdate(prevProps) {

      if (prevProps.id !== this.props.id) {

        this.loadContent(this.props.id);
      }
    }

    renderLatex(value) {

        return (
            <span className={styles.latex}>
              <ReactLatex>
                  {value}
              </ReactLatex>
            </span>
        );
    }

    renderInlineLatex(value) {

        return (
            <span className={styles.latexInline}>
              <ReactLatex>
                  {value}
              </ReactLatex>
            </span>
        );
    }

    renderCode(language, value) {

        return (
            <ReactHighlight className={language}>
                {value}
            </ReactHighlight>
        );
    }

    render() {

        const classNames = [ styles.container, 'markdown-body' ];

        if (this.props.preview) {

          classNames.push('preview');
        }

        return (
            <article className={`${classNames.join(' ')}`}>
                <ReactMarkdown
                    source={this.state.content}
                    plugins={[RemarkMathPlugin]}
                    renderers={{
                        math: (text) => this.renderLatex(`$$${text.value}$$`),
                        inlineMath: (text) => this.renderInlineLatex(`$${text.value}$`),
                        code: (code) => this.renderCode(code.language, code.value),
                    }}
                />
            </article>
        );
    }
}

export default PostView;
