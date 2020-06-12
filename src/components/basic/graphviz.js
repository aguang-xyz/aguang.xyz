import React from "react";
import Viz from "viz.js";
import VizRender from "viz.js/lite.render.js";
import HTMLParser from "react-html-parser";
import DOMPurify from "dompurify";

import styles from "./graphviz.module.css";

const viz = new Viz({
  render: VizRender.render,
  Module: VizRender.Module,
});

/**
 *  Graphviz render component.
 *
 *  @param engine default dot
 *  @param content
 */
class Graphviz extends React.Component {
  state = {
    graph: null,
  };

  updateGraph(props) {
    const engine = props.engine || "dot";

    const content = props.content;

    viz.renderString(content, { engine }).then((graph) => {
      graph = DOMPurify.sanitize(graph);

      this.setState({ graph });
    });
  }

  componentDidMount() {
    this.updateGraph(this.props);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.engine !== this.props.engine ||
      prevProps.content !== this.props.content
    ) {
      this.updateGraph(this.props);
    }
  }

  render() {
    return (
      <div className={styles.container}>{HTMLParser(this.state.graph)}</div>
    );
  }
}

export default Graphviz;
