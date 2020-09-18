import React from "react";
import { whoami } from "./comments-api";

import LoginButton from "./login-button";
import CommentsList from "./comments-list";
import AddComment from "./comment-add";

import styles from "./comments-view.module.css";

class CommentsView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
    };

    this.listRef = React.createRef();
  }

  async whoami() {
    return (await whoami()).data.user;
  }

  async componentDidMount() {
    this.setState({
      user: await this.whoami(),
    });
  }

  render() {
    const { user } = this.state;
    const { id } = this.props;

    return (
      <div>
        <CommentsList category={id} ref={this.listRef} />

        <div className={styles.container}>
          {user ? (
            <AddComment
              id={id}
              user={this.state.user}
              onAfterSubmit={() => this.listRef.current.refresh()}
            />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    );
  }
}

export default CommentsView;
