import React from "react";
import GraphViz from "./graphviz";

// Code Mirror.
import CodeMirror from "codemirror";
import "codemirror/lib/codemirror.css";

// Vim Mode.
import "codemirror/keymap/vim";

// Brackets Matching.
import "codemirror/addon/edit/matchbrackets";

// Code Folding.
import "codemirror/addon/fold/foldcode";

import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/comment-fold";
import "codemirror/addon/fold/indent-fold";
import "codemirror/addon/fold/markdown-fold";
import "codemirror/addon/fold/xml-fold";

import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";

// Full Screen.
import "codemirror/addon/display/fullscreen";
import "codemirror/addon/display/fullscreen.css";

// Theme.
import "codemirror/theme/solarized.css";

// Language Supports.
import "codemirror/mode/clike/clike";
import "codemirror/mode/python/python";
import "codemirror/mode/shell/shell";
import "codemirror/mode/javascript/javascript";

import "./source-code.module.css";

/**
 * Source code render component.
 *
 * @param language
 * @param content
 *
 */
class SourceCode extends React.Component {
  constructor(props) {
    super(props);

    this.textarea = React.createRef();
  }

  getMode(props) {
    return {
      c: "text/x-csrc",
      "c++": "text/x-c++src",
      bash: "text/x-sh",
      javascript: "text/javascript",
      python: "text/x-python",
    }[props.language];
  }

  bindCodeMirror(props) {
    if (!this.textarea.current) {
      return;
    }

    const options = {
      // Read Only.
      readOnly: true,

      // Indent
      indentUnit: 2,
      tabSize: 2,
      indentWithTabs: false,

      // Vim Mode.
      keyMap: "vim",

      // Show Line Numbers.
      lineNumbers: true,

      // Bracket Matching.
      matchBrackets: true,

      // Code Folding.
      foldGutter: true,
      gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],

      extraKeys: {
        // Full Screen.
        "Ctrl-F": function (cm) {
          cm.setOption("fullScreen", !cm.getOption("fullScreen"));
        },

        // Quit Full Screen.
        Esc: function (cm) {
          cm.setOption("fullScreen", false);
        },

        // Select All,
        "Ctrl-A": function (cm) {
          cm.execCommand("selectAll");
        },
      },

      // Theme.
      theme: "solarized dark",

      // Auto fit content height.
      viewportMargin: Infinity,

      // Do not break the line.
      lineWrapping: false,

      // Language Mode.
      mode: this.getMode(this.props),
    };

    CodeMirror.fromTextArea(this.textarea.current, options);
  }

  componentDidMount() {
    this.bindCodeMirror(this.props);
  }

  render() {
    let { language, content } = this.props;

    if (language === "dot") {
      return <GraphViz engine="dot" content={content} />;
    }

    return <textarea ref={this.textarea} defaultValue={content} />;
  }
}

export default SourceCode;
