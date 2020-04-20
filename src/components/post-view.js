import React from 'react';
import ReactMarkdown from 'react-markdown';
import RemarkMathPlugin from "remark-math";

import styles from './post-view.module.css';

import '../styles/github-markdown.css';

import SourceCode from './basic/source-code.js';
import Latex from './basic/latex.js';

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

                        math: (text) => (
                          <Latex.Block content={`$$${text.value}$$`} />
                        ),
                        
                        inlineMath: (text) => (
                          <Latex.Inline content={`$${text.value}$`} />
                        ),
                        
                        code: ({language, value}) => (
                          (this.props.preview && language !== 'dot') ? <pre><code>{value}</code></pre>:
                            <SourceCode language={language} content={value} />
                        ),
                    }}
                />
            </article>
        );
    }
}

export default PostView;
