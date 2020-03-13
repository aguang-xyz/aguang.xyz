import React from 'react';
import styles from './HomePage.module.css';

import Header from './header';

import PostPreviewContainer from './post-preview-container';

class HomePage extends React.Component {

  getPostIds() {

    return [
      'spoj/4061',
      'spoj/34409',
      'spoj/5732',
      'spoj/10394',
      'spoj/5',
      'spoj/4',
      'spoj/2',
      'spoj/1',
    ];
  }

  render() {

    return (
      <div>
        <Header />

        <PostPreviewContainer
          ids={this.getPostIds()}
        />
      </div>
    );
  }
}

export default HomePage;
