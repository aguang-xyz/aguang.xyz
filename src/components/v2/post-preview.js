import React from 'react';

import styles from './post-preview.module.css';

class PostPreview extends React.Component {

  render() {

    return (
      
      <a href="#" className={styles.container} style={this.props.style}>

        <figcaption>
          <p>[{this.props.id}]SPOJ - MPOLY - Polygon</p>
        </figcaption>
      </a>
    );
  }
}

export default PostPreview;
