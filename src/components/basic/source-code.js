import React from 'react';

import Highlight from 'highlight.js';
import 'highlight.js/styles/solarized-dark.css';

import beautify from 'js-beautify';

import GraphViz from './graphviz';

const formatters = {

  // c++
  "c++": (code) => beautify(code, {
    indent_size: 2,
    indent_char: " ",
  }),
};

/**
 * Source code render component.
 *
 * @param language
 * @param content
 *
 */
class SourceCode extends React.Component {

  render() {

    let { language, content } = this.props;

    if (language === 'dot') {

      return (
        <GraphViz engine="dot" content={content} />
      );
    }

    if (formatters[language]) {

      content = formatters[language](content);
    }

		try {
			content = language ?
				Highlight.highlight(language, content).value :
				Highlight.highlightAuto(content).value;
		} catch (e) {
		}

    return (
      <pre className="hljs">
        <code dangerouslySetInnerHTML={{__html: content }} />
      </pre>
    );
  }
}

export default SourceCode;
