import React from "react";
import { addComment } from "./comments-api";
import styles from "./comments-view.module.css";

class AddComment extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
    };
  }

  async submit() {
    const content = this.state.comment.trim();

    if (content.length > 0) {
      await addComment({
        category: this.props.id,
        content: content,
      });

      this.setState({ comment: "" });

      if (this.props.onAfterSubmit) {
        this.props.onAfterSubmit();
      }
    }
  }

  render() {
    const { nickname } = this.props.user;

    return (
      <div>
        <div style={{ marginBottom: "1rem" }}>
          Hi, {nickname}! Feel free to leave your message!
        </div>

        <textarea
          className={styles.textbox}
          placeholder=""
          value={this.state.comment}
          onChange={(e) => this.setState({ comment: e.currentTarget.value })}
        ></textarea>

        <div className={styles.submit} onClick={() => this.submit()}>
          Submit
        </div>
      </div>
    );
  }
}

export default AddComment;
