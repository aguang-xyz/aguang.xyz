import React from 'react';

import Highlight from 'react-highlight';
import 'highlight.js/styles/solarized-dark.css';

import GraphViz from './graphviz';

/**
 * Source code render component.
 *
 * @param language
 * @param content
 *
 */
class SourceCode extends React.Component {

  render() {

    const language = this.props.language;
    const content = this.props.content;

    if (language === 'dot') {

      return (
        <GraphViz engine="dot" content={content} />
      );
    }

    return (
      <Highlight className={language}>
        {content}
      </Highlight>
    );
  }
}

export default SourceCode;
