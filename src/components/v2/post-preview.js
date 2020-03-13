import React from 'react';

import styles from './post-preview.module.css';

import PostView from './post-view';

class PostPreview extends React.Component {

  render() {

    return (
      
      <a href={`#/post/${this.props.id}`} className={styles.container} style={this.props.style}>

        <figcaption>
          <p>[{this.props.id}]SPOJ - MPOLY - Polygon</p>
        </figcaption>

        <PostView id={this.props.id} />
      </a>
    );
  }
}

export default PostPreview;
