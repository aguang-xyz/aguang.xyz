import React from "react";
import styles from "./feed-button.module.css";

import { FaRss } from "react-icons/fa";

class FeedButton extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <a
          className={styles.button}
          href={this.props.url}
          title="Fee this page."
        >
          <FaRss />
        </a>
      </div>
    );
  }
}

export default FeedButton;
