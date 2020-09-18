import React from "react";
import { formatDistance } from "date-fns";
import styles from "./comment.module.css";

class Comment extends React.Component {
  render() {
    const { nickname, avatarUrl, content, createdAt } = this.props.comment;

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <img className={styles.avatar} src={avatarUrl} alt={nickname} />
        </div>
        <div className={styles.right}>
          <div>
            <strong className={styles.nickname}>{nickname}</strong>
            <span className={styles.datetime}>
              {formatDistance(new Date(createdAt), new Date())}
            </span>
          </div>
          <div className={styles.content}>{content}</div>
        </div>
      </div>
    );
  }
}

export default Comment;
