import React from 'react';

import styles from './post-preview.module.css';

import PostView from './post-view';
import ImageView from './image-view';

const getLink = (post) => {

  if (post.link) {

    return post.link;
  }

  return `#/post/${post.id}`;
};

const getPreview = (post) => {

  if (post.image) {

    return <ImageView src={post.image} />
  }

  return <PostView id={post.id} preview />
}


const PostPreview = (post) => (
      
  <div
    className={styles.container}
    style={post.style}
    onClick={() => window.location.assign(getLink(post))}>

    <figcaption>
      <p>{post.title}</p>
    </figcaption>

    {getPreview(post)}
  </div>
);

export default PostPreview;
