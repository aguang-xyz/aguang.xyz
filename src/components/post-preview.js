import React from "react";

import styles from "./post-preview.module.css";

import PostView from "./post-view";
import ImageView from "./image-view";

const getLink = (post) => {
  if (post.link) {
    return post.link;
  }

  return `#/post/${post.id}`;
};

const getPreview = (post) => {
  if (post.image) {
    return <ImageView src={post.image} />;
  }

  return <PostView id={post.id} preview />;
};

const PostPreview = (post) => {
  const classNames = [styles.container];

  if (post.image) {
    classNames.push(styles.imageContainer);
  }

  return (
    <div
      className={classNames.join(" ")}
      style={post.style}
      onClick={() => window.location.assign(getLink(post))}
    >
      <figcaption>
        <p>{post.title}</p>
      </figcaption>

      {getPreview(post)}
    </div>
  );
};

export default PostPreview;
