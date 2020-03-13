import React from 'react';

import styles from './post-view.module.css';

import ReactMarkdown from 'react-markdown';

import RemarkMathPlugin from "remark-math";

import ReactLatex from 'react-latex';
import 'katex/dist/katex.css';

import ReactHighlight from 'react-highlight';
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown.css';

import Axios from 'axios';

const posts = Axios.create({

    baseURL: '/posts',
});

class PostView extends React.Component {

    state = {

        content: 'Loading..',
    };
    
    loadContent(id) {

        posts
            .get(`${id}.md`)
            .then(ret => {

                if (ret.status === 200) {

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

    componentWillReceiveProps(props) {

        this.loadContent(props.id);
    }

    renderLatex(value) {

        return (
            <ReactLatex>
                {value}
            </ReactLatex>
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

        return (
            <article className={styles.container}>
                <ReactMarkdown
                    source={this.state.content}
                    plugins={[RemarkMathPlugin]}
                    renderers={{
                        math: (text) => this.renderLatex(`$$${text.value}$$`),
                        inlineMath: (text) => this.renderLatex(`$${text.value}$`),
                        code: (code) => this.renderCode(code.language, code.value),
                    }}
                />
            </article>
        );
    }
}

export default PostView;