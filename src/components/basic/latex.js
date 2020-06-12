import React from "react";
import Latex from "react-latex";
import "katex/dist/katex.css";

import styles from "./latex.module.css";

/**
 * Latex block render component.
 *
 * @param content
 */
class Block extends React.Component {
  render() {
    const content = this.props.content;

    return (
      <span className={styles.block}>
        <Latex>{content}</Latex>
      </span>
    );
  }
}

/**
 * Latex inline block render component.
 *
 * @param content
 */
class Inline extends React.Component {
  render() {
    const content = this.props.content;

    return (
      <span className={styles.inline}>
        <Latex>{content}</Latex>
      </span>
    );
  }
}

export default { Block, Inline };
