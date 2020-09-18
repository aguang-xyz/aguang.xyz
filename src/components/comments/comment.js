import React from "react";
import { formatDistance } from "date-fns";
import styles from "./comment.module.css";

class Comment extends React.Component {
  render() {
    const { nickname, avatarUrl, content, createdAt } = this.props.comment;

    let now = new Date().toISOString();
    now = new Date(now.substr(0, now.length - 1));

    return (
      <div className={styles.container}>
        <div className={styles.left}>
          <img className={styles.avatar} src={avatarUrl} alt={nickname} />
        </div>
        <div className={styles.right}>
          <div>
            <strong className={styles.nickname}>{nickname}</strong>
            <span className={styles.datetime}>
              {formatDistance(new Date(createdAt), now)}
            </span>
          </div>
          <div className={styles.content}>{content}</div>
        </div>
      </div>
    );
  }
}

export default Comment;
