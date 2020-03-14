import React from 'react';

import Header from '../components/header';
import PostView from '../components/post-view';

class PostPage extends React.Component {

  render() {

    const { category, name } = this.props.match.params;

    return (

      <div>
        <Header />

        <PostView id={`${category}/${name}`} /> 
      </div>
    );
  }
}

export default PostPage;
