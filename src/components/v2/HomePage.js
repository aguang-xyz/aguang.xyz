import React from 'react';
import styles from './HomePage.module.css';

import Header from './header';

import PostPreview from './post-preview';
import PostPreviewContainer from './post-preview-container';

class HomePage extends React.Component {

  render() {

    return (
      <div>
        <Header />

        <PostPreviewContainer
      
          ids={[1,2,3,4,5,6,7,8]}
        />
      </div>
    );
  }
}

export default HomePage;
