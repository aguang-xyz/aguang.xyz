import React from "react";

import Header from "../components/header";
import PostView from "../components/post-view";
import CommentsView from "../components/comments/comments-view";

class PostPage extends React.Component {
  render() {
    const { category, name } = this.props.match.params;

    return (
      <div>
        <Header />

        <PostView id={`${category}/${name}`} />

        <CommentsView id={`${category}/${name}`} />
      </div>
    );
  }
}

export default PostPage;
